const Wechat = require('../../modules/wechat');
const request = require('request');
const sio = require('../../sio');

Login = ()=> {
    this.name = 'login';
}

login.prototype.wechat = ()=> {
    return async(ctx)=> {
        console.log(`appid: ${Wechat.appId}, appSecret: ${Wechat.appSecret}`)
                let body = await Wechat.getAccessToken(wechat.appId, wechat.appSecret, ctx.query.code);
                if(body.errcode) {
                    console.log(body.errmsg);
                } else {
                    console.log(`access_token:${body.access_token}`);        
                    console.log(`expires_in:${body.expires_in}`);        
                    console.log(`refresh_token:${body.refresh_token}`);        
                    console.log(`openid:${body.openid}`);        
                    console.log(`scope:${body.scope}`);        
                }
        
                let user = await Wechat.getUnionId(body.access_token, body.openId);
                if(body.errcode) {
                    console.log(body.errmsg)
                } else {
                    console.log(user);
                }
        
        
        
                io.to(ctx.query.state).emit('wechatok','surprise');
        
                //成功后关闭
                let html = `
                    <script type="text/javascript">
                        self.close()
                    </script> 
                `
                ctx.body = html;
    }
}

login.prototype

module.exports 