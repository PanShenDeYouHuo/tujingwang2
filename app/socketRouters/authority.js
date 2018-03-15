// const admin = require('./role/admin');
// const boss = require('./role/boss');
// const serviceMaster = require('./role/serviceMaster');

const user = require('./public/user');
const oss = require('./public/oss');
const project = require('./public/project');


function Authority() {
    this.name = 'authority';

    this.role = {
        admin: require('./role/admin'),
        boss: require('./role/boss'),
        service: require('./role/service'),
        serviceMaster: require('./role/serviceMaster'),
    }
}

/**
 * 权限映射
 * 
 * @param {any} socket 
 * @param {any} functionNames 
 */
Authority.prototype.mapping = function(socket, functionNames) {
	for( let i = 0; i < functionNames.length; i++) {
        console.log(`role.${functionNames[i]}()`);
		this.role[functionNames[i]](socket);
	}
}

/**
 * 公共接口
 * 
 * @param {any} socket 
 */
Authority.prototype.public = function(socket) {
    user(socket);
    oss(socket);
    // project(socket);
}

// /**
//  * 管理员权限接口
//  * 
//  */
// Authority.prototype.admin = (socket)=> {
//     admin(socket);
// }

// /**
//  * 老板权限接口
//  * 
//  */
// Authority.prototype.boss = (socket)=> {
//     boss(socket);
// }

// /**
//  * 财务权限接口
//  * 
//  */
// Authority.prototype.financial = (socket)=> {

// }

// /**
//  * 客服权限接口
//  * 
//  */
// Authority.prototype.service = (socket)=> {
//     project(socket);
// }

// /**
//  * 客服主管权限接口
//  * 
//  */
// Authority.prototype.serviceMaster = (socket)=> {
//     serviceMaster(socket);
// }

// /**
//  * 组长权限接口
//  * 
//  */
// Authority.prototype.leder = (socket)=> {
    
// }

// /**
//  * 成员权限接口
//  * 
//  */
// Authority.prototype.render = (socket)=> {
    
// }

// /**
//  *客户权限接口 
//  * 
//  */
// Authority.prototype.customer = (socket)=> {

// }

module.exports = new Authority();