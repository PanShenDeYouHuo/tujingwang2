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

            let accountInfo = {
                nickname: user.nickname,
                sex: user.sex,
                province: user.province,
                city: user.city,
                country: user.country,
                headimgurl: user.headimgurl,
                wechat: {
                    access_token: token.access_token,
                    refresh_token: token.refresh_token,
                    unionid: user.unionid
                }
            };

            //根据unionid查询，用户是否注册
            let where = {
                'wechat.unionid': accountInfo.wechat.unionid,
            };
            console.log(user_db.name)
            let c = await user_db.count(where);
            console.log(c);
            // if( ) {

            // }

            // await m_user.inset(user);
            
            ctx.body = html;
            sio.to(ctx.query.state).emit('wechatok','surprise');
            console.log('登入成功');

        } catch (err) {
            ctx.body = html;
            sio.to(ctx.query.state).emit('error','发生错误');
            console.log(err);
        }
    }
}



module.exports = new Login();