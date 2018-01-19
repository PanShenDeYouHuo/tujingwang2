const boss = require('../controllers/user/boss');
const stsToken = require('../controllers/oss/stsToken');

module.exports = (socket)=> {
    

/////////////////////******权限设置*******////////////////////
    //获取账号列表，设置权限
    socket.on('getStaffAccounts', boss.getStaffAccounts(socket));

/////////////////////******账号认证*******////////////////////
    //获取需要账号认证的账号列表
    socket.on('getAuthenticateAccounts', boss.getAuthenticateAccounts(socket));
    //获取account读的权限
    socket.on('getReadAccountStsToken', stsToken.getReadAccountStsToken(socket));

}