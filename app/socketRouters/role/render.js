const admin = require('../../controllers/user/admin');
const project = require('../../controllers/project');
const projectFile = require('../../controllers/project/file');

module.exports = (socket)=> {
    
    // //boss账号注册
    // socket.on('postBossAccount', admin.postBossAccount());

    //根据渲染师获取任务列表
    socket.on('getRenderProjects', project.getRenderProjects(socket));

    //删除refFile
    socket.on('deleteModFile', projectFile.deleteModFile(socket));

}