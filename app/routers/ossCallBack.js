const router = require('koa-router')();

const routers = router
	.get('/', async(ctx, next)=>{
        console.log(ctx);
        ctx.response.status = 200;
		ctx.body = 'osscallback';
    })
    .post('/', async(ctx, next)=>{
        console.log(ctx);
        ctx.response.status = 200;
		ctx.body = {text:'osscallback'};
	})

module.exports = routers;