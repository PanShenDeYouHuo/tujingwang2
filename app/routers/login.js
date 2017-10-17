const router = require('koa-router')();

let routers = router;

module.exports = (io)=> {
    console.log(io.sockets);
    routers.get('/wechat', async(ctx)=> {
        console.log(ctx.query);
        io.on("connection",function(socket){
            io.to(ctx.query.state).emit('wechatok','surprise');
        });
        ctx.body = 'wechat';
    });

    return routers;
}