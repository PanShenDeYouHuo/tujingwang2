const router = require('koa-router')();
const request = require('request');
const wechat = require('../modules/wechat')();


let routers = router;

/**
 * 根据用户的code获得access_token
 * 
 * @param {string} appId 
 * @param {string} apaSecret 
 * @param {扫码获得的code} code 
 * @returns 返回access_token
 */
getAccess_token = (appId, appSecret, code)=> {
    let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${appSecret}&code=${code}&grant_type=authorization_code`
    return new Promise ((resolve, reject)=> {
        request(url,function(error,response,body){
            if(!error && response.statusCode == 200){
                resolve(body)
            }
        });
    });
}


module.exports = (io)=> {
    routers.get('/wechat', async(ctx)=> {

        console.log(`appid: ${wechat.appId}, appSecret: ${wechat.appSecret}`)
        console.log(await getAccess_token(wechat.appId, wechat.appSecret, ctx.query.code));
        
        io.to(ctx.query.state).emit('wechatok','surprise');

        //成功后关闭
        let html = `
            <script type="text/javascript">
                self.close()
            </script> 
        `
        ctx.body = html;
    });

    return routers;
}