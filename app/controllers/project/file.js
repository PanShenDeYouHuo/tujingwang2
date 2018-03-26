const project_db = require('../../service/mongodb/m_project');
const parsePost  = require('../../modules/parsePostData');

function ProjectFile() {
    this.name = 'projectFile';
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
            //拷贝文件
            console.log(postData.bucket);
            console.log(postData.object);
            console.log(postData.size);
            //保存到数据库
            //成功返回
            ctx.body = 'Success';
            
        } catch (err) {
            console.log(err);
            ctx.body = ({err: true, message: '发生错误'});
        }
    }
}

module.exports = new ProjectFile();