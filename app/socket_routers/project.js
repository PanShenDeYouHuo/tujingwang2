const project = require('../controllers/project');

module.exports = (socket)=> {
    
        //创建项目
        socket.on('postProject', project.postProject());
    
        //根据pid获取项目
        socket.on('getProject', project.getProject());
        
    }