const router = require('koa-router')();

module.exports = (io)=> {
    console.log(io.sockets);
    let routers = router
        .get('/wecaht', async(ctx)=> {
            ctx.body = 'wecaht';
        });
    return routers;
}