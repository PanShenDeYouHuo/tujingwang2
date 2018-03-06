const mongoose = require("./mongodb.js");
const schema = mongoose.Schema;

let project = {
    creationTime: { type: Date, default:Date.now}, //创建时间
    name: { type: String },      //项目名
    publisher: { type: String }, //发布人
    service: { type: String },   //客服
    // manager: { type: String },   //项目管理人

    referenceFile: [            //参考文件
        { name:{ type: String }, url:{ type: String } }
    ],
    projectFile: [              //项目文件
        { name:{ type: String }, url:{ type: String } }
    ],

    image: [
        {
            creationTime: { type: Date, default:Date.now}, //创建时间
            state: { type: Number, default: 0 },//图片状态 0：未完成，1：完成
            designType: { type: String },       //设计类型
            style: { type: String },            //设计风格
            space: { type: String },            //设计空间
            area: { type: String},              //设计区域
            imageType: { type: String },        //图片类型
            price: { type: Number },            //价格
            // murl: { type: String },             //模型地址
            iurl: { type: String },             //图片地址
            productionsGroup: [                 //工作类型和id
                { workType: { type: String}, userId: { type: String} }
            ]
        }
    ]
}

let projectSchema = new schema(project);
let Project = mongoose.model("Project",projectSchema);

function ProejctDB() {

    this.name = 'project_db';

}

 ////////////////////////////////////////////////
 //////////////////*** 增 ***////////////////////
////////////////////////////////////////////////

/**
 * 插入数据
 * @param  {Object} data 
 * @return {Object}      
 */
ProejctDB.prototype.inset = (data)=> {
    return new Promise((resolve, reject)=> {
        let project = new Project(data);
        project.save((err, res)=> {
            if(err) return reject(err);
            resolve(project.id);
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
ProejctDB.prototype.remove = (where)=> {
    return new Promise((resolve, reject)=> {
        Project.remove(where, (err, res)=> {
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
ProejctDB.prototype.findOneAndRemove = (where)=> {
    return new Promise((resolve, reject)=> {
        Project.findOneAndRemove(where, (err, res)=> {
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
ProejctDB.prototype.findByIdAndRemove = (id)=> {
    return new Promise((resolve, reject)=> {
        Project.findByIdAndRemove(id, (err, res)=> {
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
ProejctDB.prototype.update = (where, data)=> {
    return new Promise((resolve, reject)=> {
        Project.update(where, data, (err, res)=> {
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
ProejctDB.prototype.findByIdAndUpdate = (id, data)=> {
    return new Promise((resolve, reject)=> {
        Project.findByIdAndUpdate(id, data, (err, res)=> {
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
ProejctDB.prototype.findOneAndUpdate = (where, data)=> {
    return new Promise((resolve, reject)=> {
        Project.findOneAndUpdate(where, data, (err, res)=> {
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
ProejctDB.prototype.find = (where, opt)=> {
    return new Promise((resolve, reject)=> {
        Project.find(where, opt, (err, res)=> {
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
ProejctDB.prototype.findOne = (where, opt)=> {
    return new Promise((resolve, reject)=> {
        Project.findOne(where, opt, (err, res)=> {
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
ProejctDB.prototype.findById = (id, opt)=> {
    return new Promise((resolve, reject)=> {
        Project.findById(id, opt, (err, res)=> {
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
ProejctDB.prototype.count = (where)=> {
    return new Promise((resolve,reject)=> {
        Project.count(where, (err, res)=> {
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
ProejctDB.prototype.findProjects = (whereStr,pageSize,currentPage,sort)=> {

    //跳过数
    let skipnum = (currentPage - 1) * pageSize;

    return new Promise((resolve, reject)=> {
        Project.find(whereStr).skip(skipnum).limit(pageSize).sort(sort).exec((err, res)=> {
            if (err) return reject(err);
            resolve(res);
        });
    });
}

module.exports = new ProejctDB();