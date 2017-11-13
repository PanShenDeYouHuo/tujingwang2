
var OSS = require('ali-oss').Wrapper; //Promise函数
var STS = OSS.STS;


function StsToken() {
    this.name = 'sts';
    this.sts = new STS({
        accessKeyId: 'LTAIesg8W64WwrGI',
        accessKeySecret: '3iz2f7iwwGPMoicQE9kQJRPACPOPwK'
    });
};

/**
 * 获得oss写权限的sts临时token
 * 
 * @param {string} uid 账号id
 * @returns {object} stsToken
 */
StsToken.prototype.getReadStsToken = async function(uid) {
   
    let policy = {
        "Statement": [
            {
                "Action": [
                    "oss:Get*",
                    "oss:List*"
                ],
                "Effect": "Allow",
                "Resource": ["acs:oss:*:*:tujingcloud/productionProject/*"]
            }
        ],
        "Version": "1"
    };

    let arn = 'acs:ram::1647720766129117:role/tujingcloud-write';
    let sessionName = uid;
    console.log(this.sts.assumeRole);
    
    //获取token
    let token = await this.sts.assumeRole( arn, policy, 15 * 60, sessionName);
    return token;
    
}

module.exports = new StsToken();