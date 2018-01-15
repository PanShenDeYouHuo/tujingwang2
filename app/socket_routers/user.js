// const token = require('../modules/node-jwt');
const user = require('../controllers/user');

module.exports = (socket)=> {
    // //token登入
    // socket.on('tokenLogin', (data, fu)=>{
    // });

    //联系信息更新
    socket.on('putContactInformation', user.putContactInformation(socket.account));

    //账户认证
    socket.on('putRealInformation', user.putRealInformation(socket.account));
    
}