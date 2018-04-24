const project = require('../../controllers/project');
const projectFile = require('../../controllers/project/file');
const user = require('../../controllers/user');

module.exports = (socket)=> {
    
    //创建项目
    socket.on('postProject', project.postProject(socket));

    // //根据pid获取项目
    // socket.on('getProject', project.getProject(socket));

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

    //设置image任务为完成状态
    socket.on('putProImageFinish', project.putProImageFinish(socket));
    
    //删除image任务
    socket.on('deleteProImage', project.deleteProImage(socket));

    //删除refFile
    socket.on('deleteRefFile', projectFile.deleteRefFile(socket));
    
    //安排工作人员
    socket.on('putProImgArrange', project.putProImgArrange(socket));

    //获取渲染师
    socket.on('getRender', user.getRender(socket));
    

    //付款接口
    socket.on('projectPay', project.pay(socket));

}