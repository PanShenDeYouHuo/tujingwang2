const router = require('koa-router')();


module.exports = (io)=> {
        console.log(io);
        let home = require('./home');
        router.use('/', home.routes(), home.allowedMethods());

        let wechatLogin = require('./wechatLogin');
        router.use('/', wechatLogin.routes(), wechatLogin.allowedMethods());

    }