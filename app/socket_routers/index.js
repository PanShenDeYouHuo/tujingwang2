const user_db = require('../service/mongodb/m_uesr');
const jwt = require('../modules/node-jwt');
const authority = require('./authority');

// const admin = require('./admin');
// const user = require('./user');
// const oss = require('./oss');
// const project = require('./project');

//权限映射
function setAuthority(socket, functionNames) {
	for( let i = 0; i < functionNames.length; i++) {
		console.log(`authority.${functionNames[i]}()`);
		authority[functionNames[i]](socket);
	}
};

module.exports = ()=> {
	return (socket)=> {

		//断开连接
		socket.on('disconnect', async (data)=> {
			if(socket.account) {
				//设置账号下线
				await user_db.findByIdAndUpdate(socket.account._id, {$set: {'state': 2}});
				console.log(`userId：${socket.account._id} , nickname: ${socket.account.nickname} 退出`);
			} else {
				console.log('a user disconnected:' + socket.id);
			}
		});

		//登入认证接口，根据权限开通socket接口
		socket.on('authentication', async(accessToken)=> {
			try {
/////////////////////******ip验证*******////////////////////
				console.log(socket.handshake.address);
/////////////////////******token验证*******////////////////////
				//检测token是否篡改
				if(!jwt.jwtAuthentication(accessToken, 'meihaodeshijie,meihaodeshenghuo')) return;
				//解析token的内容
				let token = jwt.jwtParse(accessToken);
				// socket.userId = token.payload._id;
				// socket.authority = token.payload.authority;
				
				//检查是否过期
				let isSame = await user_db.findById(token.payload._id, {'accessToken': 1});
				if(isSame.accessToken != accessToken) return;
				
				//登入成功返回最新数据
				let account = await user_db.findOne({'_id': token.payload._id}, {
					'authority': 1, 'accessToken': 1, 'nickname': 1, 'sex': 1, 'province': 1, 'city': 1, 'country': 1, 'headimgurl': 1,
					'contactInformation': 1, 'company': 1, 'realInformation': 1,
				});
				socket.account = account;

				//设置账号上线
				await user_db.findByIdAndUpdate(account._id, {$set: {'state': 1, 'socketId': socket.id}});

/////////////////////******socket.io接口*******////////////////////
				//公共接口
				authority.public(socket);
				
				//根据权限开放接口
				setAuthority(socket, token.payload.authority);


/////////////////////******成功返回*******////////////////////

				socket.emit('authenticationSuccess', account);

			} catch (err) {
				socket.volatile.emit('appError','发生错误');
				console.log(err);
			}	
			
		});
		
		
	}
};
