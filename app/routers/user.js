const router = require('koa-router')();
const login = require('../controllers/user/login');
const reg = require('../controllers/user/reg');

let routers = router
    //微信登入
    .get('/wechat', login.wechat())
    //微信boss级账号注册
    .get('/bossWechatReg', reg.bossWechatReg())
    //微信employee级账号注册
    .get('/staffWechatReg', reg.staffWechatReg())



module.exports = routers;
