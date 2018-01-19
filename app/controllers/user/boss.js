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
                where.authority = data.authority;
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