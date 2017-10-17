const router = require('koa-router')();


module.exports = (io)=> {

        let home = require('./home');
        router.use('/', home.routes(), home.allowedMethods());

        let login = require('./login')(io);
        router.use('/login', login.routes(), login.allowedMethods());

        return router;
    }