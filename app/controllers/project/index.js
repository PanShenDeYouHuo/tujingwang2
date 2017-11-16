const project_db = require('../../service/mongodb/m_project');

function Project() {
    this.name = 'project';
}
/**
 * 用项目名称和发布人创建项目
 * 
 * @param {string} name 项目名称
 * @param {string} publisher发布人 
 */
Project.prototype.postProject = ()=> {
    return async (data, fu)=> {
        try {  
            fu(await project_db.inset({name: data.name, publisher: data.uid}));
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
Project.prototype.getProject = ()=> {
    return async (data, fu)=> {
        try{
            fu(await project_db.findById(data.pid, {}));
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}

/**
 * 根据发布人获得项目列表
 * 
 * @param {object} data.uid 项目编号 
 * @returns 
 */
Project.prototype.getProjects = ()=> {
    return async (data, fu)=> {
        try{

            let projects = await project_db.findProjects({publisher:data.uid}, data.pageSize, data.currentPage, {_id: 1});
            let count = await project_db.count({publisher:data.uid});
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
 * @param {object} data 项目数据
 * @returns 
 */
Project.prototype.putProject = ()=> {
    return async (data, fu)=> {
        try{
            fu(await project_db.findByIdAndUpdate(data.id, data));
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}

module.exports = new Project();