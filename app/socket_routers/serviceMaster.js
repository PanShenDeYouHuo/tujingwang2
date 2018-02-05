const customer = require('../controllers/customer');

module.exports = (socket)=> {
    
        //创建客户
        socket.on('postCustomer', customer.postCustomer(socket));

    
        // //根据id获取客户信息
        // socket.on('getCustomer', customer.getCustomer());
        //根据uid获取客户列表
        socket.on('getCustomers', customer.getCustomers(socket));
        

        //跟新客户信息
        socket.on('putCustomer', customer.putCustomer(socket));


        
    }