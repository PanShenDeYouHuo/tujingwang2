const router = require('koa-router')();

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
		// console.log(ctx.query);
		// console.log(ctx.request.body);
		// console.log('post');
		ctx.body = { postData};
	})
	.post('/proFileUpload', async(ctx, next)=> {
		console.log('post');
		ctx.body = { text: 'osscallback'};
	})

module.exports = routers;