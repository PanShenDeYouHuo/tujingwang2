const jwt = require('../../modules/node-jwt');

module.exports = (socket)=> {
    
    //boss账号注册
    socket.on('postBossAccount', stsToken.postBossAccount());

    //boss账号权限管理
    socket.on('putBossAccount', stsToken.putBossAccount());

    //boss账号删除
    socket.on('deleteBossAccount', stsToken.deleteBossAccount());

}