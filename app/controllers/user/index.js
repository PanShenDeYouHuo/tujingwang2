const user_db = require('../../service/mongodb/m_uesr');
const OSS = require('ali-oss').Wrapper;                 //Promise函数


function User() {
    this.name = 'user';
    this.client = new OSS({
        region: 'oss-cn-beijing',
        accessKeyId: 'LTAIesg8W64WwrGI',
        accessKeySecret: '3iz2f7iwwGPMoicQE9kQJRPACPOPwK',
        bucket: 'tujingcloud',
    });
}
/**
 * 用项目名称和客服创建项目
 * 
 * @param {string} name 项目名称
 * @param {string} service 客服
 */
// User.prototype.postProject = ()=> {
//     return async (data, fu)=> {
//         try {  
//             fu(await project_db.inset({name: data.name, service: data.uid}));
//         } catch (err) {
//             console.log(err);
//             fu({err: true, message: '创建发生错误'});
//         }
//     }
// }

/**
 * 根据项目编号获得项目数据
 * 
 * @param {object} data.pid 项目编号 
 * @returns 
 */
// User.prototype.getProject = ()=> {
//     return async (data, fu)=> {
//         try{
//             fu(await project_db.findById(data.pid, {}));
//         } catch (err) {
//             console.log(err);
//             fu({err: true, message: '发生错误'});
//         }
//     }
// }

/**
 * 根据发布人获得项目列表
 * 
 * @param {object} data.uid 客服id 
 * @returns 
 */
// User.prototype.getProjects = ()=> {
//     return async (data, fu)=> {
//         try{
//             let projects = await project_db.findProjects({service: data.uid}, data.pageSize, data.currentPage, {_id: -1});
//             let count = await project_db.count({service: data.uid});
//             count = Math.ceil(count/data.pageSize);
//             fu({projects, count});
//         } catch (err) {
//             console.log(err);
//             fu({err: true, message: '发生错误'});
//         }
//     }
// }

/**
 * 跟新联系方式
 * 
 * @param {object} data._id 项目编号
 * @returns 
 */
User.prototype.putContactInformation = (socket)=> {
    return async (data, fu)=> {
        try{
             fu(await user_db.findByIdAndUpdate(socket.account._id, {$set: {'contactInformation.QQ': data.QQ, 'contactInformation.wechat': data.wechat}}));
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}
/**
 * 实名认证
 * 
 * @returns 
 */
User.prototype.putRealInformation = function(socket) {
    return async (data, fu)=> {
        try{
            //获取认证的临时文件
            let list = await this.client.list({
                prefix: `temporaryFile/account/${socket.account._id}/authenticate/`,
                delimiter: '/'
            });

   
            //拷贝文件
            for (let i = 0; i < list.objects.length; i++ ) {
                await this.client.copy(list.objects[i].name.substr(14), list.objects[i].name);
                await this.client.delete(list.objects[i].name);
            }


            //保存到数据库
            let res = await user_db.findByIdAndUpdate(socket.account._id, {$set: 
                {
                    'realInformation.state': 1,                                                 //0未认证, 1审核中, 2认证成功
                    'realInformation.name': data.name,                                          //姓名
                    'realInformation.IDNumber': data.IDNumber,                                  //身份证号码
                    'realInformation.IDCardFrontObjectKey': list.objects[0].name.substr(14),    //身份证正面
                    'realInformation.IDCardReverseObjectKey': list.objects[1].name.substr(14),  //身份证反面
                    'realInformation.bankCardAccount': data.bankCardAccount,                    //银行卡账号
                    'realInformation.openingBank': data.openingBank,                            //开户行
                    'realInformation.bankCardFrontObjectKey': list.objects[2].name.substr(14),  //银行卡正面 
                }
            });

            let notify = {
                state: 0,
                ntype: 1,
                concent: `${data.name}进行账号认证，请尽快去审核`,
                router: '/boss/authenticate'
            }
            //sokcet.io推送信息
            const sio = require('../../sio');
            //检查是否有公司
            if(!socket.account.company) {
                let admin = await user_db.findOne({'authority': 'admin'}, {'_id': 1,'socketId': 1});
                //将通知保存到数据库
                let result = await user_db.findByIdAndUpdate(admin._id, {$push: notify});

                sio.to(admin.socketId).emit('notify');

                return fu(result);
            }
            if(!socket.account.company.bossId) {
                let admin = await user_db.findOne({'authority': 'admin'}, {'_id': 1,'socketId': 1});
                //将通知保存到数据库
                let result = await user_db.findByIdAndUpdate(admin._id, {$push: {notify}});
                sio.to(admin.socketId).emit('notify');
                // console.log(sio);
                // sio.to(admin.socketId).volatile.emit('notify');
                
                return fu(result);
            }
            //将通知保存到数据库
            let result = await user_db.findByIdAndUpdate(socket.account.company.bossId, {$push: {notify}});
            let boss = await user_db.findById(socket.account.company.bossId, {'_id': 1,'socketId': 1})
            sio.to(boss.socketId).emit('notify');

            return fu(result);

        }catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}

// User.prototype.setNotify = function(uid, notify) {
//     try {
//         let user = await user_db.findById(uid, {'_id': 1,'socketId': 1});
//         //将通知保存到数据库
//         let result = await user_db.findByIdAndUpdate(uid, {$push: {notify}});
//     } catch (err) {
        
//     }
// }

/**
 * 获得通知信息
 * 
 * @param {any} account 
 * @returns 
 */
User.prototype.getNotify = function(socket) {
    return async (data, fu)=> {
        try{
            let result = {};
            if( data.notifyType === 0 ) {
                result = await user_db.findById(socket.account.id, {'notify': 1});
                let count = data.currentPage*8 > result.notify.length ? result.notify.length % 8 : 8;
                result = await user_db.findById(socket.account._id, {'notify': {$slice: [0 - (data.currentPage*8), count]}});
            } else {
                result = await user_db.findById(socket.account.id, {'notify': 1});
                let count = data.currentPage*8 > result.notify.length ? result.notify.length % 8 : 8;
                result = await user_db.findOne({'_id': socket.account._id, 'notify.ntype': data.notifyType}, {'notify': {$slice: [0 - (data.currentPage*8), count]}});
            }
            if( !result ) return fu([]);
            fu( result.notify );
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    } 
}

/**
 * 修改通知信息,设置信息为已读
 * 
 * @param {any} account 
 * @returns 
 */
User.prototype.putNotify = function(socket) {
    return async (data, fu)=> { 
        try{
            await user_db.findOneAndUpdate({ '_id': socket.account._id, 'notify._id': data._id}, {$set: {'notify.$.state': 1}});
            fu( 'success' );

        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    } 
}


/**
 * 删除已经读取通知
 * 
 * @param {any} account 
 * @returns 
 */
User.prototype.deleteNotify = function(socket) {
    return async (data, fu)=> { 
        try{
            await project_db.findOneAndUpdate({ '_id': socket.account._id, 'notify._id': data._id}, {$pull: {'notify':{'_id': data.iid}}});
            fu( 'success' );

        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    } 
}

/**
 * 获取渲染师
 * 
 * @param {any} account 
 * @returns 
 */
User.prototype.getRender = function(socket) {
    return async (data, fu)=> {
        try {
            let where = {
                'company.bossId': socket.account.company.bossId,
                'realInformation.state': 2,
                'realInformation.name': {'$regex': data.search},
                'authority': {'$all': [data.authority]}
            };
            let users = await user_db.findUsers(where, data.pageSize, data.currentPage, {_id: -1});
            let count = await user_db.count(where);
            count = Math.ceil(count/data.pageSize);
            fu({users, count});
        } catch (err) {
            console.log(err);
            fu({err:true, message: '发生错误'});
        }
    }
}




module.exports = new User();