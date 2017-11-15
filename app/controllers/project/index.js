const user_db = require('../../service/mongodb/m_project');

function Project() {
    this.name = 'project';
}
/**
 * 用项目名称和发布人创建项目
 * 
 * @param {string} name 项目名称
 * @param {string} publisher发布人 
 */
Project.prototype.postProject = async function(name, publisher) {
    
    return await user_db.inset({name, publisher});

}

module.exports = new Project();