const admin = require('../../controllers/user/admin');
const project = require('../../controllers/project');

module.exports = (socket)=> {
    
    // //boss账号注册
    // socket.on('postBossAccount', admin.postBossAccount());

    //获取任务列表
    socket.on('getRenderProjects', project.getRenderProjects(socket));

}