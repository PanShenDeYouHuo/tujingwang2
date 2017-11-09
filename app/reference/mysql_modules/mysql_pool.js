var mysql = require("mysql"); //调用mysql模块
var querystring = require("querystring");
var pool = mysql.createPool({
	connectionLimit:10,
	host:"127.0.0.1",	//主机地址
	user:"userone",		//mysql认证用户名
	password:"123456",	//mysql认证用户密码
	database:"dbone",	//数据库名
	port:"3306"			//端口号
});

console.log(">mysql pool start");

var query=function(sql,options,callback){  
    pool.getConnection(function(err,conn){  
        if(err){  
            callback(err,null,null);  
        }else{  
            conn.query(sql,options,function(qerr,rows,fields){  
                //释放连接  
                conn.release();  
                //事件驱动回调  
                callback(qerr,rows,fields);
            });  
        }  
    });  
};

module.exports=query; 