const project_db = require('../../service/mongodb/m_project');

function Financial() {
    this.name = 'financial';
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


module.exports = new Customer();