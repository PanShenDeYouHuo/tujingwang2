const router = require('koa-router')();

const home = require('./home');
const user = require('./user');

router.use('/', home.routes(), home.allowedMethods());
router.user('/user', user.routes(), user.allowedMethods());

module.exports = router;