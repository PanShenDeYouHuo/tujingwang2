const admin = require('../controllers/admin');

module.exports = (socket)=> {
    
    //boss账号注册
    socket.on('postBossAccount', admin.postBossAccount());

    //boss账号权限管理
    socket.on('putBossAccount', admin.putBossAccount());

    //boss账号删除
    socket.on('deleteBossAccount', admin.deleteBossAccount());

}