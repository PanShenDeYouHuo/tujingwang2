const router = require('koa-router')();

const routers = router
	.get('/', async(ctx, next)=>{
		ctx.body = 'osscallback';
    })
    .post('/', async(ctx, next)=>{
        console.log('有回调');
		ctx.body = {text:'osscallback'};
	})

module.exports = routers;