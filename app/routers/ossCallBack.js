const router = require('koa-router')();
const projectFile = require('../controllers/project/file');
const parsePost  = require('../modules/parsePostData');

const routers = router
    .post('/', async(ctx, next)=>{
		let postData = await parsePost(ctx);
         
		postData.name = postData.object.substr(postData.object.lastIndexOf('/') + 1);
		// postData.newObject = postData.object.substr(14);
		
		//保存到数据库
		let referenceFile = {
			name: postData.name,
			object: postData.object,
			size: postData.size,
			bucket: postData.bucket
		}
		//成功返回
		ctx.body = referenceFile;
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

