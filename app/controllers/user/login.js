const wechat = require('../../modules/wechat')();
const token = require('../../modules/node-jwt');
const user_db = require('../mongodb_modules/m_uesr');
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
            let wxtoken = JSON.parse(await wechat.getAccessToken(wechat.appId, wechat.appSecret, ctx.query.code));
            let wxuser = JSON.parse(await wechat.getUnionId(token.access_token, token.openid));

            if(wxtoken.errcode) {
                ctx.body = html;
                sio.to(ctx.query.state).emit('error', '发生错误');
                return console.log(wxtoken);
            }

            if(wxuser.errcode) {
                ctx.body = html;
                sio.to(ctx.query.state).emit('error', '发生错误');
                return console.log(wxuser);
            }

            

            //根据unionid查询，用户是否注册
            let where = {'wechat.unionid': wxuser.unionid};
            let isReg = await user_db.count(where) < 1 ? true : false;
            
            if(isReg) {
                let accountInfo = {
                    state:      true,
                    nickname:   wxuser.nickname,
                    sex:        wxuser.sex,
                    province:   wxuser.province,
                    city:       wxuser.city,
                    country:    wxuser.country,
                    headimgurl: wxuser.headimgurl,
                    wechat: {
                        accessToken: wxtoken.access_token,
                        refreshToken: wxtoken.refresh_token,
                        unionid: wxuser.unionid
                    }
                };
                await user_db.inset(accountInfo);
            }

            //生成accountToken
            let account = await user_db.findOne(where, {'authority': 1});

            let header = {
                typ: "JWT",
                alg: "HS256"
            };
            let payload = {
                iss: "cloud.tujingwang.com",
                exp: "1438956778",
                _id: account._id,
                authority: account.authority
            };
            console.log(payload);
            let accessToken = token.jwtSignature(JSON.stringify(header), JSON.stringify(payload), 'meihaodeshijie,meihaodeshenghuo'); //生成token

            //跟新用户数据
            let update = {
                'state':                true,
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
            
            account.accessToken =   accessToken;
            account.nickname =      wxuser.nickname;
            account.sex =           wxuser.sex;
            account.province =      wxuser.province;
            account.city =          wxuser.city;
            account.country =       wxuser.country;
            account.headimgurl =    wxuser.headimgurl;

            ctx.body = html;
            sio.to(ctx.query.state).emit('wechatok', account);

        } catch (err) {
            ctx.body = html;
            sio.to(ctx.query.state).emit('error','发生错误');
            console.log(err);
        }
    }
}



module.exports = new Login();