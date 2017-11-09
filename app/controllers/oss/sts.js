
var OSS = require('ali-oss');
var STS = OSS.STS;

// let sts = new AliSts({
//     accessKeyId: 'LTAIesg8W64WwrGI',
//     accessKeySecret: '3iz2f7iwwGPMoicQE9kQJRPACPOPwK'
// }) ;

function Sts() {
    this.name = 'sts';
    this.sts = new STS({
        accessKeyId: 'LTAIesg8W64WwrGI',
        accessKeySecret: '3iz2f7iwwGPMoicQE9kQJRPACPOPwK'
    });
};

Sts.prototype.getSts = async function(uid) {
   
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
    
    //获取token
    let token = await this.sts.assumeRole( arn, policy, 1 * 60, sessionName);
    console.log(token);
    
}

module.exports = new Sts();