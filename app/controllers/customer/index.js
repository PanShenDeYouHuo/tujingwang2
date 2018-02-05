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
 * 获取客户列表
 * 
 * @param {object} data.uid 客服id 
 * @returns 
 */
Customer.prototype.getCustomers = (socket)=> {
    return async (data, fu)=> {
        try{
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

/**
 * 跟新客户数据
 * 
 * @param {object} data._id 项目编号
 * @returns 
 */
Customer.prototype.putCustomer = (socket)=> {
    return async (data, fu)=> {
        try{
            fu(await customer_db.findByIdAndUpdate(data._id, data));
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}

/**
 * 删除客户数据
 * 
 * @param {object} data._id 项目编号
 * @returns 
 */
Customer.prototype.deleteCustomer = (socket)=> {
    return async (data, fu)=> {
        try{
            fu(await customer_db.findByIdAndRemove(data._id));
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}

module.exports = new Customer();