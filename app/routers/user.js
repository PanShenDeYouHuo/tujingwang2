const router = require('koa-router')();
const login = require('../controllers/user/login');

let routers = router
    .get('/wechat', login.wechat);



module.exports = routers;

// /**
//  *user路由 
//  * 
//  * @param {socket.io} io 
//  * @returns 
//  */
// module.exports = (io)=> {
//     routers.get('/wechat', async(ctx)=> {

//         console.log(`appid: ${wechat.appId}, appSecret: ${wechat.appSecret}`)
//         let body = await getAccessToken(wechat.appId, wechat.appSecret, ctx.query.code);
//         if(body.errcode) {
//             console.log(body.errmsg);
//         } else {
//             console.log(`access_token:${body.access_token}`);        
//             console.log(`expires_in:${body.expires_in}`);        
//             console.log(`refresh_token:${body.refresh_token}`);        
//             console.log(`openid:${body.openid}`);        
//             console.log(`scope:${body.scope}`);        
//         }

//         let user = await getUnionId(body.access_token, body.openId);
//         if(body.errcode) {
//             console.log(body.errmsg)
//         } else {
//             console.log(user);
//         }



//         io.to(ctx.query.state).emit('wechatok','surprise');

//         //成功后关闭
//         let html = `
//             <script type="text/javascript">
//                 self.close()
//             </script> 
//         `
//         ctx.body = html;
//     });

//     return routers;
// }