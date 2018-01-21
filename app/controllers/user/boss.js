const user_db = require('../../service/mongodb/m_uesr');

function Boss() {
    this.name = 'boss';
};

/**
 * //获取账号列表，设置权限
 * 
 * @returns 
 */
Boss.prototype.getStaffAccounts = function(socket) {
    return async (data, fu)=> {
        try {
            let where = {
                'company.bossId': socket.account._id,
            };
            if(data.authority === 'all') {
                where.authority = {$nin:['boss', 'admin']};
            } else {
                where.authority = {$elemMatch: data.authority};
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

/**
 * 获取需要账号认证的账号列表
 * 
 * @param {any} socket 
 * @returns 
 */
Boss.prototype.getAuthenticateAccounts = function(socket) {
    return async (data, fu)=> {
        try {
            let where = {
                'company.bossId': socket.account._id,
                'realInformation.state': data.state,
            };
            // if(data.state === 'all') {
            //     where['realInformation.state'] = {$nin:[1, 2]};
            // } else {
                // where['realInformation.state'] = data.state;
            // };
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
/**
 * 跟新账号认证的状态,通过或者否决
 * 
 * @param {any} socket 
 * @returns 
 */
Boss.prototype.putAuthenticate = function(socket) {
    return async (data, fu)=> {
        try {
            //检查是否是boss本人
            let result = await user_db.findById(data._id, {'company': 1});
            if (socket.account._id.toString() !== result.company.bossId) return fu({err:true, message:'请不要试图破坏系统'});
            //检查设置账号状态是否有问题
            if (!(data.state === 0 || data.state === 2)) return fu({err:true, message:'请不要试图破坏系统'});
            fu(await user_db.findByIdAndUpdate(data._id, {$set: {'realInformation.state': data.state}}));
        } catch (err) {
            console.log(err);
            fu({err:true, message:'发生错误'});
        }
    }
}
/**
 * 修改员工权限
 * 
 * @param {any} socket 
 * @returns 
 */
Boss.prototype.putAuthority = function(socket) {
    return async (data, fu)=> {
        try {
            //检查是否是boss本人
            let result = await user_db.findById(data._id, {'company': 1});
            if (socket.account._id.toString() !== result.company.bossId) return fu({err:true, message:'请不要试图破坏系统'});
            if (data.authority.indexOf('boss') === 1 || data.authority.indexOf('admin') === 1) return fu({err:true, message:'请不要试图破坏系统'});
            fu( await user_db.findByIdAndUpdate(data._id, {$set: {'authority': data.authority}}));
        } catch (err) {
            console.log(err);
            fu({err:true, message:'发生错误'});
        }
    }
}

// Boss.prototype.getReadAccountStsToken = function(socket) {
//     return async (data, fu)=> {
//         try {
            
//         } catch (err) {
//             console.log(err);
//             fu({err:true, message: '发生错误'});
//         }
//     }
// }

module.exports = new Boss();