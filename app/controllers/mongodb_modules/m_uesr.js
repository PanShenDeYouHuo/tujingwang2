const mongoose = require("./mongodb.js");
const schema = mongoose.Schema;

let user = {

    mail:{
        type: String,
    },
    phone:{
		type:Number,
    },
    password:{
        type: String,
    },
    anthority:{
        type: Number,
    },

    nickname:{
        type: String,
    },
    sex: {
        type: Number,
    },
    province:{
        type: String,
    },
    city:{
        type: String,
    },
    country:{
        type: String,
    },
    headimgurl:{
        type: String,
    },
    openid:{
        type: String,
    },
    unionid:{
        type: String,
    }
}

let userSchema = new schema(user);

function UserClass() {

    this.User = mongoose.model("Customer",userSchema);

}

  ////////////////////////////////////////////////
 //////////////////*** 增 ***////////////////////
////////////////////////////////////////////////

/**
 * 插入数据
 * @param  {Object} data 
 * @return {Object}      
 */
UserClass.prototype.inset = (data)=> {
    return new Promise((resolve, reject)=> {
        let user = new this.User(data);
        user.save((err, res)=> {
            if(err) return reject(err);
            resolve({ok: 1});
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
UserClass.prototype.remove = (where)=> {
    return new Promise((resolve, reject)=> {
        this.User.remove(where, (err, res)=> {
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
User.prototype.findOneAndRemove = (where)=> {
    return new Promise((resolve, reject)=> {
        this.User.findOneAndRemove(where, (err, res)=> {
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
User.prototype.findByIdAndRemove = (id)=> {
    return new Promise((resolve, reject)=> {
        this.User.findByIdAndRemove(id, (err, res)=> {
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
UserClass.prototype.update = (where, data)=> {
    return new Promise((reject, reject)=> {
        this.User.update(where, data, (err, res)=> {
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
UserClass.prototype.findByIdAndUpdate = (id, data)=> {
    return new Promise((resolve, reject)=> {
        this.User.findByIdAndUpdate(data._id, data, (err, res)=> {
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
UserClass.prototype.findOneAndUpdate = (where, data)=> {
    return new Promise((reject, reject)=> {
        this.User.findOneAndUpdate(where, data, (err, res)=> {
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
UserClass.prototype.find = (where, opt)=> {
    return new Promise((resolve, reject)=> {
        this.User.find(where, opt, (err, res)=> {
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
UserClass.prototype.findOne = (where, opt)=> {
    return new Promise((resolve, reject)=> {
        this.User.findOne(where, opt, (err, res)=> {
            if(err) reject(err);
            resolve(res);
        })
    });
}

/**
 * 根据id查询
 * 
 * @param {String} id 
 * @param {Object} opt 
 * @returns 
 */
UserClass.prototype.findById = (id, opt)=> {
    return new Promise((resolve, reject)=> {
        this.User.findById(id, opt, (err, res)=> {
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
UserClass.prototype.count = (where)=> {
    return new Promise((resolve,reject)=> {
        this.User.count(where, (err, res)=> {
            if(err) return reject(err);
            resolve(res);
        });
    });
}

module.exports = new UserClass();