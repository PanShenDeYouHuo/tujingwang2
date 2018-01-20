const config = require('../../config')


function AccountSts() {
    this.name = 'accountSts';
    this.sts = config.oss.sts;
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
                          `acs:oss:*:*:tujingcloud/account/${uid}`,
                          `acs:oss:*:*:tujingcloud/account/${uid}*`
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
 * 获得oss account写权限的sts临时token
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
                            `acs:oss:*:*:tujingcloud/temporaryFile/account/${socket.account._id}`,
                            `acs:oss:*:*:tujingcloud/temporaryFile/account/${socket.account._id}/*`
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
                            "oss:ListParts",
                            "oss:AbortMultipartUpload",
                            "oss:PutObject",
                            "oss:Get*",
                            "oss:List*"
                        ],
                        "Effect": "Allow",
                        "Resource": [
                            `acs:oss:*:*:tujingcloud/temporaryFile/account/${uid}`,
                            `acs:oss:*:*:tujingcloud/temporaryFile/account/${uid}/*`
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

module.exports = new AccountSts();