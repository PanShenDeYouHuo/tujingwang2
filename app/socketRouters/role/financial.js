const financial = require('../../controllers/financial');

module.exports = (socket)=> {
    
    //创建客户
    socket.on('postCustomer', customer.postCustomer(socket));


    
}