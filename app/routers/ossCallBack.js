const router = require('koa-router')();

const routers = router
	.get('/', async(ctx, next)=>{
		ctx.body = 'osscallback';
    })
    .post('/', async(ctx, next)=>{
        console.log('有回调');
		ctx.body = {text:'osscallback'};
	})
	.get('/refFileUpload', async(ctx, next)=> {
		console.log('get');
		ctx.body = { text: 'osscallback'};
	})
	.post('/proFileUpload', async(ctx, next)=> {
		console.log('post');
		ctx.body = { text: 'osscallback'};
	})

module.exports = routers;