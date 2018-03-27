const config = require('../../config');

function ProjectSts() {
    this.name = 'ProjectSts';
    this.sts = config.oss.sts;
    this.companyName = config.companyName;
};


/////////////////////////////////////**********读权限********///////////////////////////////////////////
/**
 * 获得oss account读权限的sts临时token
 * 
 * @param {any} socket 
 * @returns 
 */
ProjectSts.prototype.getReadProjectStsToken = function(socket) {
    return async (data, fu)=> {
        try {
           let policy = {
               "Statement": [
                   {
                       "Action": [
                           "oss:Get*",
                           "oss:List*"
                       ],
                       "Effect": "Allow",
                       "Resource": [
                           `acs:oss:*:*:${this.companyName}/project/${data.pid}`,
                           `acs:oss:*:*:${this.companyName}/project/${data.pid}/*`
                       ]
                   }
               ],
               "Version": "1"
           };

           let arn = 'acs:ram::1647720766129117:role/tujingcloud-readonly';
           let sessionName = socket.account._id.toString();
           
           //获取token
           let token = await this.sts.assumeRole( arn, policy, 60 * 60, sessionName);
           fu(token);
        } catch (err) {
           console.log(err);
           fu({err: true, message: '获取project权限发生错误'});
        }
    }
}


 /////////////////////////////////////**********写权限********///////////////////////////////////////////
/**
 * 获得oss account写权限的sts临时token,写在临时文件temporaryFile内
 * 
 * @param {string} pid 项目id
 * @returns {object} stsToken
 */
ProjectSts.prototype.getWriteProjectStsToken = function(socket) {
    return async (data, fu)=> {
        try{
            let policy = {
                "Statement": [
                    {
                        "Action": [
                            "oss:DeleteObject",
                            "oss:ListParts",
                            "oss:AbortMultipartUpload",
                            "oss:PutObject"
                        ],
                        "Effect": "Allow",
                        "Resource": [
                            `acs:oss:*:*:${this.companyName}/temporaryFile/project/${data.pid}`,
                            `acs:oss:*:*:${this.companyName}/temporaryFile/project/${data.pid}/*`
                        ]
                    }
                ],
                "Version": "1"
            };
            let arn = 'acs:ram::1647720766129117:role/tujingcloud-write';
            let sessionName = socket.account._id.toString();

            //获取token
            let token = await this.sts.assumeRole( arn, policy, 60 * 60, sessionName);

            fu(token);
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
     
}


/////////////////////////////////////**********读写权限********///////////////////////////////////////////
 /**
 * 获得oss account读写权限的sts临时token,没有删除权限
 * 
 * @param {string} pid 项目id
 * @returns {object} stsToken
 */
ProjectSts.prototype.getWriteAndReadProjectStsToken = function(socket) {
    return async (data, fu)=> {
        try{
            let policy = {
                "Statement": [
                    {
                        "Action": [
                            "oss:DeleteObject",
                            "oss:ListParts",
                            "oss:AbortMultipartUpload",
                            "oss:PutObject",
                            "oss:Get*",
                            "oss:List*"
                        ],
                        "Effect": "Allow",
                        "Resource": [
                            `acs:oss:*:*:${this.companyName}/project/${data.pid}`,
                            `acs:oss:*:*:${this.companyName}/project/${data.pid}/*`,
                            `acs:oss:*:*:${this.companyName}/temporaryFile/project/${data.pid}`,
                            `acs:oss:*:*:${this.companyName}/temporaryFile/project/${data.pid}/*`
                        ]
                    }
                ],
                "Version": "1"
            };

            let arn = 'acs:ram::1647720766129117:role/tujingcloud-readandwrite';
            let sessionName = socket.account._id.toString();
            
            //获取token
            let token = await this.sts.assumeRole( arn, policy, 60 * 60, sessionName);

            fu(token);
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
     
}



module.exports = new ProjectSts();