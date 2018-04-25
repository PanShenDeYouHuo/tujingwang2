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
	//添加参考文件
	.post('/refFileUpload', projectFile.refFileUpload())
	//添加项目文件
	.post('/proFileUpload', projectFile.proFileUpload())
	//添加图片文件
	.post('/picFileUpload', projectFile.picFileUpload())

module.exports = routers;

