//统计api

const Project_mongodb = require('../mongodb_modules/m_project');
const Employee_mongodb = require('../mongodb_modules/m_employee');
const Customer_mongodb = require('../mongodb_modules/m_customer');

//区域统计项目总数
exports.getStatisticsRegionalProject = ()=> {
	return (data, fu)=> {
		let promiseArray = [];
		let areaArray = ['长沙', '台州', '宁波'];

		for ( let i = 0; i < areaArray.length; i++) {
			promiseArray.push( Project_mongodb.projectCount({area: areaArray[i]}) );
		}

		Promise.all(promiseArray)
			.then(([Changsha, Taizhou, Ningbo])=> {
				fu({Changsha, Taizhou, Ningbo});
			})
			.catch((err)=> {
				console.log(err);
			});
	}
}

//区域统计图片总数
exports.getStatisticsRegionalImage = ()=> {
	return (data, fu)=> {
		let promiseArray = [];
		let areaArray = ['长沙', '台州', '宁波'];

		for ( let i = 0; i < areaArray.length; i++) {
			promiseArray.push( Project_mongodb.imageCount({area: areaArray[i]}) );
		}

		Promise.all(promiseArray)
			.then(([Changsha, Taizhou, Ningbo])=> {
				fu({Changsha: Changsha, Taizhou: Taizhou, Ningbo: Ningbo});
			})
			.catch((err)=> {
				console.log(err);
			});
	}
}