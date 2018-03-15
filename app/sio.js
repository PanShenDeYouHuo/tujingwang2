const sio = require('socket.io')();
const socketRouters = require('./socketRouters');								//socket.io服务器路由

//socket.io 初始化 和 socket路由
sio.on('connection', socketRouters());

module.exports = sio;