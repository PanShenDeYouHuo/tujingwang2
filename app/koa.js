const Koa = require('koa');
// const fs = require('fs');

const koa = new Koa();
const routers = require('./routers');										//服务器路由

// 初始化路由中间件
koa.use(routers.routes()).use(routers.allowedMethods());

module.exports = koa;