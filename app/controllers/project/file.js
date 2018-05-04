const config = require('../../config');
const project_db = require('../../service/mongodb/m_project');
const parsePost  = require('../../modules/parsePostData');

function ProjectFile() {
    this.name = 'projectFile';
    this.client = config.oss.client;
    this.companyName = config.companyName;
}
/**
 * 添加参考文件
 * 
 * @returns 
 */
ProjectFile.prototype.refFileUpload = function(){
    return async(ctx, next)=> {
        try {
            let postData = await parsePost(ctx);
         
            postData.name = postData.object.substr(postData.object.lastIndexOf('/') + 1);
            postData.newObject = postData.object.substr(14);
            
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

/**
 * 删除项目参考文件
 * 
 * @param {any} socket 
 * @returns 
 */
ProjectFile.prototype.deleteRefFile = function(socket) {
    return async (data, fu)=> {
        try{
            await this.client.delete(`project/${data.pid}/reference/${data.name}`);
            await project_db.findByIdAndUpdate( data.pid, {$pull: {'referenceFile': {'name':data.name}}});
            fu( 'success' );

        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}

/**
 * 添加项目文件
 * 
 * @returns 
 */
ProjectFile.prototype.proFileUpload = function(){
    return async(ctx, next)=> {
        try {
            let postData = await parsePost(ctx);
         
            postData.name = postData.object.substr(postData.object.lastIndexOf('/') + 1);
            postData.newObject = postData.object.substr(14);
            
            //拷贝文件,删除原来的临时文件
            await this.client.copy(postData.newObject, postData.object);
            await this.client.delete(postData.object);

            //保存到数据库
            let modelFile = {
                name: postData.name,
                object: postData.newObject,
                size: postData.size,
                bucket: postData.bucket
            }
            let res = await project_db.findByIdAndUpdate(postData.pid, {$push: {modelFile}});
            //成功返回
            ctx.body = modelFile;
            
        } catch (err) {
            console.log(err);
            ctx.body = ({err: true, message: '发生错误'});
        }
    }
}

/**
 * 删除项目文件
 * 
 * @param {any} socket 
 * @returns 
 */
ProjectFile.prototype.deleteModFile = function(socket) {
    return async (data, fu)=> {
        try{
            await this.client.delete(`project/${data.pid}/model/${data.name}`);
            await project_db.findByIdAndUpdate( data.pid, {$pull: {'modelFile': {'name':data.name}}});
            fu( 'success' );

        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}

/**
 * 添加模型文件
 * 
 * @returns 
 */
ProjectFile.prototype.putProImgMod = function(socket){
    return async(data, fu)=> {
        try {
            

            // //保存到数据库
            // let modelFile = {
            //     name: postData.name,
            //     object: postData.newObject,
            //     size: postData.size,
            //     bucket: postData.bucket
            // }
            // let res = await project_db.findByIdAndUpdate(postData.pid, {$push: {modelFile}});
            // //成功返回
            // ctx.body = modelFile;
            console.log(data);

            await project_db.findOneAndUpdate({'_id': data.pid, 'image._id': data.iid,}, 
                {   $set: 
                    {
                        'image.$.model.name': data.model.name, 
                        'image.$.model.object': data.model.object,
                        'image.$.model.size': data.model.size,
                        'image.$.model.bucket': data.model.bucket
                    }
                });
            fu( 'success' );
            
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}


/**
 * 添加图片文件
 * 
 * @returns 
 */
ProjectFile.prototype.picFileUpload = function(){
    return async(ctx, next)=> {
        try {
            let postData = await parsePost(ctx);
         
            postData.name = postData.object.substr(postData.object.lastIndexOf('/') + 1);
            postData.newObject = postData.object.substr(14);
            
            //拷贝文件,删除原来的临时文件
            await this.client.copy(postData.newObject, postData.object);
            await this.client.delete(postData.object);

            //保存到数据库
            let picFile = {
                name: postData.name,
                object: postData.newObject,
                size: postData.size,
                bucket: postData.bucket
            }

            let pro = await project_db.findOne({'_id': postData.pid, 'image._id': postData.iid}, {'image.$': 1});
            let image= pro.image[0];

            //删除之前上传的
            if ( image.picture ) {
                if( image.picture.object) {
                    await this.client.delete(image.picture.object);
                }
            }
            // console.log(postData);
            let res = await project_db.findOneAndUpdate({'_id': postData.pid, 'image._id': postData.iid,}, 
                                                        {   $set: 
                                                            {
                                                                'image.$.picture.name': picFile.name, 
                                                                'image.$.picture.object': picFile.object,
                                                                'image.$.picture.size': picFile.size,
                                                                'image.$.picture.bucket': picFile.bucket
                                                            }
                                                        });
            //成功返回
            ctx.body = picFile;
            
        } catch (err) {
            console.log(err);
            ctx.body = ({err: true, message: '发生错误'});
        }
    }
}

module.exports = new ProjectFile();