const config = require('../../config')
const project_db = require('../../service/mongodb/m_project');
const parsePost  = require('../../modules/parsePostData');

function ProjectFile() {
    this.name = 'projectFile';
    this.client = config.oss.client;
    this.companyName = config.companyName;
}
/**
 * 添加参考项目文件
 * 
 * @returns 
 */
ProjectFile.prototype.refFileUpload = function(){
    return async(ctx, next)=> {
        try {
            let postData = await parsePost(ctx);
            console.log(postData);
         
            postData.name = postData.object.substr(postData.object.lastIndexOf('/') + 1);
            postData.newObject = postData.object.substr(14);
            console.log(postData.newObject);
            console.log(postData.name);
            
            //拷贝文件,删除原来的临时文件
            await this.client.copy(postData.newObject, postData.object);
            await this.client.delete(postData.object);
            //保存到数据库
            let referenceFile = {
                name: postData.name,
                object: postData.newObject,
                size: postData.size,
                bucket: postData.bucket
            }
            let res = await project_db.findByIdAndUpdate(postData.pid, {$push: {referenceFile}});
            console.log(res);
            //成功返回
            ctx.body = referenceFile;
            
        } catch (err) {
            console.log(err);
            ctx.body = ({err: true, message: '发生错误'});
        }
    }
}

ProjectFile.prototype.deleteRefFile = function(socket) {
    return async (data, fu)=> {
        try{
            console.log(`${this.companyName}/project/${data.pid}/reference/${data.name}`);
            await this.client.delete(`${this.companyName}/project/${data.pid}/reference/${data.name}`);
            await project_db.findByIdAndUpdate( data.pid, {$pull: {'referenceFile': {'name':data.name}}});
            fu( 'success' );

        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}

module.exports = new ProjectFile();