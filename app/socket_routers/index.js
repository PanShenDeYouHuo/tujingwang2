const Socket_finance = require('../controllers/socket_finance');
const Socket_statistics = require('../controllers/socket_statistics');

module.exports = function() {
	return (socket)=> {
		//登入成功返回token和用户信息
		socket.emit('loginOk', {token:socket.token, name: socket.name});

		//断开连接
		socket.on('disconnect', (data)=> {
			console.log('a user disconnected:' + socket.id);
		});

		////////////////////////////////////////////////
			///
			///财务接口
			///
		////////////////////////////////////////////////
		//查询全部建模师或者渲染师的工资单
		socket.on('GET/finance/employee', Socket_finance.getFinanceEmployee());
		//根据名字查询建模和渲染的工资详情
		socket.on('GET/finance/employee/:id', Socket_finance.getFinanceEmployeeId());
		//查询客户的未结算账单
		socket.on('GET/finance/customer', Socket_finance.getFinanceCustomer());

		////////////////////////////////////////////////
			///
			///分析接口
			///
		////////////////////////////////////////////////
		//返回地区统计数据
		socket.on('get/statistics/regional/image', Socket_statistics.getStatisticsRegionalImage());
		socket.on('get/statistics/regional/project', Socket_statistics.getStatisticsRegionalProject());
	}
}