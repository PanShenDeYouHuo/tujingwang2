const router = require('koa-router')();

let routers = router;

module.exports = (io)=> {
    routers.get('/wechat', async(ctx)=> {
        io.to(ctx.query.state).emit('wechatok','surprise');
        let html = `<script language="java script"> 
                            setTimeout("self.close()",1000)
                    </script> `
        ctx.body = html;
    });

    return routers;
}