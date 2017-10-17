const router = require('koa-router')();

const routers = router
    .get('/wechatLogin', async(ctx)=>{
        ctx.body = 'wechat';
})

module.exports = routers;