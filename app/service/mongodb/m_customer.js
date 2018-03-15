const mongoose = require("./mongodb.js");
const schema = mongoose.Schema;

let customer = {
    fromCompany: { type: String},   //属于那个公司的客户，公司ID
    name: { type: String },         //客户名
    companyName: { type: String },  //所属公司
    QQ: {type:Number},              //qq
    wechat: {type: String},         //微信
    phone: {type:Number},           //手机号码
}

let customerSchema = new schema(customer);
let Customer = mongoose.model("customer",customerSchema);

function CustomerDB() {

    this.name = 'customer_db';

}

 ////////////////////////////////////////////////
 //////////////////*** 增 ***////////////////////
////////////////////////////////////////////////

/**
 * 插入数据
 * @param  {Object} data 
 * @return {Object}      
 */
CustomerDB.prototype.inset = (data)=> {
    return new Promise((resolve, reject)=> {
        let customer = new Customer(data);
        customer.save((err, res)=> {
            if(err) return reject(err);
            resolve(customer.id);
        });
    });
}


  ////////////////////////////////////////////////
 //////////////////*** 删 ***////////////////////
////////////////////////////////////////////////

/**
 * 根据条件删除数据
 * 
 * @param {Object} where
 * @returns 
 */
CustomerDB.prototype.remove = (where)=> {
    return new Promise((resolve, reject)=> {
        Customer.remove(where, (err, res)=> {
            if(err) return reject(err);
            resolve(res);
        });
    });
}

/**
 * 根据条件只删除一条数据
 * 
 * @param {Object} where 
 * @returns 
 */
CustomerDB.prototype.findOneAndRemove = (where)=> {
    return new Promise((resolve, reject)=> {
        Customer.findOneAndRemove(where, (err, res)=> {
            if(err) return reject(err);
            resolve(res);
        });
    });
}

/**
 * 根据id删除数据
 * 
 * @param {any} id 
 * @returns 
 */
CustomerDB.prototype.findByIdAndRemove = (id)=> {
    return new Promise((resolve, reject)=> {
        Customer.findByIdAndRemove(id, (err, res)=> {
            if(err) return reject(err);
            resolve(res);
        });
    });
}


  ////////////////////////////////////////////////
 //////////////////*** 改 ***////////////////////
////////////////////////////////////////////////


/**
 * 根据条件跟新数据
 * 
 * @param {any} where 
 * @param {any} data 
 * @returns 
 */
CustomerDB.prototype.update = (where, data)=> {
    return new Promise((resolve, reject)=> {
        Customer.update(where, data, (err, res)=> {
            if(err) return reject(err);
            resolve({ok: 1});
        });
    });
}

/**
 * 根据_id跟新数据
 * 
 * @param {String} id 
 * @param {Object} data 
 * @returns 
 */
CustomerDB.prototype.findByIdAndUpdate = (id, data)=> {
    return new Promise((resolve, reject)=> {
        Customer.findByIdAndUpdate(id, data, (err, res)=> {
            if(err) return reject(err);
            resolve({ok: 1});
        });
    });
}

/**
 * 根据条件只跟新一条数据
 * 
 * @param {Object} where 
 * @param {Object} data 
 * @returns 
 */
CustomerDB.prototype.findOneAndUpdate = (where, data)=> {
    return new Promise((resolve, reject)=> {
        Customer.findOneAndUpdate(where, data, (err, res)=> {
            if(err) return reject(err);
            resolve({ok: 1});
        });
    });
}


  ////////////////////////////////////////////////
 //////////////////*** 查 ***////////////////////
////////////////////////////////////////////////


/**
 * 根据条件查询
 * 
 * @param {Object} where 
 * @param {Object} opt 
 * @returns 
 */
CustomerDB.prototype.find = (where, opt)=> {
    return new Promise((resolve, reject)=> {
        Customer.find(where, opt, (err, res)=> {
            if(err) reject(err);
            resolve(res);
        });
    });
}

/**
 * 根据条件查询返回一条数据
 * 
 * @param {Object} where 
 * @param {Object} opt 
 * @returns 
 */
CustomerDB.prototype.findOne = (where, opt)=> {
    return new Promise((resolve, reject)=> {
        Customer.findOne(where, opt, (err, res)=> {
            if(err) reject(err);
            resolve(res);
        })
    });
}

/**
 * 根据id查询
 * 
 * @param {String} id 
 * @param {Object} opt 设定返回那些属性
 * @returns 
 */
CustomerDB.prototype.findById = (id, opt)=> {
    return new Promise((resolve, reject)=> {
        Customer.findById(id, opt, (err, res)=> {
            if(err) reject(err);
            resolve(res);
        });
    });
}


/**
 * 根据条件查询，符合的数据总数
 * 
 * @param {Object} where 
 * @returns 
 */
CustomerDB.prototype.count = (where)=> {
    return new Promise((resolve,reject)=> {
        Customer.count(where, (err, res)=> {
            if(err) return reject(err);
            resolve(res);
        });
    });
}

/**
 * 根据条件进行分页查询
 * 
 * @param {any} whereStr    查询条件
 * @param {any} pageSize    单页面总数
 * @param {any} currentPage 当前页面
 * @param {any} sort        排序条件
 * @returns 
 */
CustomerDB.prototype.findCustomers = (whereStr,pageSize,currentPage,sort)=> {

    //跳过数
    let skipnum = (currentPage - 1) * pageSize;

    return new Promise((resolve, reject)=> {
        Customer.find(whereStr).skip(skipnum).limit(pageSize).sort(sort).exec((err, res)=> {
            if (err) return reject(err);
            resolve(res);
        });
    });
}

module.exports = new CustomerDB();