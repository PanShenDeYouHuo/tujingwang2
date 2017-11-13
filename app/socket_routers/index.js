
const user_db = require('../service/mongodb/m_uesr');
const jwt = require('../modules/node-jwt');
const user = require('./user');
const ossFile = require('./ossFile');

module.exports = ()=> {
	return (socket)=> {




		//断开连接
		socket.on('disconnect', (data)=> {
			if(socket.account._id) {
				console.log(`userId：${socket.account._id} , nickname: ${socket.account.nickname} 退出`);
			} else {
				console.log('a user disconnected:' + socket.id);
			}
		});

		//登入认证接口，根据权限开通socket接口
		socket.on('authentication', async(accessToken)=> {
			try {

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
				let account = await user_db.findOne({'_id': token.payload._id}, {'authority': 1, 'accessToken': 1, 'nickname': 1, 'sex': 1, 'province': 1, 'city': 1, 'country': 1, 'headimgurl': 1,});
				socket.account = account;
				socket.emit('authenticationSuccess', account);


				//根据权限开放接口
				switch (token.payload.authority) {
					case 1:
						console.log('开启一号权限');
						user(socket);
						ossFile(socket);
						break;
				
					default:
						break;
				}
		

			} catch (err) {
				socket.volatile.emit('appError','发生错误');
				console.log(err);
			}


			
			
		});
		
		

		////////////////////////////////////////////////
			///
			///财务接口
			///
		////////////////////////////////////////////////
		// //查询全部建模师或者渲染师的工资单
		// socket.on('GET/finance/employee', Socket_finance.getFinanceEmployee());
		// //根据名字查询建模和渲染的工资详情
		// socket.on('GET/finance/employee/:id', Socket_finance.getFinanceEmployeeId());
		// //查询客户的未结算账单
		// socket.on('GET/finance/customer', Socket_finance.getFinanceCustomer());

		////////////////////////////////////////////////
			///
			///分析接口
			///
		////////////////////////////////////////////////
		// //返回地区统计数据
		// socket.on('get/statistics/regional/image', Socket_statistics.getStatisticsRegionalImage());
		// socket.on('get/statistics/regional/project', Socket_statistics.getStatisticsRegionalProject());
	}
}