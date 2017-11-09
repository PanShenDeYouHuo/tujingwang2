const AliSts = require('ali-oss').STS;

let sts = new AliSts({
    accessKeyId: 'LTAIesg8W64WwrGI',
    accessKeySecret: '3iz2f7iwwGPMoicQE9kQJRPACPOPwK'
}) ;

function Sts() {
    this.name = 'sts';
    this.sts = sts;
};

Sts.prototype.get = ()=> {
   
    var policy = {
        "Statement": [
            {
                "Action": [
                "oss:Get*"
                ],
                "Effect": "Allow",
                "Resource": ["acs:oss:*:*:tujingcloud/productionProject/*"]
            }
        ],
        "Version": "1"
    };
}

module.exports = new Sts();