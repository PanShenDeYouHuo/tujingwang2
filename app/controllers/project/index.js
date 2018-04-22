const project_db = require('../../service/mongodb/m_project');
const customer_db = require('../../service/mongodb/m_customer');
const user_db = require('../../service/mongodb/m_uesr');
const payment_db = require('../../service/mongodb/m_payment');
const config = require('../../config');

function Project() {
    this.name = 'project';
}
/**
 * 用项目名称和客服id,客户id创建项目
 * 
 * @param {string} name 项目名称
 * @param {string} service 客服
 */
Project.prototype.postProject = (socket)=> {
    return async (data, fu)=> {
        try {  
            console.log(data);
            fu(await project_db.inset({name: data.name, serviceId: data.uid, publisherId: data.publisherId}));
        } catch (err) {
            console.log(err);
            fu({err: true, message: '创建发生错误'});
        }
    }
}

/**
 * 根据项目编号获得项目数据
 * 
 * @param {object} data.pid 项目编号 
 * @returns 
 */
Project.prototype.getProject = (socket)=> {
    return async (data, fu)=> {
        try{
            let project = await project_db.findById(data.pid, {});
            let customer = await customer_db.findById(project.publisherId, {'name': 1});
            project._doc.publisherName = customer.name;
            if ( project.image ) {
                for ( index in project.image ) {
                    if ( project.image[index].modelId ) {
                        let user = await user_db.findById(project.image[index].modelId , {'realInformation': 1});
                        console.log(user);
                        console.log(user.realInformation.name);
                        project._doc.image[index].modelName = user.realInformation.name;
                        console.log(project.image[index].modelName)
                    }
                    if ( project.image[index].renderId ) {
                        let user = await user_db.findById(project.image[index].renderId, {'realInformation': 1});
                        project._doc.image[index].renderName = user.realInformation.name;
                    }
                }
            } 
            fu(project);

        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}

/**
 * 根据客服id获得项目列表
 * 
 * @param {object} data.uid 客服id 
 * @returns 
 */
Project.prototype.getProjects = (socket)=> {
    return async (data, fu)=> {
        try{
            let whereStr = {
                serviceId: data.uid
            };
            //映射
            let map = {
                finish: 1,
                unfinished: 0
            }
            if(data.state !== 'all') {
                whereStr['image.state'] = map[data.state];
            }

            let projects = await project_db.findProjects(whereStr, data.pageSize, data.currentPage, {_id: -1});
            let count = await project_db.count(whereStr);
            count = Math.ceil(count/data.pageSize);
            fu({projects, count});
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}

/**
 * 跟新项目数据
 * 
 * @param {object} data._id 项目编号
 * @returns 
 */
Project.prototype.putProject = (socket)=> {
    return async (data, fu)=> {
        try{
            fu(await project_db.findByIdAndUpdate(data._id, data));
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}
/**
 * 删除项目
 * 
 * @returns 
 */
Project.prototype.deleteProjectById = (socket)=> {
    return async (data, fu)=> {
        try {
            let res = await project_db.findOne({'_id': data.pid},{});
            console.log(res);
            if( res.image.length > 0 ) return fu({err: true, message: '项目还有任务，无法删除'});
            if( res.referenceFile.length > 0 ) return fu({err: true, message: '项目还有参考文件，无法删除'});
            if( res.modelFile.length > 0 ) return fu({err: true, message: '项目还有项目文件，无法删除'});
            fu(await project_db.findByIdAndRemove(data.pid));
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}

/**
 * 创建image任务
 * 
 * @param {any} socket 
 */
Project.prototype.postProImage = (socket)=> {
    return async (data, fu)=> {
        try {
            await project_db.findByIdAndUpdate(data.pid, {$push: {image: data.image}});
            fu( 'success' );
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}

/**
 * 更新image任务
 * 
 * @param {any} socket 
 */
Project.prototype.putProImage = (socket)=> {
    return async (data, fu)=> {
        try {
            let res = await project_db.findOne({'_id': data.pid, 'image._id': data.image._id}, {'image.$': 1});
            let image= res.image[0];
            //报价不能低于收款
            if ( data.image.price < image.payment) return fu({err: true, message: '报价不能低于收款数'});
            //修改
            await project_db.findOneAndUpdate({ '_id': data.pid, 'image._id': data.image._id}, {$set: {'image.$': data.image}});
            fu( 'success' );
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}

/**
 * 设置image任务完成
 * 
 * @param {any} socket 
 */
Project.prototype.putProImageFinish = (socket)=> {
    return async (data, fu)=> {
        try {
            let res = await project_db.findOne({'_id': data.pid, 'image._id': data.image._id}, {'image.$': 1});
            let image= res.image[0];
            //是否安排工作人员
            if (!image.modelId) return fu({err: true, message: '无法完成，没有安排工作人员'});
            if (!image.randerId) return fu({err: true, message: '无法完成，没有安排工作人员'});
            //修改
            await project_db.findOneAndUpdate({ '_id': data.pid, 'image._id': data.image._id}, {$set: {'image.$.isFinish': 1, 'image.$.finishTime': new Date()}});
            fu( 'success' );
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}

/**
 * 删除image任务
 * 
 * @param {any} socket 
 */
Project.prototype.deleteProImage = (socket)=> {
    return async (data, fu)=> {
        try {
            let res = await project_db.findOne({'_id': data.pid, 'image._id': data.iid}, {'image.$': 1});
            let image= res.image[0];
            //付款无法删除
            if ( image.payment > 0 ) return fu({err: true, message: '已经付款，无法删除'});
            //删除
            await project_db.findOneAndUpdate({'_id': data.pid, 'image':{$elemMatch: {'payment': {$lte: 0}}}}, {$pull: {'image':{'_id': data.iid}}});
            fu('success');
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}

/**
 * 安排工作人员
 * 
 * @param {any} socket 
 */
Project.prototype.putProImgArrange = (socket)=> {
    return async (data, fu)=> {
        try {
            console.log(data);
            if ( data.workType === 'model') {
                await project_db.findOneAndUpdate({'_id': data.pid, 'image._id': data.iid}, {$set: {'image.$.modelId': data.uid}, $inc: {'image.$.arrangeWork': 1}});
            }

            if ( data.workType === 'render') {
                await project_db.findOneAndUpdate({'_id': data.pid, 'image._id': data.iid}, {$set: {'image.$.randerId': data.uid}, $inc: {'image.$.arrangeWork': 1}});
            }
            
            fu('success');
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}


/**
 * 付款接口
 * 
 * @param {any} socket data.pid：项目id，data.image：项目任务，data.money：收款金额，data.voucher：收款凭证记录
 * @returns 
 */
Project.prototype.pay = (socket)=> {
    return async (data, fu)=> {
        try {
            let project = await project_db.find({'_id': data.pid, 'image._id': data.image._id}, {"image.$":1});
            let image = project[0].image[0];

            let payment = image.payment + parseInt(data.money, 10);

            //查看是否结算
            if(image.isSettlement) return fu({err: true, message: '已经结算,无法继续付款'});

            //payment已收款不能大于price价格
            if( image.price < payment ) return fu({err: true, message: '付款金额超过总额,请核对金额'});

            //拷贝文件,删除原来的临时文件 
            await config.oss.client.copy(data.voucher.object.substr(14), data.voucher.object);
            await config.oss.client.delete(data.voucher.object);

            data.voucher.object = data.voucher.object.substr(14);

            //插入收款记录
            await payment_db.inset({ list: [{pid: data.pid, iid: data.image._id,}], money: data.money, voucher: data.voucher});

            if ( image.price === payment ) {
                
                //结算
                await project_db.findOneAndUpdate({'_id': data.pid, 'image._id': image._id}, {$set: {'image.$.payment': payment, 'image.$.isSettlement': 1, 'image.$.settlementTime': new Date()}});
            } else {
                
                //修改收款数
                await project_db.findOneAndUpdate({ '_id': data.pid, 'image._id': image._id}, {$set: {'image.$.payment': payment}});
            }

          
            fu('success');
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}

module.exports = new Project();