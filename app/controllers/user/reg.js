const wechat = require('../../modules/wechat')();
const token = require('../../modules/node-jwt');
const user_db = require('../../service/mongodb/m_uesr');
const sio = require('../../sio');

function Reg() {
    this.name = 'Reg';
}

Reg.prototype.bossWechatReg = ()=> {
    return async(ctx)=> {

        let socket = sio.to(ctx.query.state);

        console.log(socket);
        //关闭微信登入网页
        let html = `
            <script type="text/javascript">
                self.close()
            </script> 
        `
        try {
            let wxtoken = JSON.parse(await wechat.getAccessToken(wechat.appId, wechat.appSecret, ctx.query.code));
            let wxuser = JSON.parse(await wechat.getUnionId(wxtoken.access_token, wxtoken.openid));

            if(wxtoken.errcode) {
                ctx.body = html;
                sio.to(ctx.query.state).emit('appError', '注册发生错误');
                return console.log(wxtoken);
            }

            //根据unionid查询，用户是否注册
            let where = {'wechat.unionid': wxuser.unionid};
            let isReg = await user_db.count(where) < 1 ? true : false;

            if(!isReg) {
                ctx.body = html;
                sio.to(ctx.query.state).emit('appError', '此微信已经注册');
                return;
            }

            let accountInfo = {
                nickname:   wxuser.nickname,
                sex:        wxuser.sex,
                province:   wxuser.province,
                city:       wxuser.city,
                country:    wxuser.country,
                headimgurl: wxuser.headimgurl,
                authority: ['boss'],
                wechat: {
                    accessToken: wxtoken.access_token,
                    refreshToken: wxtoken.refresh_token,
                    unionid: wxuser.unionid
                }
            };
            await user_db.inset(accountInfo);

            //注册成功
            ctx.body = html;
            sio.to(ctx.query.state).emit('bossWechatRegSuccess','注册成功');

        } catch (error) {
            ctx.body = html;
            sio.to(ctx.query.state).emit('appError','注册发生错误');
            console.log(error);
        }
    }
}


Reg.prototype.employeeWechatReg = ()=> {
    return async(ctx)=> {
        //关闭微信登入网页
        let html = `
            <script type="text/javascript">
                self.close()
            </script> 
        `
        try {
            let wxtoken = JSON.parse(await wechat.getAccessToken(wechat.appId, wechat.appSecret, ctx.query.code));
            let wxuser = JSON.parse(await wechat.getUnionId(wxtoken.access_token, wxtoken.openid));

            if(wxtoken.errcode) {
                ctx.body = html;
                sio.to(ctx.query.state).emit('appError', '注册发生错误');
                return console.log(wxtoken);
            }

            //根据unionid查询，用户是否注册
            let where = {'wechat.unionid': wxuser.unionid};
            let isReg = await user_db.count(where) < 1 ? true : false;

            if(!isReg) {
                ctx.body = html;
                sio.to(ctx.query.state).emit('appError', '此微信已经注册');
                return console.log(wxtoken);
            }

            let accountInfo = {
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

            //注册成功
            ctx.body = html;
            sio.to(ctx.query.state).emit('employeeWechatRegSuccess','注册成功');

        } catch (error) {
            ctx.body = html;
            sio.to(ctx.query.state).emit('appError','注册发生错误');
            console.log(error);
        }
    }
}

module.exports = new Reg();