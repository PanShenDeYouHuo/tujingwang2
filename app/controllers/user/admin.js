const user_db = require('../../service/mongodb/m_uesr');

function Admin() {
    this.name = 'admin';
};


/**
 * boss账号个数统计 总数 禁用数
 * 
 * @returns total 总数, disable 禁用数
 */
Admin.prototype.getBossAccountStatistics = ()=> {
    return async (data, fu)=> {
        try {
            let where = {
                authority: 'boss'
            }
            let total = await user_db.count(where);
            where.isDisable = 1;
            let disable = await user_db.count(where);
            fu({total, disable})
        } catch (err) {
            console.log(err);
            fu({err:true, message: '发生错误'});
        }
    }
}

/**
 * 获取boss级账号列表
 * 
 * data.state 2查询禁用列表
 * data.state 小于2 查询未禁用列表
 * 
 * @returns 
 */
Admin.prototype.getBossAccounts = ()=> {
    return async (data, fu)=> {
        try {
            let where = {
                authority: 'boss',
                isDisable: 0
            };
            if(data.isDisable === 1) {
                where.isDisable = 1;
            }
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
 * 设置boss账号是否禁用接口
 * 
 * @returns 
 */
Admin.prototype.putBossAccount = ()=> {
    return async (data, fu)=> {
        try{
            fu(await user_db.findByIdAndUpdate(data._id, {$set: {isDisable: data.isDisable}}));
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