const router = require('koa-router')();

let routers = router;

module.exports = (io)=> {
    routers.get('/wechat', async(ctx)=> {
        io.to(ctx.query.state).emit('wechatok','surprise');
        let html = `
            <script type="text/javascript">
                document.write("<h1>Hello World!</h1>")
                self.close()
            </script> 
        `
        ctx.body = html;
    });

    return routers;
}