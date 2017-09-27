

const Crypto = require('crypto');

function Jwt() {

	/**
	 * utf8字符串转base64字符串
	 * @param  {[string]} utf [utf8编码字符串]
	 * @return {[string]}     [base64编码字符串]
	 */
	this.utob = (utf)=> {
		let buf = new Buffer(utf);
		return buf.toString('base64');
	}

	/**
	 * base64字符串转utf8字符串
	 * @param  {[string]} base [base64编码字符串]
	 * @return {[string]}      [utf8编码字符串]
	 */
	this.btou = (base)=> {
		let buf = new Buffer(base, 'base64');
		return buf.toString();
	}

	/**
	 * hmac签名
	 * @param  {[string]} algorithm [加密算法]
	 * @param  {[string]} data      [加密内容]
	 * @param  {[string]} secret    [加密密码]
	 * @return {[string]}           [base64编码字符串]
	 */
	this.encryptHmac = (algorithm, data, secret)=> {
		return Crypto.createHmac(algorithm, secret)
					.update(data)
					.digest('base64');
	}

	/**
	 * 进行签名生成token
	 * @param  {[string]} header  [header 部分主要是两部分内容，一个是 Token 的类型，另一个是使用的算法，比如下面类型就是 JWT，使用的算法是 HS256。]
	 * @param  {[string]} payload [Payload 里面是 Token 的具体内容	iss：Issuer，发行者
																	sub：Subject，主题
																	aud：Audience，观众
																	exp：Expiration time，过期时间
																	nbf：Not before
																	iat：Issued at，发行时间
																	jti：JWT ID]
	 * @param  {[string]} secret  [加密密码]
	 * @return {[object]}         [返回对象一个是token，一个是signature]
	 */
	this.jwtSignature = (header, payload, secret)=> {
		let encodeStr = this.utob(header)+'.'+ this.utob(payload);
		let signature = this.encryptHmac('sha256', encodeStr, secret);
		return encodeStr+'.'+signature;
	}

	/**
	 * 对token签名进行验证
	 * @param  {[string]} token  [需要验证的token]
	 * @param  {[string]} secret [加密密码]
	 * @return {[boolean]}       [返回boolean判断验证结果]
	 */
	this.jwtAuthentication = (token, secret)=> {
		let tokenArray = token.split('.');
		let encodeStr = tokenArray[0]+'.'+tokenArray[1];
		let signature = this.encryptHmac('sha256', encodeStr, secret);
		if(tokenArray[2] === signature){
			return true;
		}else{
			return false;
		}
	}

	/**
	 * 对token进行解析得到信息
	 * @param  {[string]} token [token]
	 * @return {[object]}       [返回token的object格式]
	 */
	this.jwtParse = (token)=> {
		let tokenArray = token.split('.');
		let header = JSON.parse(this.btou(tokenArray[0]));
		let payload = JSON.parse(this.btou(tokenArray[1]));
		return {header, payload};
	}

}

module.exports = new Jwt();

// let header = {
// 	typ: "JWT",
// 	alg: "HS256"
// }

// let payload = {
// 	iss: "pan.com",
// 	exp: "1438956778",
// 	name: "user name",
// 	accessAuthority: 1
// }

// let a = new Jwt();
// let res = a.jwtSignature(JSON.stringify(header), JSON.stringify(payload), 'hello world');
// console.log(res);
// console.log(a.jwtAuthentication(res.token, 'hello world'));
// console.log(a.jwtParse(res.token));