const router = require('koa-router')();

const home = require('./home');
const user = require('./user');
const ossCallBack = require('./ossCallBack');

router.use('/', home.routes(), home.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());
router.use('/osscallback', ossCallBack.routes(), ossCallBack.allowedMethods());

module.exports = router;