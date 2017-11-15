const project = require('../controllers/project');

module.exports = (socket)=> {
    
        //创建项目
        socket.on('postProject', async (project, fu)=>{
            try {   
                console.log(project);
                let pid  =  await project.postProject(project.name, project.uid);
                fu(pid);
            } catch (err) {
                console.log(err);
                fu({err: true, message: '发生错误'});

            }
        });
    
        //获得oss写权限的sts临时token
        socket.on('postProjecta', async (uid, fu)=>{
            try {

            } catch (err) {
                console.log(err);
                fu({err: true, message: '发生错误'});
            }
        });
        
    }