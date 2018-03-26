const Koa = require('koa');
// const fs = require('fs');

const koa = new Koa();
const routers = require('./routers');										//服务器路由
const bodyParser = require('koa-bodyparser')                                //body解析
const static = require('koa-static');                                       //静态服务器

// 使用ctx.body解析中间件
// koa.use(bodyParser());

//初始化静态服务器
koa.use(static(__dirname + '/public',{ maxage: 30*86400}));     

// 初始化路由中间件
koa.use(routers.routes()).use(routers.allowedMethods());    

module.exports = koa;