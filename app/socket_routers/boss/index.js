const boss = require('../../controllers/boss');

module.exports = (socket)=> {
    
    
    //boss账号列表获取
    socket.on('getStaffAccounts', boss.getStaffAccounts());

}