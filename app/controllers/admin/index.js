const user_db = require('../../service/mongodb/m_uesr');

function Admin() {
    this.name = 'admin';
};

// /**
//  * 创建boss账号
//  * 
//  */
// Admin.prototype.postBossAccount = ()=> {
//     return async (data, fu)=> {
//         try{
//             let accountInfo = {
//                 phone: data.phone,
//                 name: data.name,
//                 password: '123456',
//                 authority: ['boss'],
//             };
//             await user_db.inset(accountInfo);
//             fu();
//         } catch (err) {
//             console.log(err);
//             fu({err: true, message: '注册错误'});
//         }
//     }
// }

/**
 * 获取boss级账号列表
 * 
 * @returns 
 */
Admin.prototype.getBossAccounts = ()=> {
    return async (data, fu)=> {
        try {
            let where = {'authority': 'boss'};
            let users = await user_db.findUsers(where, data.pageSize, data.currentPage, {_id: -1});
            let count = await user_db.count(where);
            count = Math.ceil(count/data.pageSize);
            fu({users, count});
        } catch (error) {
            console.log(error);
            fu({err:true, message: '发生错误'});
        }
    }
}

/**
 * 获取boss级账号
 * 
 * @returns 
 */
Admin.prototype.getBossAccount = ()=> {
    return async (data, fu)=> {
        try {
            fu(await user_db.findById(data._id, {}));
        } catch (error) {
            console.log(error);
            fu({err:true, message: '发生错误'});
        }
    }
}

/**
 * 跟新账号
 * 
 * @returns 
 */
Admin.prototype.putBossAccount = ()=> {
    return async (data, fu)=> {
        try{
            fu(await user_db.findByIdAndUpdate(data._id, data));
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}
/**
 * 删除账号
 * 
 * @returns 
 */
Admin.prototype.deleteBossAccount = ()=> {
    return async (data, fu)=> {
        try{
            await user_db.remove({_id: data._id})
            fu();
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}

module.exports = new Admin();