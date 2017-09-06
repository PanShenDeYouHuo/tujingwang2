var mongoose = require("./mongodb.js");
var schema = mongoose.Schema;

var customerSchema = new schema({
	name:{
		type:String,
	},
	qq:{
		type:Number,
	},
	addr:{
		type:String,
	},
	company:{
		type:String,
	},
	phone:{
		type:Number,
	},
	salesman:{
		type:String,
	},
	rate:{
		type:Number,
	},
	ctime: {//项目创建时间
		type:Date,
		default:Date.now
	},
});

function CustomerClass(){

	let Customer = mongoose.model("Customer",customerSchema);

	this.getCustomer = function(){
		return Customer;
	}

	//根据id查找customer
	//id:customer的id
	this.findCustomer = (id)=> {
		return new Promise((resolve, reject)=> {
			Customer.findById(id, (err,res)=> {
				if(err){
					return reject(err)
				}
				resolve(res);
			});
		});
	}

	//根据查询条件获得总数
	this.customerCount = (whereStr)=> {
		return new Promise((resolve, reject)=> {
			Customer.count(whereStr,(err, res)=> {
				if(err){
					return reject(err)
				}
				resolve(res);
			});
		});
	}

	//根据查询条件，返回客户数据
	this.dataList = (whereStr, pageSize, currentPage, sort)=> {
		return new Promise((resolve, reject)=> {
			//跳过数
			let skipnum = (currentPage - 1) * pageSize;
			Customer.find(whereStr).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, res) {
			    if (err) {
			        return reject(err);
			    }
			    resolve(res);
			});
		});
	}

	//注册接口
	//data: 注册数据
	this.reg = (data)=> {
		return new Promise((resolve, reject)=> {
			let customer = new Customer(data);
			customer.save((err, res)=> {
				if(err){
					return reject(err);
				}
				resolve({ok: 1});
			});
		});
	}

	//更新修改接口
	//data：更新数据
	this.update = (data)=> {
		return new Promise((resolve, reject)=> {
			let updateStr = {
					name: data.name,
					qq: data.qq,
					addr: data.addr,
					company: data.company,
					phone: data.phone,
					salesman: data.salesman,
					rate: data.rate,
			}
			Customer.findByIdAndUpdate(data._id, updateStr, (err, res)=> {
				if(err){
					return reject(err);
				}
				resolve({ok: 1});
			});
		});
	}

	//根据客户名模糊查找接口
	this.nameList = (whereStr)=> {
		return new Promise((resolve, reject)=> {
			let opt = {"name": 1,  "_id": 0}
			Customer.find(whereStr, (err, res)=> {
				if(err){
					return reject(err);
				}
				resolve(res);
			});
		});
	}


}

module.exports = CustomerClass; 