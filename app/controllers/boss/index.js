const user_db = require('../../service/mongodb/m_uesr');

function Boss() {
    this.name = 'boss';
};

/**
 * 获取staff账号
 * 
 * @returns 
 */
Boss.prototype.getBossAccounts = ()=> {
    return async (data, fu)=> {
        try {
            if(data.authority === 'all') {
                let where = {
                    authority: {$ne:{$all:['boss', 'admin']}},
                };
            } else {
                let where = {
                    authority: data.authority,
                }
            }
            console.log(where);
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