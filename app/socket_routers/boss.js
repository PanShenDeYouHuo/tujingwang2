const boss = require('../controllers/user/boss');

module.exports = (socket)=> {
    

/////////////////////******权限设置*******////////////////////
    //获取账号列表，设置权限
    socket.on('getStaffAccounts', boss.getStaffAccounts(socket));

/////////////////////******账号认证*******////////////////////
    //获取需要账号认证的账号列表
    socket.on('getAuthenticateAccounts', boss.getAuthenticateAccounts(socket));

}