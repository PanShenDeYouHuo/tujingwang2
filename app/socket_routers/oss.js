const stsToken = require('../controllers/oss/stsToken');

module.exports = (socket)=> {
    console.log('开始')

    //获得oss读权限的sts临时token
    socket.on('getReadStsToken', stsToken.getReadStsToken());

    // //获得oss写权限的sts临时token
    // socket.on('getWriteStsToken', stsToken.getWriteStsToken());
    
}