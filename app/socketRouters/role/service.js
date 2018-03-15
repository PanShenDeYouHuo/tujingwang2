const project = require('../../controllers/project');

module.exports = (socket)=> {
    
    //创建项目
    socket.on('postProject', project.postProject());

    //根据pid获取项目
    socket.on('getProject', project.getProject());

    //根据uid获取项目列表
    socket.on('getProjects', project.getProjects());
    
    //跟新项目
    socket.on('putProject', project.putProject());

    //移除项目
    socket.on('deleteProjectById', project.deleteProjectById());
    
}