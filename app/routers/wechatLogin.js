const router = require('koa-router')();

module.exports = (io)=> {
    console.log(io);
    let routers = router
        .get('./wechatLogin', async(ctx)=> {
            ctx.body = 'wecaht';
        });
    return routers;
}