const Koa = require('koa');
const fs = require('fs');
const routers = require('./routers');											//https服务器路由
const socket_routers = require('./socket_routers');								//socket.io服务器路由
const socket_authentication = require('./controllers/socket_authentication');	//用户验证中间件

//服务器绑定
let app = new Koa();

//tls/ssl 数字证书

// let options = {
// 	key: fs.readFileSync('./tujinCA/server.key', 'utf8'),
// 	cert: fs.readFileSync('./tujinCA/server.crt', 'utf8')
// };

//https

// const server = require('https').createServer(options, app.callback());
// const io = require('socket.io')(server);

//http
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

//authentication
io.use(socket_authentication('hello'));

//socket.io 初始化 和 socket路由
io.on('connection', socket_routers());

//开始监听3000端口
server.listen(3000, ()=> {
	console.log('listen on: 3000');
});