const stsToken = require('../controllers/oss/stsToken');

module.exports = (socket)=> {

    //获得oss写权限的sts临时token
    socket.on('getReadStsToken', async (uid, fu)=>{
        try {
            let token = await stsToken.getReadStsToken(uid);
            console.log(token);
            fu(token);
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    });

    //获得oss写权限的sts临时token
    socket.on('getWriteStsToken', async (uid, fu)=>{
        try {
            let token = await stsToken.getWriteStsToken(uid);
            fu(token);
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});   
        }
    });
    
}