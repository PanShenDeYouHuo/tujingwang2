const router = require('koa-router')();

const routers = router
	.get('/', async(ctx, next)=>{
		ctx.body = 'osscallback';
    })
    .post('/', async(ctx, next)=>{
		console.log(ctx.query);
        console.log('post');
		ctx.body = {text:'osscallback'};
	})
	.post('/refFileUpload', async(ctx, next)=> {
		console.log(ctx.query);
		console.log(ctx)
		console.log(ctx.res.params);
		console.log('post');
		ctx.body = { res: ctx.res};
	})
	.post('/proFileUpload', async(ctx, next)=> {
		console.log('post');
		ctx.body = { text: 'osscallback'};
	})

module.exports = routers;