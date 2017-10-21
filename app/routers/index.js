const router = require('koa-router')();


module.exports = (io)=> {

        let home = require('./home');
        router.use('/', home.routes(), home.allowedMethods());

        let user = require('./user')(io);
        router.user('/user', user.routes(), user.allowedMethods());

        return router;
    }