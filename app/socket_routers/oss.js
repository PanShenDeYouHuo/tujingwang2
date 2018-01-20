const stsToken = require('../controllers/oss/stsToken');
const accountSts = require('../controllers/oss/accountSts');

module.exports = (socket)=> {

    //获得oss读权限的sts临时token
    socket.on('getReadStsToken', stsToken.getReadStsToken(socket));
    socket.on('getWriteStsToken', stsToken.getWriteStsToken(socket));

    //获取路径account的临时权限
    socket.on('getReadAccountStsToken', accountSts.getReadAccountStsToken(socket));
    socket.on('getWriteAccountStsToken', accountSts.getWriteAccountStsToken(socket));
}