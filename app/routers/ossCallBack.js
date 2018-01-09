const router = require('koa-router')();

const routers = router
	.get('/', async(ctx, next)=>{
        console.log(ctx);
		ctx.body = 'osscallback';
	})

module.exports = routers;