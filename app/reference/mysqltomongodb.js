const Mysql = require('./mysql_modules/mysqlTool');
const Employee_mongodb = require('./mongodb_modules/m_employee');
const Project_mongodb = require('./mongodb_modules/m_project');

// // mysql to mongodb
// let mstomg = async()=> {
// 	let employeelist = await Mysql.s_getAll();
// 	for (let v of employeelist) {
// 		let validate = await Employee_mongodb.employeeCount({'mobilePhoneNumber': v.mobilephone});
// 		if(validate) continue;
// 		let user = {
// 			name: v.jname,
// 			mobilePhoneNumber: v.mobilephone,
// 			password: v.passw,
// 			profile: {
// 				sex: v.sex,
// 				IDcard: v.idcard,
// 				job: v.job,
// 			}
// 		};
// 		await Employee_mongodb.reg(user);
// 	}
// }

// mstomg()
// 	.catch((err)=> {
// 		console.log(res);
// 	})

// //获得全部员工数据
// Employee_mongodb.getEmployee({})
// 	.then((res)=> {
// 		console.log(res);
// 	})
// 	.catch((err)=> {
// 		console.log(err);
// 	});

//设置账号权限
const setAccessAuthority = async()=> {
	let employeeList = await Employee_mongodb.getEmployee({});
	for (let v of employeeList) {

		if (v.profile.job === '客服') {
			v.authority = 2;
		} else {
			v.authority = 1;
		}

		v.save((err, res)=> {
			if (err) throw new Error(err);
			return res;
		});
	}
	console.log('成功');
}

// setAccessAuthority().catch((err)=> {
// 	console.log(err);
// });

//设置project时间
const setRenderTime = async()=> {
	let whereStr = {};
	let projectList = await Project_mongodb.findProjectData(whereStr, 2000000, 1, {'_id':-1});
	for (let project of projectList) {
		for (let child of project.child_p) {
			for (let image of child.image) {
				if (image.state > 2) {
					image.bigTime = child.st;
				}
			}
		}
		project.save((err, res)=> {
			if (err) throw new Error(err);
			return res;
		});
	}
	console.log('成功');
}

setRenderTime().catch((err)=> {
	console.log(err);
});

// (
// 	async()=> {
// 		throw new Error('error');
// 		console.log('成功');
// 	}
// )().catch((err)=> {
// 	console.log(err);
// })

// //获得全部员工数据
// Employee_mongodb.getEmployee({})
// 	.then((res)=> {
// 		console.log(res);
// 	})
// 	.catch((err)=> {
// 		console.log(err);
// 	});

// //删除员工数据
// let wherestr = {'_id': '598aa44fbcc9c725a0b65301'};
// Employee_mongodb.deleteEmployee(wherestr)
// 	.then((res)=> {
// 		console.log(res);
// 	})
// 	.catch((err)=> {
// 		console.log(err);
// 	});

//验证用户是否存在
// let wherestr = {'mobilePhoneNumber': 18969607502};
// Employee_mongodb.employeeCount(wherestr)
// 	.then((res)=> {
// 		if (res) {
// 			console.log(res);
// 		} else {
// 			console.log('failed');
// 		}
// 	}) 
// 	.catch((err)=> {
// 		console.log(err);
// 	});