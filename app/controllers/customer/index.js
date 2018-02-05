const customer_db = require('../../service/mongodb/m_customer');

function Customer() {
    this.name = 'customer';
}


/**
 * 添加客户
 * 
 * @param {string} name 项目名称
 * @param {string} service 客服
 */
Customer.prototype.postCustomer = (socket)=> {
    return async (data, fu)=> {
        try {  
            console.log(socket.account);
            // fu(await project_db.inset({
            //     fromCompany: 
            //     name: data.name, 
            //     service: data.uid
            // }));
        } catch (err) {
            console.log(err);
            fu({err: true, message: '创建发生错误'});
        }
    }
}

module.exports = new Customer();