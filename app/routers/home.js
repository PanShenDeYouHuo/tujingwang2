const router = require('koa-router')();

const routers = router
	.get('/', async(ctx, next)=>{
		ctx.body = 'hello';
	})

module.exports = routers;