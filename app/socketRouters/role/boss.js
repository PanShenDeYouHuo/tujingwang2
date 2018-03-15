const boss = require('../../controllers/user/boss');
const accountSts = require('../../controllers/oss/accountSts');

module.exports = (socket)=> {
    

/////////////////////******权限设置*******////////////////////
    //获取账号列表，设置权限
    socket.on('getStaffAccounts', boss.getStaffAccounts(socket));
    socket.on('putAuthority', boss.putAuthority(socket));

/////////////////////******账号认证*******////////////////////
    //获取需要账号认证的账号列表
    socket.on('getAuthenticateAccounts', boss.getAuthenticateAccounts(socket));
    //跟新账号认证的状态,通过或者否决
    socket.on('putAuthenticate', boss.putAuthenticate(socket));
    //获取account boss读的权限，用于读取账号认证所需要的照片
    socket.on('getReadAccountStsTokenBoss', accountSts.getReadAccountStsTokenBoss(socket));
    //获取account boss读写的权限，用于读取账号认证所需要的照片
    socket.on('getWriteAndReadAccountStsTokenBoss', accountSts.getWriteAndReadAccountStsTokenBoss(socket));

}