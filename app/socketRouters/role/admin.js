const admin = require('../../controllers/user/admin');

module.exports = (socket)=> {
    
    // //boss账号注册
    // socket.on('postBossAccount', admin.postBossAccount());

    //boss账号个数统计 总数 禁用数
    socket.on('getBossAccountStatistics', admin.getBossAccountStatistics());

    //boss账号列表获取
    socket.on('getBossAccounts', admin.getBossAccounts());

    //boss账号获取
    socket.on('getBossAccount', admin.getBossAccount());

    //boss账号是否禁用设置
    socket.on('putBossAccount', admin.putBossAccount());

    //boss账号删除
    socket.on('deleteBossAccount', admin.deleteBossAccount());

}