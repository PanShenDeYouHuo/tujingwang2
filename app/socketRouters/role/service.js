const project = require('../../controllers/project');

module.exports = (socket)=> {
    
    //创建项目
    socket.on('postProject', project.postProject(socket));

    //根据pid获取项目
    socket.on('getProject', project.getProject(socket));

    //根据uid获取项目列表
    socket.on('getProjects', project.getProjects(socket));
    
    //跟新项目
    socket.on('putProject', project.putProject(socket));

    //移除项目
    socket.on('deleteProjectById', project.deleteProjectById(socket));

    //创建image任务
    socket.on('postProImage', project.postProImage(socket));

    //更新image任务
    socket.on('putProImage', project.putProImage(socket));
    
    //删除image任务
    socket.on('deleteProImage', project.deleteProImage(socket));
}