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
 * @param {object} data.pid 项目编号 
 * 
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

module.exports = new Project();