const admin = require('./admin');
const boss = require('./boss');
const user = require('./user');
const oss = require('./oss');
const project = require('./project');


function Authority() {
    this.name = 'authority';
}

/**
 * 管理员权限接口
 * 
 */
Authority.prototype.admin = (socket)=> {
    console.log('开启管理员接口')
    admin(socket);
    user(socket);
    project(socket);
    oss(socket);
}

/**
 * 老板权限接口
 * 
 */
Authority.prototype.boss = (socket)=> {
    boss(socket);
}

/**
 * 财务权限接口
 * 
 */
Authority.prototype.financial = (socket)=> {

}

/**
 * 客服权限接口
 * 
 */
Authority.prototype.service = (socket)=> {

}

/**
 * 组长权限接口
 * 
 */
Authority.prototype.leder = (socket)=> {

}

/**
 * 成员权限接口
 * 
 */
Authority.prototype.member = (socket)=> {

}

/**
 *客户权限接口 
 * 
 */
Authority.prototype.customer = (socket)=> {

}

module.exports = new Authority();