const router = require('koa-router')();


module.exports = (io)=> {

        let home = require('./home');
        router.use('/', home.routes(), home.allowedMethods());

        let wechatLogin = require('./wechatLogin')(io);
        router.use('/wechatLogin', wechatLogin.routes(), wechatLogin.allowedMethods());

        return router;
    }