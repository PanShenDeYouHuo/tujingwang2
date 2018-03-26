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
		console.log(ctx.request);
		console.log('post');
		ctx.body = { text: 'osscallback'};
	})
	.post('/proFileUpload', async(ctx, next)=> {
		console.log('post');
		ctx.body = { text: 'osscallback'};
	})

module.exports = routers;