const router = require('koa-router')();

let routers = router;

module.exports = (io)=> {
    routers.get('/wechat', async(ctx)=> {
        io.to(ctx.query.state).emit('wechatok','surprise');
        ctx.body = "";
    });

    return routers;
}