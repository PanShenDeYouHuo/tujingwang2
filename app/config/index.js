const OSS = require('ali-oss').Wrapper; //Promise函数
const STS = OSS.STS;


module.exports = {
    companyName: 'tujingcloud',
    oss:{
        sts: new STS({
            accessKeyId:'LTAIesg8W64WwrGI',
            accessKeySecret:'3iz2f7iwwGPMoicQE9kQJRPACPOPwK',
        }),
        client: new OSS({
            region:'oss-cn-beijing',
            accessKeyId:'LTAIesg8W64WwrGI',
            accessKeySecret:'3iz2f7iwwGPMoicQE9kQJRPACPOPwK',
            bucket:'tujingcloud',
        }),
        tujingcloudRead: 'acs:ram::1647720766129117:role/tujingcloud-readonly',
        tujingcloudWrite: 'acs:ram::1647720766129117:role/tujingcloud-write',
        tujingcloudReadandWrite: 'acs:ram::1647720766129117:role/tujingcloud-readandwrite',
    },
    wechat:{
        appId:'wx578ee588948c8fcc',
        appSecret:'88666adf25abd7401bcdb5a42f6565e4',
    },


}