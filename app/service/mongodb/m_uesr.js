const mongoose = require("./mongodb.js");
const schema = mongoose.Schema;

let user = {

    //账号状态是否登入
    state:{
        type:Boolean,
        default:false,
    },
    //真实个人信息
    information:{
        name:{type:String},
        IDCardFront:{type:String},
        IDCardReverse:{type:String},
    },
    //通知
    notify:[
        {   
            //通知状态
            state:{type:Boolean, default:false},
            //通知类型
            ntype:{type:String},
            //通知标题
            title:{type:String},
            //通知内容
            concent:{type:String},
            //通知路由
            router:{type:String},
        }
    ],
    //用户邮箱
    mail:{type:String},
    //手机号码
    phone:{type:Number},
    //登入密码
    password:{type:String},
    //权限
    authority:[
        
    ],
    //访问令牌
    accessToken:{type:String},
    //昵称
    nickname:{type:String},
    //性别
    sex: {type:Number},
    //省份
    province:{type:String},
    //城市
    city:{type: String},
    //国家
    country:{type: String},
    //头像地址
    headimgurl:{type: String},
    //微信需要的访问令牌
    wechat:{
        accessToken:{type: String},
        refreshToken:{type: String},
        //跨网站唯一id
        unionid:{type: String}
    }
}

let userSchema = new schema(user);
let User = mongoose.model("User",userSchema);

function UserClass() {

    this.name = 'user_db';

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
        let user = new User(data);
        user.save((err, res)=> {
            if(err) return reject(err);
            resolve();
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
        User.remove(where, (err, res)=> {
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
UserClass.prototype.findOneAndRemove = (where)=> {
    return new Promise((resolve, reject)=> {
        User.findOneAndRemove(where, (err, res)=> {
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
UserClass.prototype.findByIdAndRemove = (id)=> {
    return new Promise((resolve, reject)=> {
        User.findByIdAndRemove(id, (err, res)=> {
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
    return new Promise((resolve, reject)=> {
        User.update(where, data, (err, res)=> {
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
        User.findByIdAndUpdate(id, data, (err, res)=> {
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
    return new Promise((resolve, reject)=> {
        User.findOneAndUpdate(where, data, (err, res)=> {
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
        User.find(where, opt, (err, res)=> {
            if(err) return reject(err);
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
        User.findOne(where, opt, (err, res)=> {
            if(err) return reject(err);
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
        User.findById(id, opt, (err, res)=> {
            if(err) return reject(err);
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
        User.count(where, (err, res)=> {
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
UserClass.prototype.findUsers = (whereStr,pageSize,currentPage,sort)=> {

    //跳过数
    let skipnum = (currentPage - 1) * pageSize;

    return new Promise((resolve, reject)=> {
        User.find(whereStr).skip(skipnum).limit(pageSize).sort(sort).exec((err, res)=> {
            if (err) return reject(err);
            resolve(res);
        });
    });
}

module.exports = new UserClass();