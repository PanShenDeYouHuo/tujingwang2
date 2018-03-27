// 解析上下文里node原生请求的POST参数
function parsePostData( ctx ) {
	return new Promise((resolve, reject) => {
	  try {
		let postdata = "";
		ctx.req.addListener('data', (data) => {
		  postdata += data
		})
		ctx.req.addListener("end",function(){
			postdata = postdata.replace(/&/g, ',')
			postdata = '{' + postdata + '}';
			console.log(JSON.parse(postdata));
			// let parseData = parseQueryStr( postdata )
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
	for (  let [ index, queryStr ] of queryStrList.entries()  ) {
		let itemList = queryStr.split('=')
		queryData[ itemList[0] ] = itemList[1]
	}
	return queryData
}

module.exports = parsePostData;