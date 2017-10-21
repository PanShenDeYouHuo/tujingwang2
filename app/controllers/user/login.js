const wechat = require('../../modules/wechat')();
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
        // console.log(`appid: ${wechat.appId}, appSecret: ${wechat.appSecret}`)
        console.log(`code: ${ctx.query.code}`);
        let body = await wechat.getAccessToken(wechat.appId, wechat.appSecret, ctx.query.code);
        console.log(body);
        if(body.errcode) {
            console.log(body.errmsg);
        } else {
            console.log(`access_token:${body.access_token}`);
            console.log(`expires_in:${body.expires_in}`);
            console.log(`refresh_token:${body.refresh_token}`);
            console.log(`openid:${body.openid}`);
            console.log(`scope:${body.scope}`);
        }

        let user = await wechat.getUnionId(body.access_token, body.openId);
        if(body.errcode) {
            console.log(body.errmsg)
        } else {
            console.log(user);
        }



        sio.to(ctx.query.state).emit('wechatok','surprise');

        //成功后关闭
        let html = `
            <script type="text/javascript">
                self.close()
            </script> 
        `
        ctx.body = html;
    }
}

module.exports = new Login();