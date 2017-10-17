const token = require('../../modules/node-jwt');

module.exports = (socket)=> {
    //token登入
    socket.on('tokenLogin', (data, fu)=>{
        //token验证
		if (data.token) {
			if (token.jwtAuthentication(query.token, secret)) {
				let user = token.jwtParse(query.token);
				socket.name = user.payload.name;
				socket.token = query.token;
			}
		}
    });
    //断开连接
    socket.on('disconnect', (data)=> {
        console.log('a user disconnected:' + socket.id);
    });
}