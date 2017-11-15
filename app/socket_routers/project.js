const project = require('../controllers/project');

module.exports = (socket)=> {
    
        //创建项目
        socket.on('postProject', async (project, fu)=>{
            try {   
                let pid  =  await project.postProject(project.name, project.uid);
                fu(pid);
            } catch (err) {
                console.log(err);
                fu(false);
                socket.volatile.emit('appError','发生错误');
                // socket.emit('appError','发生错误');
                // socket.volatile.emit('bieber tweet', tweet);
            }
        });
    
        //获得oss写权限的sts临时token
        socket.on('postProjecta', async (uid, fu)=>{
            try {

            } catch (err) {
                console.log(err);
                socket.volatile.emit('appError','发生错误');
            }
        });
        
    }