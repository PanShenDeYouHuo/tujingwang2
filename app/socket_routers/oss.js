const stsToken = require('../controllers/oss/stsToken');

module.exports = (socket)=> {


    //获得oss读权限的sts临时token
    socket.on('getReadStsToken', stsToken.getReadStsToken(socket));
    socket.on('getReadAccountStsToken', stsToken.getReadAccountStsToken(socket));

    // //获得oss写权限的sts临时token
    socket.on('getWriteStsToken', stsToken.getWriteStsToken(socket));
    socket.on('getWriteAccountStsToken', stsToken.getWriteAccountStsToken(socket));
}