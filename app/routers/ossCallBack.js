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
		let postData = await parsePostData(ctx);
		//拷贝文件
		console.log(postData.bucket);
		console.log(postData.object);
		console.log(postData.size);
		//保存到数据库
		//成功返回
		ctx.body = { postData};
	})
	.post('/proFileUpload', async(ctx, next)=> {
		console.log('post');
		//拷贝文件
		//保存到数据库
		//成功返回
		ctx.body = { text: 'osscallback'};
	})

module.exports = routers;


// 解析上下文里node原生请求的POST参数
function parsePostData( ctx ) {
	return new Promise((resolve, reject) => {
	  try {
		let postdata = "";
		ctx.req.addListener('data', (data) => {
		  postdata += data
		})
		ctx.req.addListener("end",function(){
			let parseData = parseQueryStr( postdata )
			resolve( parseData )
		})
		} catch ( err ) {
			reject(err)
		}
	})
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr( queryStr ) {
	let queryData = {}
	let queryStrList = queryStr.split('&')
	console.log( queryStrList )
	for (  let [ index, queryStr ] of queryStrList.entries()  ) {
		let itemList = queryStr.split('=')
		queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
	}
	return queryData
}