const user_db = require('../../service/mongodb/m_uesr');

function User() {
    this.name = 'user';
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
User.prototype.putContactInformation = ()=> {
    return async (data, fu)=> {
        try{
            console.log(data);
            fu(await user_db.findByIdAndUpdate(data._id, {$set: {'contactInformation.QQ': data.QQ, 'contactInformation.wechat': data.wechat}}));
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}

module.exports = new User();