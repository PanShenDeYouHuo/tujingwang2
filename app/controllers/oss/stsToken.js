const OSS = require('ali-oss').Wrapper; //Promise函数
const STS = OSS.STS;


function StsToken() {
    this.name = 'sts';
    this.sts = new STS({
        accessKeyId: 'LTAIesg8W64WwrGI',
        accessKeySecret: '3iz2f7iwwGPMoicQE9kQJRPACPOPwK'
    });
};


/**
 * 获得oss读权限的sts临时token
 * 
 * @param {string} uid 账号id
 * @returns {object} stsToken
 */
StsToken.prototype.getReadStsToken = ()=> {
    return async (uid, fu)=> {
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
            let sessionName = uid;
            
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
 * 获得oss写权限的sts临时token
 * 
 * @param {string} uid 账号id
 * @returns {object} stsToken
 */
StsToken.prototype.getWriteStsToken = ()=> {
    console.log(this);
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
                            "acs:oss:*:*:tujingcloud/productionProject",
                            "acs:oss:*:*:tujingcloud/productionProject/*"
                        ]
                    }
                ],
                "Version": "1"
            };
        
            let arn = 'acs:ram::1647720766129117:role/tujingcloud-write';
            let sessionName = uid;
            
            console.log(this.sts);
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