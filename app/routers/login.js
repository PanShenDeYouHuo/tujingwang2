const router = require('koa-router')();

let routers = router;
.get('/wecaht/hah', async(ctx)=> {
    ctx.body = 'wecaht';
});

module.exports = (io)=> {
    console.log(io.sockets);
    routers.get('/wecaht/hah', async(ctx)=> {
        ctx.body = 'wecaht';
    });

    return routers;
}