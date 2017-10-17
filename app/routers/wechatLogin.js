const router = require('koa-router')();

const routers = router
.get('/', async(ctx)=>{
    ctx.body = 'hello';
})

module.exports = routers;