const user_db = require('../../service/mongodb/m_uesr');
const OSS = require('ali-oss').Wrapper;                 //Promise函数

function User() {
    this.name = 'user';
    this.client = new OSS({
        region: 'oss-cn-beijing',
        accessKeyId: 'LTAIesg8W64WwrGI',
        accessKeySecret: '3iz2f7iwwGPMoicQE9kQJRPACPOPwK',
        bucket: 'tujingcloud',
    });
}
/**
 * 用项目名称和客服创建项目
 * 
 * @param {string} name 项目名称
 * @param {string} service 客服
 */
// User.prototype.postProject = ()=> {
//     return async (data, fu)=> {
//         try {  
//             fu(await project_db.inset({name: data.name, service: data.uid}));
//         } catch (err) {
//             console.log(err);
//             fu({err: true, message: '创建发生错误'});
//         }
//     }
// }

/**
 * 根据项目编号获得项目数据
 * 
 * @param {object} data.pid 项目编号 
 * @returns 
 */
// User.prototype.getProject = ()=> {
//     return async (data, fu)=> {
//         try{
//             fu(await project_db.findById(data.pid, {}));
//         } catch (err) {
//             console.log(err);
//             fu({err: true, message: '发生错误'});
//         }
//     }
// }

/**
 * 根据发布人获得项目列表
 * 
 * @param {object} data.uid 客服id 
 * @returns 
 */
// User.prototype.getProjects = ()=> {
//     return async (data, fu)=> {
//         try{
//             let projects = await project_db.findProjects({service: data.uid}, data.pageSize, data.currentPage, {_id: -1});
//             let count = await project_db.count({service: data.uid});
//             count = Math.ceil(count/data.pageSize);
//             fu({projects, count});
//         } catch (err) {
//             console.log(err);
//             fu({err: true, message: '发生错误'});
//         }
//     }
// }

/**
 * 跟新联系方式
 * 
 * @param {object} data._id 项目编号
 * @returns 
 */
User.prototype.putContactInformation = (account)=> {
    return async (data, fu)=> {
        try{
             fu(await user_db.findByIdAndUpdate(account._id, {$set: {'contactInformation.QQ': data.QQ, 'contactInformation.wechat': data.wechat}}));
        } catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}
/**
 * 实名认证
 * 
 * @returns 
 */
User.prototype.putRealInformation = function(account) {
    return async (data, fu)=> {
        try{
            //获取认证的临时文件
            let list = await this.client.list({
                prefix: `temporaryFile/account/${account._id}/authenticate/`,
                delimiter: '/'
            });

   
            //拷贝文件
            for (let i = 0; i < list.objects.length; i++ ) {
                await this.client.copy(list.objects[i].name.substr(14), list.objects[i].name);
                await this.client.delete(list.objects[i].name);
            }

            //需要保存的认证数据信息
            let realInformation = {
                state: 1,                                                   //0未认证, 1审核中, 2认证成功
                name: data.name,                                            //姓名
                IDNumber: data.IDNumber,                                     //身份证号码
                IDCardFrontObjectKey: list.objects[0].name.substr(14),      //身份证正面
                IDCardReverseObjectKey: list.objects[1].name.substr(14),    //身份证反面
        
                bankCardAccount: data.bankCardAccount,                      //银行卡账号
                openingBank: data.openingBank,                              //开户行
                bankCardFrontObjectKey: list.objects[2].name.substr(14),    //银行卡正面
            };

            //保存到数据库
            let res = await user_db.findByIdAndUpdate(account._id, {$set: realInformation
                // {
                //     'realInformation.state': 1,                                                 //0未认证, 1审核中, 2认证成功
                //     'realInformation.name': data.name,                                          //姓名
                //     'realInformation.IDNumber': data.IDNumber,                                  //身份证号码
                //     'realInformation.IDCardFrontObjectKey': list.objects[0].name.substr(14),    //身份证正面
                //     'realInformation.IDCardReverseObjectKey': list.objects[1].name.substr(14),  //身份证反面
                //     'realInformation.bankCardAccount': data.bankCardAccount,                    //银行卡账号
                //     'realInformation.openingBank': data.openingBank,                            //开户行
                //     'realInformation.bankCardFrontObjectKey': list.objects[2].name.substr(14),  //银行卡正面
                    
                // }
            });
            console.log('res');
            
            //检查是否有公司
            if(account.company) {
                if(account.company.bossId) {
                    // let result = await user_db.findByIdAndUpdate(account.company.id, {$set: {}})
                    return fu(account.company.bossId);
                }
            }
            let admin = await user_db.findOne({'authority': 'admin'}, {'_id': 1,'nickname': 1});
            console.log(admin);
            // await user_db.findByIdAndUpdate(admin._id, {$set: {}});

        }catch (err) {
            console.log(err);
            fu({err: true, message: '发生错误'});
        }
    }
}

module.exports = new User();