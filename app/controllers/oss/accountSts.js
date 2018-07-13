const config = require('../../config')


function AccountSts() {
    this.name = 'accountSts';
    this.sts = config.oss.sts;
    this.companyName = config.companyName;
    this.oss = config.oss;
};


/////////////////////////////////////**********读权限********///////////////////////////////////////////
/**
 * 获得oss account读权限的sts临时token
 * 
 * @param {any} socket 
 * @returns 
 */
AccountSts.prototype.getReadAccountStsToken = function(socket) {
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
                           `acs:oss:*:*:${this.companyName}/account/${socket.account._id}`,
                           `acs:oss:*:*:${this.companyName}/account/${socket.account._id}/*`
                       ]
                   }
               ],
               "Version": "1"
           };
       
           let arn = this.oss.tujingcloudRead;
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
* 获得oss account读权限的sts临时token
* boss
* 
* @param {any} socket 
* @returns 
*/
AccountSts.prototype.getReadAccountStsTokenBoss = function(socket) {
   return async (uid, fu)=> {
       try {
           console.log(uid);
          let policy = {
              "Statement": [
                  {
                      "Action": [
                           "oss:Get*",
                           "oss:List*"
                      ],
                      "Effect": "Allow",
                      "Resource": [
                          `acs:oss:*:*:${this.companyName}/account/${uid}`,
                          `acs:oss:*:*:${this.companyName}/account/${uid}*`
                      ]
                  }
              ],
              "Version": "1"
          };
       
          let arn = this.oss.tujingcloudRead;
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
 * 获得oss account写权限的sts临时token,写在临时文件temporaryFile内
 * 
 * @param {string} uid 账号id
 * @returns {object} stsToken
 */
AccountSts.prototype.getWriteAccountStsToken = function(socket) {
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
                            `acs:oss:*:*:${this.companyName}/temporaryFile/account/${socket.account._id}`,
                            `acs:oss:*:*:${this.companyName}/temporaryFile/account/${socket.account._id}/*`
                        ]
                    }
                ],
                "Version": "1"
            };
        
            let arn = this.oss.tujingcloudWrite;
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
 * @param {string} uid 账号id
 * @returns {object} stsToken
 */
AccountSts.prototype.getWriteAndReadAccountStsToken = function(socket) {
    return async (uid, fu)=> {
        try{
            let policy = {
                "Statement": [
                    {
                        "Action": [
                            // "oss:DeleteObject",
                            "oss:ListParts",
                            "oss:AbortMultipartUpload",
                            "oss:PutObject",
                            "oss:Get*",
                            "oss:List*"
                        ],
                        "Effect": "Allow",
                        "Resource": [
                            `acs:oss:*:*:${this.companyName}/account/${socket.account._id}`,
                            `acs:oss:*:*:${this.companyName}/account/${socket.account._id}/*`
                        ]
                    }
                ],
                "Version": "1"
            };
        
            let arn = this.oss.tujingcloudReadandWrite;
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
 * 获得oss account读写权限的sts临时token,没有删除权限
 * boss
 * 
 * @param {string} uid 账号id
 * @returns {object} stsToken
 */
AccountSts.prototype.getWriteAndReadAccountStsTokenBoss = function(socket) {
    return async (uid, fu)=> {
        try{
            let policy = {
                "Statement": [
                    {
                        "Action": [
                            // "oss:DeleteObject",
                            // "oss:ListParts",
                            // "oss:AbortMultipartUpload",
                            // "oss:PutObject",
                            // "oss:Get*",
                            // "oss:List*",
                            "oss:*"
                        ],
                        "Effect": "Allow",
                        "Resource": [
                            `acs:oss:*:*:${this.companyName}/account/${uid}`,
                            `acs:oss:*:*:${this.companyName}/account/${uid}/*`
                        ]
                    }
                ],
                "Version": "1"
            };
        
            let arn = this.oss.tujingcloudReadandWrite;
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

module.exports = new AccountSts();