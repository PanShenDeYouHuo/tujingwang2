const config = require('../../config')


function StsToken() {
    this.name = 'sts';
    this.sts = config.oss.sts;
};


 /////////////////////////////////////**********写权限********///////////////////////////////////////////

/**
 * 获得oss productionProject读权限的sts临时token
 * 
 * @param {string} uid 账号id
 * @returns {object} stsToken
 */
StsToken.prototype.getReadStsToken = function(socket) {
    return async (pid, fu)=> {
        try{
            let policy = {
                "Statement": [
                    {
                        "Action": [
                            "oss:Get*",
                            "oss:List*"
                        ],
                        "Effect": "Allow",
                        "Resource": [
                            "acs:oss:*:*:tujingcloud/productionProject",
                            "acs:oss:*:*:tujingcloud/productionProject/*"
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
            fu({err: true, message: '发生错误'});
        }
    }
 }

/**
 * 获取读的权限
 * 
 * @param {any} socket 
 * @returns 
 */
StsToken.prototype.getReadAccountStsToken = function(socket) {
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
                            `acs:oss:*:*:tujingcloud/account/${socket.account._id}`,
                            `acs:oss:*:*:tujingcloud/account/${socket.account._id}/*`
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
            fu({err: true, message: '发生错误'});
         }
     }
 }


 /**
 * boss获取读的权限
 * 
 * @param {any} socket 
 * @returns 
 */
StsToken.prototype.getReadAccountStsTokenBoss = function(socket) {
    return async (uid, fu)=> {
        try {
            console.log(uid);
           let policy = {
               "Statement": [
                   {
                       "Action": [
                            "oss:GetObject",
                            "oss:ListParts",
                            "oss:Get*",
                            "oss:List*"
                       ],
                       "Effect": "Allow",
                       "Resource": [
                           `acs:oss:*:*:tujingcloud/account/${uid}`,
                           `acs:oss:*:*:tujingcloud/account/${uid}/*`
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
           fu({err: true, message: '发生错误'});
        }
    }
}



 /////////////////////////////////////**********写权限********///////////////////////////////////////////

 /**
 * 获得oss productionProject写权限的sts临时token
 * 
 * @param {string} uid 账号id
 * @returns {object} stsToken
 */
StsToken.prototype.getWriteStsToken = function(socket) {
    return async (pid, fu)=> {
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
                            "acs:oss:*:*:tujingcloud/productionProject",
                            "acs:oss:*:*:tujingcloud/productionProject/*"
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


/**
 * 获得oss account写权限的sts临时token
 * 
 * @param {string} uid 账号id
 * @returns {object} stsToken
 */
StsToken.prototype.getWriteAccountStsToken = function(socket) {
    return async (uid, fu)=> {
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
                            `acs:oss:*:*:tujingcloud/temporaryFile/account/${socket.account._id}`,
                            `acs:oss:*:*:tujingcloud/temporaryFile/account/${socket.account._id}/*`
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



module.exports = new StsToken();