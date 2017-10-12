var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
//////// 连接 ////////
let db_url = "mongodb://60.205.225.197:27017/tujing";
mongoose.connect(db_url, {useMongoClient: true});

//////// 连接成功 ////////
mongoose.connection.on("connected", function(){
	console.log("mongoose connection open to" + db_url);
});

//////// 连接异常 ////////
mongoose.connection.on("error", function(err){
	console.log("mongoose connection error:" + err);
});

//////// 连接断开 ////////
mongoose.connection.on("disconnected", function(){
	console.log("mongoose connection  disconnected");
});

module.exports = mongoose;