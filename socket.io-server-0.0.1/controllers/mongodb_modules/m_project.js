var mongoose = require("./mongodb.js");
var schema = mongoose.Schema;


//改图子项目
var revise = new schema ({
	st:{type:Date},//改图开始时间
	price: {type:Number,min:1},//价格
	settlement:{//改图结算
		money:{type:Number,min:1,default:-1},
		method:{type:String,},
		time:{type:Date},
	}
});

//子项目
var child_p = new schema ({
	image: [
		{
			state:{type:Number,default:0},//0:建模未完成，1：建模完成， 2：小图完成，3：渲染完成，4：价格结算
			iname:{type:String},
			itype:{type:String, default:"单帧"},
			smallTime: { type:Date }, //小图完成时间
			bigTime: { type:Date },//渲染完成时间
			price:{type:Number,min:0,default:0},
			downpayment:{//项目定金
				money:{type:Number,min:0,default:0},
				method:{type:String, default:"支付宝"},
				time:{type:Date, default:""},
			},
			settlement:{//项目结算
				money:{ type:Number, min:0,default:0},
				method:{ type:String, default:""},
				time:{ type:Date, default:""},
			},

		}
	],
	mname: { type:String, default: "" },//建模师名字

	rname: { type:String, default: "" },//渲染师名字

	ms: { type:Number, default: 0 }, //模型状态 0：未完成， 1：完成
	mt: { type:Date },//模型完成时间

	// initialImageState: { type:Number, default: 0 }, //小图状态 0：未完成， 1：完成
	// initialImageTime: { type:Date }, //小图完成时间

	// rs: { type:Number, default: 0 }, //渲染状态 0：未完成， 1：完成
	// rt: { type:Date },//渲染完成时间

	st: { type:Date },//开始作图时间

	workType:{ type:String, default:"作图" },//工作形式，作图，改图，重做

	files: {
		model:[{//建模模型文件
			name:{type:String},
			url:{type:String},
			child_pId:{type:String},
			fileType:{type:String},
		}],
		rander:[{//渲染模型
			name:{type:String},		//文件名
			url:{type:String},		//网络资源地址	
			child_pId:{type:String},//子项目id，便于删除
			fileType:{type:String},	//文件类型，便于删除
		}],
		image:[{//大图图片
			name:{type:String},
			url:{type:String},
			child_pId:{type:String},
			fileType:{type:String},
		}],
		other:[{//小图图片
			name:{type:String},
			url:{type:String},
			child_pId:{type:String},
			fileType:{type:String},
		}]
	},
});

var projectSchema = new schema({
	cpt: {//项目创建时间
		type:Date,
		default:Date.now
	},
	pname: {//项目名称
		type:String,
		required:true
	},
	customer: {//客户名称
		type:String,
		required:true
	},
	area:{//地区
		type:String,
		required:true
	},
	style:{//风格
		type:String,
		required:true
	},
	space:{//装修类型
		type:String,
	},
	service:{//客服
		type:String,
		required: true
	},
	reference:[//参考文件
		{
			name:{type:String},
			url:{type:String},
		}
	],
	child_p:[child_p],
});

// //设置虚拟属性
// //项目图片总数
// projectSchema.virtual('count').get(()=> {
// 	let count = 0;
// 	if(this.child_p !== undefined){
// 		for(let i = 0; i < this.child_p.length; i++){
// 			count++;
// 		}
// 	}
// 	return count;
// });

//将虚属性返回给客户端
projectSchema.set('toJSON', { virtuals: true });
projectSchema.set('toObject', { virtuals: true });


function ProjectClass(){

		//定义model
		let Project = mongoose.model("Project",projectSchema);

		//获取model
		this.getProject = ()=> {
			return Project;
		}

		//创建项目
		this.createProject = (data)=> {
			project = new Project(data);
			return new Promise((resolve, reject)=> {
				project.save((err, res)=> {
					if(err){
						return reject(err);
					}
					resolve({ok:1});
				});
			});
		}

		//根据查询条件获得总数
		this.projectCount = (whereStr)=> {
			return new Promise((resolve, reject)=> {
				Project.count(whereStr,(err, res)=> {
					if(err){
						return reject(err);
					}
					resolve(res);
				});
			});
		}



		//查询条件//一页多少条//当前第几页//排序（按登录时间倒序）
		this.findProjectData = (whereStr,pageSize,currentPage,sort)=> {

			//跳过数
			let skipnum = (currentPage - 1) * pageSize;

			// result.pageCount = Math.ceil(res/pageSize);//获取总页数
			return new Promise((resolve, reject)=> {
				Project.find(whereStr).skip(skipnum).limit(pageSize).sort(sort).exec((err, res)=> {
				    if (err) {
				        return reject(err);
				    }
				    resolve(res);
				});
			});
		}


		//更新project数据
		//whereStr筛选对象，update是更新的数据
		this.updateProject = (whereStr, update)=> {
			return new Promise ((resolve,reject)=> {
				Project.update(whereStr, update, (err,res)=> {
					if(err){
						return reject(err);
					}
					resolve({ok: 1});
				});

			});
		}

		//查找主项目
		this.findParentProject = (parentId)=> {
			return new Promise ((resolve, reject)=> {
				Project.findById(parentId,(err,res)=> {
					if(err){
						return reject(err);
					}
					resolve(res);
				});
			});
		}

		//更新主项目数据
		this.updateParentProject = (data,project)=> {
			return new Promise ((resolve, reject)=> {

				project.pname = data.pname;
				project.customer = data.customer;
				project.area = data.area;
				project.style = data.style;
				project.space = data.space;

				project.save((err)=> {
					if(err){
						return reject(err);
					}
					resolve(project);
				});
			});
		}

		//更新子项目数据
		this.updateChildProject = (childData, project)=> {
			return new Promise ((resolve, reject)=> {
				let child_p = project.child_p.id(childData._id);

				child_p.mname = childData.mname;
				child_p.rname = childData.rname;
				child_p.st = childData.st;
				child_p.workType = childData.workType;
				child_p.image = childData.image;

				project.save((err)=> {
					if(err){
						return reject(err);
					}
					resolve(project);
				});
			});
		}

		//删除子项目
		//childId: 子项目，project:主项目
		this.deleteChildProject = (childId, project)=> {
			return new Promise ((resolve,reject)=> {
				project.child_p.id(childId).remove();
				project.save((err) =>{
					if(err){
						return reject(err);
					}
					resolve(project.child_p);
				});
			});
		}


		//添加子项目
		//project:主项目 , childData:添加的数据
		this.addChildProject = (childData, project)=> {
			return new Promise ((resolve, reject)=> {
				let i = project.child_p.push(childData);
				// let result = project.child_p[i-1];
				project.save((err)=> {
					if(err){
						console.log(err);
						return reject(err);
					}
					resolve(project);
				});
			});
		}

		//添加参考文件列表
		//fileName：文件名，url: 资源路径，project：主项目
		this.addReferenceFile = (fileName, url, project)=> {
			return new Promise ((resolve, reject)=> {
				let i = project.reference.push({name:fileName, url:url});
				let result = project.reference[i-1];
				project.save((err)=> {
					if(err){
						return reject(err);
					}
					resolve(result);
				});
			});
		}

		//删除参考文件列表
		//childID：子id， project：主项目
		this.deleteReferenceFile = (childId, project)=> {
			return new Promise ((resolve, reject)=> {
				project.reference.id(childId).remove();
				project.save((err)=> {
					if(err){
						return reject(err);
					}
					resolve(project.reference);
				});	
			});
		}

		//添加child_p文件
		//child_pId:子项目id， fileType: 保存文件的类型， fileName: 文件名， url:网络地址， project: 主项目
		this.addChild_pFile = (child_pId, fileType, fileName, url, project)=> {
			return new Promise ((resolve, reject)=> {
				let child_p	= project.child_p.id(child_pId);
				let result = {};
				if(fileType == "model"){
					let i = child_p.files.model.push({name: fileName, url:url, child_pId: child_pId, fileType: 'model'});
					result = child_p.files.model[i-1];
					//设置模型为完成状态
					child_p.ms = 1;
					child_p.mt = new Date();
					for(let j = 0; j < child_p.image.length; j++){
						if(child_p.image[j].state < 1){
							child_p.image[j].state = 1;
						}
					}
				}
				if(fileType == "rander"){
					let i = child_p.files.rander.push({name: fileName, url:url, child_pId: child_pId, fileType: 'rander'});
					result = child_p.files.rander[i-1];
					//设置渲染模型为完成状态
				}
				if(fileType == "image"){
					let i = child_p.files.image.push({name: fileName, url:url, child_pId: child_pId, fileType: 'image'});
					result = child_p.files.image[i-1];
					//设置大图为完成状态
				}
				if(fileType == "other"){
					let i = child_p.files.other.push({name: fileName, url:url, child_pId: child_pId, fileType: 'other'});
					result = child_p.files.other[i-1];
					//设置小图为完成状态
					for(let j = 0; j < child_p.image.length; j++){
						if(child_p.image[j].state < 2){
							child_p.image[j].state = 2;
							child_p.image[j].smallTime = new Date();
						}
					}
				}
				project.save((err)=> {
					if(err) return reject(err);
					resolve(result);
				});
			});
		}

		//删除child_p文件
		//child_pId:子项目id, filesId:文件id, fileType:文件类型，project:主项目
		this.deleteChild_pFile = (child_pId, filesId, fileType, project)=> {
			return new Promise ((resolve, reject)=> {
				let child_p = project.child_p.id(child_pId);
				if(fileType == "model"){
					let i = child_p.files.model.id(filesId).remove();
				}
				if(fileType == "rander"){
					let i = child_p.files.rander.id(filesId).remove();
				}
				if(fileType == "image"){
					let i = child_p.files.image.id(filesId).remove();
				}
				if(fileType == "other"){
					let i = child_p.files.other.id(filesId).remove();
				}
				project.save((err)=> {
					if(err){
						return reject(err);
					}
					resolve();
				});
			});
		}

		//image小图完成
		//child_pId:子项目Id，index:image数组位置，project:主项目, 
		this.initialImage = (child_pId, index, project)=> {
			return new Promise ((resolve, reject)=> {
				let child = project.child_p.id(child_pId);
				if(child.image[index].state != 1){
					return reject("请完成前面的任务");
				}
				child.image[index].state = 2;
				child.image[index].smallTime = new Date();
				project.save((err)=> {
					if(err){
						return reject(err);
					}
					resolve(2);
				});
			});
		}

		//image渲染完成
		//child_pId:子项目Id，index:image数组位置，project:主项目, 
		this.successImage = (child_pId, index, project)=> {
			return new Promise ((resolve, reject)=> {
				let child = project.child_p.id(child_pId);
				if(child.image[index].state != 2){
					return reject("请完成前面的任务");
				}
				child.image[index].state = 3;
				child.image[index].bigTime = new Date();
				project.save((err)=> {
					if(err){
						return reject(err);
					}
					resolve(3);
				});
			});
		}

		//image结算
		//child_pId:子项目Id，index:image数组位置，project:主项目, settlementData:settlement数据
		this.settlementImage = (child_pId, index, project, settlementData)=> {
			return new Promise ((resolve, reject)=> {
				let child = project.child_p.id(child_pId);
				if(child.image[index].state != 3){
					return reject("未完成，无法结算");
				}
				child.image[index].settlement = {
					money: settlementData.money,
					method: settlementData.method,
					time: settlementData.time,
				};
				child.image[index].state = 4;
				project.save((err)=> {
					if(err){
						return reject(err);
					}
					resolve(4);
				});
			});
		}

		//计算完成的渲染师提成
		this.financeRender = (name, string, time)=> {
			let $match = {
				"child_p.image.bigTime":{$gte: time[0], $lt: time[1]},
				"child_p.image.state": {$gte: 3}
			};
			$match['child_p.'+ string] = name;
			return new Promise ((resolve, reject)=> {
				Project.aggregate([
					{
						$match
					},
					{ 
						$unwind : "$child_p"
					},
					{ 
						$unwind : "$child_p.image" 
					},
					{
						$project: {
							customer: 1,
							service: 1,
							child_p: 1
						}
					},
					{
						$match
					},
					{
						$project: {
							customer: 1,
							service: 1,
							name: "$child_p."+string,
							iname: "$child_p.image.iname",
							price: "$child_p.image.price",
							itype: "$child_p.image.itype",
							state: "$child_p.image.state",
							settlement: "$child_p.image.settlement",
							downpayment: "$child_p.image.downpayment",
						}
					},
					{
					   $sort: {_id: 1}//根据date排序
					},
					{
					   $group: {
					   		_id: "$name",
				   		 	totalPrice:{$sum: "$price"}, //统计price
				   		 	total:{$sum: 1},
						}
					}
				]).exec((err, res)=> {
					if(err) return reject(err);
					resolve(res);
				});
			});
		}

		//计算完成渲染提成的列表详情
		this.financeRenderId = (name, string, time)=> {
			let $match = {
				"child_p.image.bigTime":{$gte: time[0], $lt: time[1]},
				"child_p.image.state": {$gte: 3}
			};
			$match['child_p.'+ string] = name;
			return new Promise ((resolve, reject)=> {
				Project.aggregate([
					{
						$match
					},
					{ 
						$unwind : "$child_p"
					},
					{ 
						$unwind : "$child_p.image" 
					},
					{
						$project: {
							customer: 1,
							service: 1,
							child_p: 1
						}
					},
					{
						$match
					},
					{
						$project: {
							customer: 1,
							service: 1,
							name: "$child_p."+string,
							iname: "$child_p.image.iname",
							price: "$child_p.image.price",
							itype: "$child_p.image.itype",
							jtype: string === "mname" ? "建模" : "渲染",
							state: "$child_p.image.state",
							settlement: "$child_p.image.settlement",
							downpayment: "$child_p.image.downpayment",
						}
					},
					{
					   $sort: {_id: 1}//根据date排序
					}
				]).exec((err, res)=> {
					if(err) return reject(err);
					resolve(res);
				});
			});
		}

		//获得客户的未结算账单
		this.financeCustomer = ()=> {
			return new Promise ((resolve, reject)=> {
				Project.aggregate([
					{
						$match: {
							"child_p.image.state": 3
						}
					},
					{
						$unwind: "$child_p"
					},
					{
						$unwind: "$child_p.image"
					},
					{
						$project: {
							customer: 1,
							service: 1,
							child_p: 1,
						}
					},
					{
						$match: {
							"child_p.image.state": 3
						}
					},
					{
						$project: {
							customer: 1,
							service: 1,
							image: {
								iname: "$child_p.image.iname",
								price: "$child_p.image.price",
								itype: "$child_p.image.itype",
								rname: "$child_p.rname",
								mname: "$child_p.mname",
								url: "$child_p.files.image",
								settlement: "$child_p.image.settlement",
								downpayment: "$child_p.image.downpayment",
							},
						}
					},
					{
						$group: {
							_id: "$customer",
							totalPrice:{$sum: "$image.price"}, //统计price
							image: {$push: "$image"},
							total:{$sum: 1},
						}
					},
					{
					   $sort: {totalPrice: -1}//根据date排序
					}
				]).exec((err, res)=> {
					if (err) return reject(err);
					resolve(res);
				})
			})
		}

		//根据查询条件获得总数
		this.imageCount = (whereStr)=> {
			return new Promise ((resolve, reject)=> {
				Project.aggregate([
					{
						$match:whereStr
					},
					{ 
						$unwind: "$child_p"
					},
					{ 
						$unwind: "$child_p.image" 
					},
					{
						$project: {
							area: 1,
							child_p: {
								image:1,
								rname:1,
							}
						}
					},
					{
						$match: whereStr
					},
					{
						$project: {
							area: 1,
							price: "$child_p.image.price",
							itype: "$child_p.image.itype",
							state: "$child_p.image.state",
						}
					},
					{
					   $sort: {_id: 1}//根据date排序
					},
					{
					   $group: {
					   		_id: "$state",
				   		 	totalPrice:{$sum: "$price"}, //统计price
				   		 	total:{$sum: 1},
						}
					}
				]).exec((err, res)=> {
					if(err) return reject(err);
					resolve(res);
				});
			});
		}

}


module.exports = new ProjectClass();

// var Parent = mongoose.model('Parent'); 
// var parent = new Parent; // create a comment 
// parent.children.push({ name: 'Liesl' });
// var subdoc = parent.children[0]; console.log(subdoc) // { _id: '501d86090d371bab2c0341c5', name: 'Liesl' } 
// subdoc.isNew; // true 
// parent.save(function (err) { 
// if (err) return handleError(err) 
// console.log('Success!'); 
// }); //或者 
// var newdoc = parent.children.create({ name: 'Aaron' });