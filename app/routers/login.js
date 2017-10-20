const router = require('koa-router')();

let routers = router;

module.exports = (io)=> {
    routers.get('/wechat', async(ctx)=> {
        io.to(ctx.query.state).emit('wechatok','surprise');
        let html = `
            <a href="javascript:$(document).ready(function() {setTimeout("self.close",1000)})" ></a>
        `
        ctx.body = html;
    });

    return routers;
}