
var OSS = require('ali-oss').Wrapper;
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

Sts.prototype.getSts =  function(uid) {
   
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
     this.sts.assumeRole( arn, policy, 1 * 60, sessionName)
     .then((res)=> {
        console.log(res);
     });
    
}

module.exports = new Sts();