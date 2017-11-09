//财务api

const Project_mongodb = require('../mongodb_modules/m_project');
const Employee_mongodb = require('../mongodb_modules/m_employee');
const Customer_mongodb = require('../mongodb_modules/m_customer');



// 		// console.log(new Date(data.time).getDate());
// 		// console.log(Date.parse(data.time));
// 		// console.log(Date.parse(Date(data.time)));

//获取建模师或者渲染师的工资单
exports.getFinanceEmployee = ()=> {
	return (data, fu)=> {
		let time = new Date(data.time);
		let startTime = new Date(time.getFullYear(), time.getMonth(), 1, 0, 0, 0, 0);
		let endTime = new Date(time.getFullYear(), time.getMonth()+1, 1, 0, 0, 0, 0);
		endTime.setMilliseconds(endTime.getMilliseconds() - 1);

		(
			async()=> {
				let renderlist = await Employee_mongodb.getEmployee({"profile.job": ["建模师", "渲染师"]});
				let result = [];
				for (let v of renderlist) {
					let model = await Project_mongodb.financeRender(v.name, 'mname', [startTime, endTime]);
					let render = await Project_mongodb.financeRender(v.name, 'rname', [startTime, endTime]);
					result.push({
						_id: v.name,
						totalModelPrice: model[0] ? model[0].totalPrice : 0,
						totalModel: model[0] ? model[0].total : 0,
						totalRenderPrice: render[0] ? render[0].totalPrice : 0,
						totalRender: render[0] ? render[0].total : 0
					});
				}
				fu(result);
			}
		)().catch((err)=> {
			console.log(err);
		});
	};
}

//根据名字查询建模和渲染的工资详情
exports.getFinanceEmployeeId = ()=> {
	return (data, fu)=> {
		let time = new Date(data.time);
		let startTime = new Date(time.getFullYear(), time.getMonth(), 1, 0, 0, 0, 0);
		let endTime = new Date(time.getFullYear(), time.getMonth()+1, 1, 0, 0, 0, 0);
		endTime.setMilliseconds(endTime.getMilliseconds() - 1);
		(
			async()=> {
				let mlist = await Project_mongodb.financeRenderId(data.id, 'mname', [startTime, endTime]);
				let rlist = await Project_mongodb.financeRenderId(data.id, 'rname', [startTime, endTime]);
				mlist.push.apply(mlist,rlist);
				fu(mlist);
			}
		)().catch((err)=> {
			console.log(err);
		});
	};
}

//查询客户的未结算账单
exports.getFinanceCustomer = ()=> {
	return (data, fu)=> {
		(
			async()=> {
				let customerList = await Project_mongodb.financeCustomer();
				fu(customerList);
			}
		)().catch((err)=> {
			console.log(err);
		});
	};
}