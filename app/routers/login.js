const router = require('koa-router')();
const request = Promise.promisify(require('request'));

let routers = router;

module.exports = (io)=> {
    routers.get('/wechat', async(ctx)=> {
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