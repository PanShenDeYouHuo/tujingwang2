const stsToken = require('../controllers/oss/stsToken');

module.exports = (socket)=> {

    //获得oss写权限的sts临时token
    socket.on('getReadStsToken', (uid, fu)=>{
        try {
            console.log(uid);
            fu(await stsToken.getReadStsToken(uid));
        } catch (err) {
            console.log(err);
            socket.volatile.emit('appError','发生错误');
        }
    });
    
}