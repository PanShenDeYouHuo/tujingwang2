const token = require('../../modules/node-jwt');
const Employee_mongodb = require('../mongodb_modules/m_employee');

//账号状态和密码验证
function verification(res, password) {
	return new Promise((resolve, reject)=> {
		if (!res) return reject('账号错误');
		if (res.state == 1) return reject('用户已经登入');
		if (res.password !== password) return reject('密码错误');

		return resolve(res);
	});
}

module.exports = function (secret) {
	return (socket, next) => {
		let query = socket.handshake.query;

		//token验证
		if (query.token) {
			if (token.jwtAuthentication(query.token, secret)) {
				let user = token.jwtParse(query.token);
				console.log(` ${user.payload.name} token验证通过`);
				socket.name = user.payload.name;
				socket.token = query.token;
				return next();
			}
			return next(new Error(`登入过期`));
		}
		//账号验证
		else if (query.account && query.password) {
			console.log(`账号:${query.account},密码:${query.password}`);

			Employee_mongodb.getEmployeeOne({mobilePhoneNumber: query.account})
				.then((res)=> {
					return verification(res, query.password);
				})
				.then((res)=> {
					let header = {
						typ: "JWT",
						alg: "HS256"
					};
					let payload = {
						iss: "pan.com",
						exp: "1438956778",
						name: res.name,
						accessAuthority: 1
					};
					socket.name = res.name;
					socket.token = token.jwtSignature(JSON.stringify(header), JSON.stringify(payload), secret); //生成token，挂在到socket上
					return next();
				})
				.catch((err)=> {
					return next(new Error(err));
				});
		}
		//错误的链接
		else {
			return next(new Error(`登入错误`));
		}

	}
}