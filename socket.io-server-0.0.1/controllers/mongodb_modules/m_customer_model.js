var CustomerClass = require("./m_customer.js");
customerClass = new CustomerClass();

//创建客户接口
exports.m_createCustomer = (data, fu)=> {
	customerClass.customerCount({qq: data.qq})
	.then((res)=> {
		if(res != 0){
			return Promise.reject("QQ号码重复");
		}
		return customerClass.customerCount({name: data.name})
	})
	.then((res)=> {
		if(res != 0){
			return Promise.reject("客户姓名重复");
		}
		return customerClass.reg(data);
	})
	.then((res)=> {
		fu(res);
	})
	.catch((err)=> {
		console.log(err);
		fu({err: -1, message: err});
	});
}

//更新客户数据接口
exports.m_updateCustomer = (data, fu)=> {
	customerClass.update(data)
	.then((res)=> {
		fu(res);
	})
	.catch((err)=> {
		console.log(err);
		fu({err: -1, message: err});
	});
}

//根据名字返回客户名字列表
exports.m_nameListCustomer = (data, fu)=> {
	let whereStr = {};
	whereStr.name =  {$regex: data};
	customerClass.nameList(whereStr)
	.then((res)=> {
		fu(res);
	})
	.catch((err)=> {
		console.log(err);
		fu({err: -1, message: err});
	});
}

//返回客户数据
exports.m_listCustomer = (data, fu)=> {
	let whereStr = {};
	let result = {
		list:'',
		count:0,
	};

	if(data.name){
		whereStr.name = {$regex: data.name};
	}

	console.log(data);

	customerClass.dataList(whereStr, 16, data.currentPage, {'ctime':-1})
	.then((res)=> {
		result.list = res;
		return customerClass.customerCount(whereStr);
	})
	.then((res)=> {
		result.count = Math.ceil(res/16);
		fu(result);
	})
	.catch((err)=> {
		console.log(err);
		fu({err: -1, message: err});
	});
}

// //根据客户名查找数据
// exports.m_findCustomer = (data, fu)=> {
// 	let whereStr = { name: data.name };
// 	let result = {
// 		list:'',
// 		count:0,
// 	};

// 	customerClass.dataList(whereStr, 16, data.currentPage, {'ctime':-1})
// 	.then((res)=> {
// 		result.list = res;
// 		return customerClass.customerCount(whereStr);
// 	})
// 	.then((res)=> {
// 		result.count = Math.ceil(res/16);
// 		fu(result);
// 	})
// 	.catch((err)=> {
// 		console.log(err);
// 		fu({err: -1, message: err});
// 	});
// }