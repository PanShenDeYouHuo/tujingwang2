const router = require('koa-router')();
const projectFile = require('../controllers/project/file');

const routers = router
    .post('/', async(ctx, next)=>{
		console.log(ctx.query);
        console.log('post');
		ctx.body = {text:'osscallback'};
	})
	.post('/refFileUpload', projectFile.refFileUpload())
	.post('/proFileUpload', async(ctx, next)=> {
		console.log('post');
		//拷贝文件
		//保存到数据库
		//成功返回
		ctx.body = { text: 'osscallback'};
	})

module.exports = routers;

