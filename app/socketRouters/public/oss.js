const stsToken = require('../../controllers/oss/stsToken');
const accountSts = require('../../controllers/oss/accountSts');
const projectSts = require('../../controllers/oss/projectSts');

module.exports = (socket)=> {

    //获得oss读权限的sts临时token
    socket.on('getReadStsToken', stsToken.getReadStsToken(socket));
    socket.on('getWriteStsToken', stsToken.getWriteStsToken(socket));

    //获取account文件的临时读或写权限
    socket.on('getReadAccountStsToken', accountSts.getReadAccountStsToken(socket));
    socket.on('getWriteAccountStsToken', accountSts.getWriteAccountStsToken(socket));

    //获取project文件的临时读或取权限
    socket.on('getReadProjectStsToken', projectSts.getReadProjectStsToken(socket));
    socket.on('getWriteProjectStsToken', projectSts.getWriteProjectStsToken(socket));
    socket.on('getWriteAndReadProjectStsToken', projectSts.getWriteAndReadProjectStsToken(socket));
    socket.on('getWriteAndReadProjectStsToken', projectSts.getAllWriteAndReadProjectStsToken(socket));
    
}