const Koa = require('koa');
// const fs = require('fs');

//服务器绑定
const koa = new Koa();

//tls/ssl 数字证书
// let options = {
// 	key: fs.readFileSync('./tujinCA/server.key', 'utf8'),
// 	cert: fs.readFileSync('./tujinCA/server.crt', 'utf8')
// };

//https
// const server = require('https').createServer(options, app.callback());
// const io = require('socket.io')(server);

//http
// const server = require('http').createServer(app.callback());				//用koa开启http服务
// io = require('socket.io')(server); 											//将socket.io绑定http服务器,并使其为全局属性


const routers = require('./routers');										//服务器路由
// const socket_routers = require('./socket_routers');								//socket.io服务器路由
// const socket_authentication = require('./controllers/socket_authentication');	//用户验证中间件


// 初始化路由中间件
koa.use(routers.routes()).use(routers.allowedMethods());

// //authentication
// io.use(socket_authentication('hello'));

// //socket.io 初始化 和 socket路由
// io.on('connection', socket_routers());

// //开始监听80端口
// server.listen(80, ()=> {
// 	console.log('listen on: 80');
// });

module.exports = koa;