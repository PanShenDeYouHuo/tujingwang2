const Mongoose = require("./mongodb.js");

let schema = Mongoose.Schema;

let employeeSchema = new schema ({
	state: { //0 未登入 1登入中
		type: Number,
		default: 0
	},
	authority:{	//权限
		type: Number,
		default: 0
	},
	name:{	//名字
		type: String,
	},
	mobilePhoneNumber: { //手机号码
		type: Number,
	},
	password: { //密码
		type: String,
	},
	headUrl: {	//头像地址
		type: String,
	},
	profile: {	//档案
		sex: {type: String},	//性别
		IDcard: {type: String},	//省份证
		job: {type: String},	//职位
	},
	socialNetworks: { //未启用
		type: String,
	}
});

function EmployeeClass() {

	Employee = Mongoose.model('Employee', employeeSchema);

	this.get = ()=> {
		return Employee;
	}

	/**
	 * [根据id查询员工]
	 * @param  {[String]} id [_id]
	 * @return {[Object]}    [返回员工数据]
	 */
	this.findId = (id)=> {
		return new Promise((resolve, reject)=> {
			Employee.findById(id, (err,res)=> {
				if(err){
					return reject(err)
				}
				resolve(res);
			});
		});
	}

	/**
	 * [删除员工]
	 * @param  {[Object]} wherestr [筛选条件]
	 * @return {[Object]}          [返回是否成功以及影响的行数]
	 */
	this.deleteEmployee = (wherestr)=> {
		return new Promise((resolve, reject)=> {
			Employee.remove(wherestr, function(err, res){
		        if (err) return reject(err);
		        resolve(res.result);
		    });
		});
	}

	/**
	 * [根据条件，返回符合条件的一个员工数据]
	 * @param  {[object]} whereStr [查询条件]
	 * @return {[object]}          [返回员工数据]
	 */
	this.getEmployeeOne = (whereStr)=> {
		return new Promise((resolve, reject)=> {
			Employee.findOne(whereStr, (err, res)=> {
				if (err) return reject(err);
				resolve(res);
			});
		});
	}

	/**
	 * [根据条件，返回符合条件的员工数据]
	 * @param  {[object]} whereStr [查询条件]
	 * @return {[object]}          [返回员工数据]
	 */
	this.getEmployee = (whereStr)=> {
		return new Promise((resolve, reject)=> {
			Employee.find(whereStr, (err, res)=> {
				if (err) return reject(err);
				resolve(res);
			});
		});
	}

	/**
	 * [根据条件查询，获得符合条件的总数]
	 * @param  {[String]} whereStr [查询条件]
	 * @return {[Object]}          [返回总数]
	 */
	this.employeeCount = (whereStr)=> {
		return new Promise((resolve, reject)=> {
			Employee.count(whereStr,(err, res)=> {
				if(err){
					return reject(err)
				}
				resolve(res);
			});
		});
	}

	/**
	 * [员工注册]
	 * @param  {[String]} data [注册数据]
	 * @return {[Object]}      [返回是否成功]
	 */
	this.reg = (data)=> {
		return new Promise((resolve, reject)=> {
			let employee = new Employee(data);
			employee.save((err, res)=> {
				if(err){
					return reject(err);
				}
				resolve({ok: 1});
			});
		});
	}

	/**
	 * [更新数据]
	 * @param  {[Object]} data [需要更新的数据]
	 * @return {[Object]}      [返回是否成功]
	 */
	this.update = (data)=> {
		return new Promise((resolve, reject)=> {
			let updateStr = {};
			for (let key in data) {
				updateStr[key] = data[key];
			}
			Employee.findByIdAndUpdate(data._id, updateStr, (err, res)=> {
				if(err){
					return reject(err);
				}
				resolve({ok: 1});
			});
		});
	}

	
}

module.exports = new EmployeeClass();