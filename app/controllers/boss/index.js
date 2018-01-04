const user_db = require('../../service/mongodb/m_uesr');

function Boss() {
    this.name = 'boss';
};

/**
 * 获取staff账号
 * 
 * @returns 
 */
Boss.prototype.getStaffAccounts = ()=> {
    return async (data, fu)=> {
        try {
            console.log(data);
            let where = {};
            if(data.authority === 'all') {
                where.authority = {$all:{$ne:['boss', 'admin']}};
            } else {
                where.authority = data.authority;
            }
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

module.exports = new Boss();