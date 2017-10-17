const router = require('koa-router')();

let routers = router;

module.exports = (io)=> {
    console.log(io.sockets);
    routers.get('/wechat', async(ctx)=> {
        // io.on("connection",function(socket){
            console.log(ctx.query.state);
            io.to(ctx.query.state).emit('wechatok','surprise');
        // });
    });

    return routers;
}