var query = require("./mysql_pool");

//执行sql语句
exports.s_sdll = function(req,res){
	var data = [];
	var sql = "select * from 3dll_models";
	var param = [];
	query(sql,param,function(err,rows,fields){
		for(var i = 0; i < rows.length; i++){
			data.push({
				mno: rows[i].mno,
				myear: rows[i].myear,
				mstyle: rows[i].mstyle,
				mdir: rows[i].mdir
			});
		}
		res.write(JSON.stringify(data));
		res.end();
	});
}
//获取全部员工数据
exports.s_getAll = (req, res)=> {
	return new Promise((resolve, reject)=> {
		let sql = "select * from staffs"
		let param = [];
		query(sql, param, (err, rows, fields)=> {
			if (err) return reject(err);

			resolve(rows);
		});
	});
}

//用户登入判断
exports.s_loginSelect = function(req, res){
	var data = {ispass: "0"};
	var sql = "select * from staffs where jno=" + req.query.jno;
	var param = [];
	query(sql,param,function(err,rows,fields){
		if(err){
			console.log(err);
			data.ispass = -2;
			var str = "person(" + JSON.stringify(data) + ")";
			res.end(str);
			return;
		}
		if(rows[0] == null){	
			data.ispass = -1;
			var str = "person(" + JSON.stringify(data) + ")";		
			return res.end(str);
		}
		if( req.query.password == rows[0].passw){
			data.ispass = 1;
		    var user = {
        		'jname':rows[0].jname,
        		'jno': rows[0].jno,
        		'job': rows[0].job
			}
			req.session.user = user;
			data.user = user;
		}
		var str = "person(" + JSON.stringify(data) + ")";//ajax跨域需要jsonp
		console.log(str);
		res.end(str);
	});
}

//判断客户是否存在，存在true，不存在false
//{ “valid”: true }//通过验证 或 { “valid”: false }//不通过—》 ‘不已存在',
exports.s_isCustomer = function(req, res){
	var valid = { "valid": false };
	var sql = "select count(*) from customer where 客户名称= \'" + req.body.客户名称 + "\'";
	var param = [];
	query(sql,param,function(err,rows,fields){
		if(err){
			console.log(err);
			return res.end(JSON.stringify(valid));
		}
		if(rows[0] == null){
			return res.end(JSON.stringify(valid));
		}
		//大于0就是存在
		if (rows[0]['count(*)']) {
			valid.valid = true;
		}
		res.end(JSON.stringify(valid));
	});
}

//判断建模师是否存在，存在true，不存在false
//{ “valid”: true }//通过验证 或 { “valid”: false }//不通过—》 ‘不已存在',
exports.s_isModel = function(req, res){
	var valid = { "valid": false };
	var sql = "select job from staffs where jname= \'" + req.body.建模师 + "\'";
	var param = [];
	query(sql,param,function(err,rows,fields){
		if(err){
			console.log(err);
			return res.end(JSON.stringify(valid));
		}
		if(rows[0] == null){
			return res.end(JSON.stringify(valid));
		}
		//大于0就是存在
		if (rows[0].job == "建模师" ){
			valid.valid = true;
		}
		res.end(JSON.stringify(valid));
	});
}

//判断渲染师是否存在，存在true，不存在false
//{ “valid”: true }//通过验证 或 { “valid”: false }//不通过—》 ‘不已存在',
exports.s_isRender = function(req, res){
	var valid = { "valid": false };
	var sql = "select job from staffs where jname= \'" + req.body.渲染师 + "\'";
	var param = [];
	query(sql,param,function(err,rows,fields){
		if(err){
			console.log(err);
			return res.end(JSON.stringify(valid));
		}
		if(rows[0] == null){
			return res.end(JSON.stringify(valid));
		}
		//大于0就是存在
		if (rows[0].job == "渲染师" ){
			valid.valid = true;
		}
		res.end(JSON.stringify(valid));
	});
}


////////socket.io/////////
///客服界面
///创建项目，成功ispass=1，失败ispass=0
// exports.s_createProject = function(data, fu){
// 	var pass = {ispass: "0"};
// 	var sql = "insert into project values(NULL, NOW(),'t', ?, ?, ?, ?, ?, ?, ?, ?, NULL, ?, NULL, ?, NULL, ?,?, NOW(), NULL,NULL, NULL, NULL)";
// 	var param = [data[0]["value"], data[1]["value"], data[2]["value"], data[3]["value"], data[4]["value"], data[5]["value"], data[6]["value"], data[10]["value"], data[11]["value"], data[7]["value"], data[8]["value"], data[9]["value"]];
// 	query(sql,param,function(err,rows,fields){
// 		if(err){
// 			console.log(err);
// 			return fu(JSON.stringify(pass));
// 		}
// 		if(rows == null){
// 			fu(JSON.stringify(pass));
// 			return;
// 		}

// 		pass.ispass = 1; 
// 		fu(JSON.stringify(pass));
// 	});
// } 

exports.s_modelTable = function(data, fu){
	var databuf = [];
	var sql = "select jname from staffs where job = '建模师'";
	var param = [];
	query(sql,param,function(err,rows,fields){
		if(err){
			console.log(err);
			return fu("err");
		}
		if(rows[0] == null){
			return fu("err");
		}
		for(var i = 0; i < rows.length; i++){
			databuf.push({
				"name": rows[i].jname
			});
		}
		fu(databuf);

	});
}

exports.s_modelData = function(data, fu){
	var databuf = [{name:data.name}];
	var sql = "select 项目状态,建模完成分 from project where 建模师 = '" + data.name + "'";
	var param = [];
	query(sql,param,function(err,rows,fields){
		if(err){
			console.log(err);
			return fu(databuf);
		}
		if(rows[0] == null){
			return fu(databuf);
		}
		for(var i = 0; i < rows.length; i++){
			databuf.push({
				score: rows[i].建模完成分,
				level: rows[i].项目状态
			});
		}
		fu(databuf);

	});
}

exports.s_renderTable = function(data, fu){
	var databuf = [];
	var sql = "select jname from staffs where job = '渲染师'";
	var param = [];
	query(sql,param,function(err,rows,fields){
		if(err){
			console.log(err);
			return fu("err");
		}
		if(rows[0] == null){
			return fu("err");
		}
		for(var i = 0; i < rows.length; i++){
			databuf.push({
				"name": rows[i].jname
			});
		}
		fu(databuf);

	});
}

exports.s_renderData = function(data, fu){
	var databuf = [{name:data.name}];
	var sql = "select 项目状态 from project where 渲染师 = '" + data.name + "'";
	var param = [];
	query(sql,param,function(err,rows,fields){
		if(err){
			console.log(err);
			return fu(databuf);
		}
		if(rows[0] == null){
			return fu(databuf);
		}
		for(var i = 0; i < rows.length; i++){
			databuf.push({
				score: rows[i].建模完成分,
				level: rows[i].项目状态
			});
		}
		fu(databuf);

	});
}

//创建新员工
exports.s_createStaffs = function(data, fu){
	var sql = "insert into staffs values(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	var param = [data.ID, data.password, data.name, data.sex, data.job, data.nativePlace, data.presentAddress, data.mobilePhone, data.qq, data.computNumbel];
	query(sql,param,function(err,rows,fields){
		if(err){
			return fu({err: -1,message: err});
		}
		if(rows == null){
			return fu({err: -1,message: "注册失败"});
		}
		fu({ok: 1});
	});
}

////////模型师界面

//今天的项目
exports.s_modelToday = function(data, fu){
	var databuf = [];
	var sql = "select * from project where 建模师 = '" + data.name + "' and 项目状态 = 't' order by pno desc" ;
	var param = [];
	console.log(sql);
	query(sql,param,function(err,rows,fields){
		if(err){
			console.log(err);
			return fu(databuf);
		}
		if(rows[0] == null){
			return fu(databuf);
		}
		for(var i = 0; i < rows.length; i++){
			databuf.push({
				project: rows[i].图纸名称,
				customer: rows[i].客户名称,
				time: rows[i].项目创建日期,
				model: rows[i].建模师,
				render: rows[i].渲染师
			});
		}
		fu(databuf);
	});
}

//全部项目
exports.s_modelAll = function(data, fu){
	var databuf = [];
	var sql = "select * from project where 建模师 = '" + data.name + "' order by pno desc" ;
	var param = [];
	query(sql,param,function(err,rows,fields){
		if(err){
			console.log(err);
			return fu(databuf);
		}
		if(rows[0] == null){
			return fu(databuf);
		}
		for(var i = 0; i < rows.length; i++){
			databuf.push({
				project: rows[i].图纸名称,
				customer: rows[i].客户名称,
				time: rows[i].项目创建日期,
				model: rows[i].建模师,
				render: rows[i].渲染师
			});
		}
		fu(databuf);
	});
}

/////渲染师界面
///
//今天的项目
exports.s_renderToday = function(data, fu){
	var databuf = [];
	var sql = "select * from project where 渲染师 = '" + data.name + "' and 项目状态 = 't' order by pno desc" ;
	var param = [];
	query(sql,param,function(err,rows,fields){
		if(err){
			console.log(err);
			return fu(databuf);
		}
		if(rows[0] == null){
			return fu(databuf);
		}
		for(var i = 0; i < rows.length; i++){
			databuf.push({
				project: rows[i].图纸名称,
				customer: rows[i].客户名称,
				time: rows[i].项目创建日期,
				model: rows[i].建模师,
				render: rows[i].渲染师
			});
		}
		fu(databuf);
	});
}

//全部项目
exports.s_renderAll = function(data, fu){
	var databuf = [];
	var sql = "select * from project where 渲染师 = '" + data.name + "' order by pno desc" ;
	var param = [];
	query(sql,param,function(err,rows,fields){
		if(err){
			console.log(err);
			return fu(databuf);
		}
		if(rows[0] == null){
			return fu(databuf);
		}
		for(var i = 0; i < rows.length; i++){
			databuf.push({
				project: rows[i].图纸名称,
				customer: rows[i].客户名称,
				time: rows[i].项目创建日期,
				model: rows[i].建模师,
				render: rows[i].渲染师
			});
		}
		fu(databuf);
	});
}