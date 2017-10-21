

module.exports = ()=> {
    
    let conf = {
        appId: 'wx578ee588948c8fcc',
        appSecret: '88666adf25abd7401bcdb5a42f6565e4',
    }

    Wechat = ()=> {
        this.appId = conf.appId;
        this.appSecret = conf.appSecret;
    }

    /**
     * 根据用户的code获得access_token
     * 
     * @param {应用唯一标识} appId 
     * @param {应用密钥AppSecret} apaSecret 
     * @param {扫码获得的code} code 
     * @returns 返回access_token,refresh_token,expires_in,openid,scope
     */
    Wechat.prototype.getAccessToken = (appId, appSecret, code)=> {
        let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${appSecret}&code=${code}&grant_type=authorization_code`;
        return new Promise ((resolve, reject)=> {
            request(url,(error,response,body)=> {
                if(!error && response.statusCode == 200){
                    resolve(body);
                } else {
                    reject(error);
                }
            });
        });
    }

    /**
     * 
     * 
     * @param {调用凭证} accessToken 
     * @param {普通用户的标识，对当前开发者帐号唯一} openId 
     * @returns 
     */
    Wechat.prototype.getUnionId = (accessToken, openId)=> {
        let url = `https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openId}`;
        return new Promise ((resolve, reject)=> {
            request(url, (error, response, body)=> {
                if(!error && response.statusCode == 200) {
                    resolve(body);
                } else {
                    reject(error);
                }
            });
        });
    }

    return new Wechat();
};