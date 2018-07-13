const wechat = require('../../modules/wechat');
const token = require('../../modules/node-jwt');
const user_db = require('../../service/mongodb/m_uesr');
const sio = require('../../sio');


function Login() {
    this.name = 'login';
};

/**
 * 微信登入接口
 * 
 * @returns 
 */
Login.prototype.wechat = ()=> {
    return async(ctx)=> {
        //关闭微信登入网页
        let html = `
            <script type="text/javascript">
                self.close()
            </script> 
        `
        try {
            let wxtoken = JSON.parse(await wechat.getAccessToken(ctx.query.code));
            let wxuser = JSON.parse(await wechat.getUnionId(wxtoken.access_token, wxtoken.openid));

            if(wxtoken.errcode) {
                ctx.body = html;
                sio.to(ctx.query.state).emit('appError', '发生错误');
                return console.log(wxtoken);
            }           

            //根据unionid查询，用户是否注册
            let where = {'wechat.unionid': wxuser.unionid};

            if( await user_db.count(where) < 1 ) sio.to(ctx.query.state).emit('appError','请注册');
            // let isReg = await user_db.count(where) < 1 ? true : false;
            
            // if(isReg) {
            //     let accountInfo = {
            //         state:      true,
            //         nickname:   wxuser.nickname,
            //         sex:        wxuser.sex,
            //         province:   wxuser.province,
            //         city:       wxuser.city,
            //         country:    wxuser.country,
            //         headimgurl: wxuser.headimgurl,
            //         wechat: {
            //             accessToken: wxtoken.access_token,
            //             refreshToken: wxtoken.refresh_token,
            //             unionid: wxuser.unionid
            //         }
            //     };
            //     await user_db.inset(accountInfo);
            // }


            //生成accountToken
            let account = await user_db.findOne(where, {'authority': 1});

            let header = {
                typ: "JWT",
                alg: "HS256"
            };
            let payload = {
                iss: "cloud.tujingwang.com",
                exp: new Date().getTime(),
                _id: account._id,
                authority: account.authority
            };
            let accessToken = token.jwtSignature(JSON.stringify(header), JSON.stringify(payload), 'meihaodeshijie,meihaodeshenghuo'); //生成token

            //跟新用户数据
            let update = {
                'state':                1,
                'accessToken':          accessToken,
                'nickname':             wxuser.nickname,
                'sex':                  wxuser.sex,
                'province':             wxuser.province,
                'city':                 wxuser.city,
                'country':              wxuser.country,
                'headimgurl':           wxuser.headimgurl,
                'wechat.accessToken':   wxtoken.access_token,
                'wechat.refreshToken':  wxtoken.refresh_token,
                'wechat.unionid':       wxuser.unionid,
            }
            await user_db.update(where, update);
            
            
            //登入成功返回给客户端
            account.accessToken = accessToken;
            sio.to(ctx.query.state).emit('loginSuccess',account);
            
            ctx.body = html;
            
        } catch (error) {
            ctx.body = html;
            sio.to(ctx.query.state).emit('appError','发生错误');
            console.log(error);
        }
    }
}



module.exports = new Login();