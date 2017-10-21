const wechat = require('../../modules/wechat')();
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
            let token = JSON.parse(await wechat.getAccessToken(wechat.appId, wechat.appSecret, ctx.query.code));
            let user = JSON.parse(await wechat.getUnionId(token.access_token, token.openid));

            if(token.errcode) {
                ctx.body = html;
                sio.to(ctx.query.state).emit('error', '发生错误');
                return console.log(token);
            }

            if(user.errcode) {
                ctx.body = html;
                sio.to(ctx.query.state).emit('error', '发生错误');
                return console.log(user);
            }

            //根据unionid查询，用户是否注册
            let where = {
                'wechat.unionid': user.unionid,
            };

            let isReg = await user_db.count(where) < 1 ? true : false;
            
            if(isReg) {
                let accountInfo = {
                    nickname: user.nickname,
                    sex: user.sex,
                    province: user.province,
                    city: user.city,
                    country: user.country,
                    headimgurl: user.headimgurl,
                    wechat: {
                        accessToken: token.access_token,
                        refreshToken: token.refresh_token,
                        unionid: user.unionid
                    }
                };
                await user_db.inset(account);
            } else {
                let update = {
                    'nickname': accountInfo.nickname,
                    'sex': accountInfo.sex,
                    'province': accountInfo.province,
                    'city': accountInfo.city,
                    'country': accountInfo.country,
                    'headimgurl': accountInfo.headimgurl,
                    'wechat.accessToken': accountInfo.wechat.accessToken,
                    'wechat.refreshToken': accountInfo.wechat.refreshToken,
                    'wechat.unionid': accountInfo.wechat.unionid,
                }
                await user_db.update(where, update);
            }
            let opt = {'nickname': 1, 'sex': 1, 'province': 1, 'city': 1, 'country': 1,'headimgurl': 1,'wechat': 1}
            let account = await user_db.findOne(where, opt);
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