const sio = require('socket.io')();
const socket_routers = require('./socket_routers');								//socket.io服务器路由
const socket_authentication = require('./controllers/socket_authentication');	//用户验证中间件

//authentication
// sio.use(socket_authentication('hello'));

//socket.io 初始化 和 socket路由
sio.on('connection', socket_routers());

module.exports = sio;