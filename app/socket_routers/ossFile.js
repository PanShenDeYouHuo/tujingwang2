const stsToken = require('../controllers/oss/stsToken');

module.exports = (socket)=> {

    //获得oss写权限的sts临时token
    socket.on('getWriteStsToken', async (uid, fu)=>{
        try {
            let token = await stsToken.getWriteStsToken(uid)
            fu(token);
        } catch (err) {
            console.log(err);
            socket.volatile.emit('appError','发生错误');
        }
    });
    
}