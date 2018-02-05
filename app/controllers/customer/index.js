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
            let where = {
                $or: [
                    {name: data.name},
                    {phone: data.phone}
                ]
            };
            let count = await customer_db.count(where);
            if (count !== 0) return fu({err: true, message: '重复登记'});

            fu(await customer_db.inset({
                fromCompany: socket.account.company.bossId,
                name: data.name, 
                companyName: data.companyName, 
                phone: data.phone, 
                QQ: data.QQ, 
                wechat: data.wechat
            }));
        } catch (err) {
            console.log(err);
            fu({err: true, message: '创建发生错误'});
        }
    }
}


/**
 * 客户列表
 * 
 * @param {object} data.uid 客服id 
 * @returns 
 */
Customer.prototype.getCustomers = (socket)=> {
    return async (data, fu)=> {
        try{
            console.log(data);
            let where = {
                fromCompany: socket.account.company.bossId,
            };
            let customers = await customer_db.findCustomers(where, data.pageSize, data.currentPage, {_id: -1});
            let count = await customer_db.count(where);
            count = Math.ceil(count/data.pageSize);
            fu({customers, count});
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}

module.exports = new Customer();