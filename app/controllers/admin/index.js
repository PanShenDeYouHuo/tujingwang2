const user_db = require('../../service/mongodb/m_uesr');

function Admin() {
    this.name = 'admin';
};

/**
 * 创建boss账号
 * 
 */
Admin.prototype.postBossAccount = ()=> {
    return async (data, fu)=> {
        try{
            let accountInfo = {
                phone: data.phone,
                name: data.name,
                password: '123456',
                authority: ['boss'],
            };
            await user_db.inset(accountInfo);
            fu();
        } catch (err) {
            console.log(err);
            fu({err: true, message: '注册错误'});
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