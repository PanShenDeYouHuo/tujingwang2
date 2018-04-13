const mongoose = require("./mongodb.js");
const schema = mongoose.Schema;

let payment = {
    creationTime: { type: Date, default:Date.now},      //创建时间
    pid: { type: String},                               //项目id
    iid: { type: String },                              //任务id
    money: { type: Number},                             //付款金额
    voucher: {                                          //交易凭证
        name: {type: String}, object: {type: String}, size: {type: Number}, bucket: {type: String}              
    }
}

let paymentSchema = new schema(payment);
let Payment = mongoose.model("paymen",paymentSchema);

function PaymentDB() {

    this.name = 'payment_db';

}

 ////////////////////////////////////////////////
 //////////////////*** 增 ***////////////////////
////////////////////////////////////////////////

/**
 * 插入数据
 * @param  {Object} data 
 * @return {Object}      
 */
PaymentDB.prototype.inset = (data)=> {
    return new Promise((resolve, reject)=> {
        let payment = new Customer(data);
        payment.save((err, res)=> {
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
PaymentDB.prototype.remove = (where)=> {
    return new Promise((resolve, reject)=> {
        Payment.remove(where, (err, res)=> {
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
PaymentDB.prototype.findOneAndRemove = (where)=> {
    return new Promise((resolve, reject)=> {
        Payment.findOneAndRemove(where, (err, res)=> {
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
PaymentDB.prototype.findByIdAndRemove = (id)=> {
    return new Promise((resolve, reject)=> {
        Payment.findByIdAndRemove(id, (err, res)=> {
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
PaymentDB.prototype.update = (where, data)=> {
    return new Promise((resolve, reject)=> {
        Payment.update(where, data, (err, res)=> {
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
PaymentDB.prototype.findByIdAndUpdate = (id, data)=> {
    return new Promise((resolve, reject)=> {
        Payment.findByIdAndUpdate(id, data, (err, res)=> {
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
PaymentDB.prototype.findOneAndUpdate = (where, data)=> {
    return new Promise((resolve, reject)=> {
        Payment.findOneAndUpdate(where, data, (err, res)=> {
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
PaymentDB.prototype.find = (where, opt)=> {
    return new Promise((resolve, reject)=> {
        Payment.find(where, opt, (err, res)=> {
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
PaymentDB.prototype.findOne = (where, opt)=> {
    return new Promise((resolve, reject)=> {
        Payment.findOne(where, opt, (err, res)=> {
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
PaymentDB.prototype.findById = (id, opt)=> {
    return new Promise((resolve, reject)=> {
        Payment.findById(id, opt, (err, res)=> {
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
PaymentDB.prototype.count = (where)=> {
    return new Promise((resolve,reject)=> {
        Payment.count(where, (err, res)=> {
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
PaymentDB.prototype.findCustomers = (whereStr,pageSize,currentPage,sort)=> {

    //跳过数
    let skipnum = (currentPage - 1) * pageSize;

    return new Promise((resolve, reject)=> {
        Payment.find(whereStr).skip(skipnum).limit(pageSize).sort(sort).exec((err, res)=> {
            if (err) return reject(err);
            resolve(res);
        });
    });
}

module.exports = new PaymentDB();