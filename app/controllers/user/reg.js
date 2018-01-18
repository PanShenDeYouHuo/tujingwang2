const wechat = require('../../modules/wechat')();
const token = require('../../modules/node-jwt');
const user_db = require('../../service/mongodb/m_uesr');
const sio = require('../../sio');
console.log('aaa');
console.log(sio)

function Reg() {
    this.name = 'Reg';
}
/**
 * boss级账号注册
 * 
 * @returns 
 */
Reg.prototype.bossWechatReg = ()=> {
    return async(ctx)=> {
        
        //关闭微信登入网页
        let html = `
            <script type="text/javascript">
                self.close()
            </script> 
        `
        
        try {

            //得到此链接的socket
            let socket = sio.sockets.connected[ctx.query.state];
            
            if (!socket) {
                ctx.body = html;
                socket.volatile.emit('appError', '注册发生错误');
                return;
            }
    
            //是否是admin权限
            if(socket.account.authority.indexOf('admin') === -1) {
                ctx.body = html;
                socket.volatile.emit('appError', '注册发生错误');
                return;
            }

            //获取微信信息
            let wxtoken = JSON.parse(await wechat.getAccessToken(wechat.appId, wechat.appSecret, ctx.query.code));
            let wxuser = JSON.parse(await wechat.getUnionId(wxtoken.access_token, wxtoken.openid));

            if(wxtoken.errcode) {
                ctx.body = html;
                socket.volatile.emit('appError', '注册发生错误');
                return console.log(wxtoken);
            }

            //根据unionid查询，用户是否注册过
            let where = {'wechat.unionid': wxuser.unionid};
            let isReg = await user_db.count(where) < 1 ? true : false;

            if(!isReg) {
                ctx.body = html;
                socket.volatile.emit('appError', '此微信已经注册');
                return;
            }

            //注册信息
            let accountInfo = {
                nickname:   wxuser.nickname,
                sex:        wxuser.sex,
                province:   wxuser.province,
                city:       wxuser.city,
                country:    wxuser.country,
                headimgurl: wxuser.headimgurl,
                authority: ['boss'],
                wechat: {
                    accessToken: wxtoken.access_token,
                    refreshToken: wxtoken.refresh_token,
                    unionid: wxuser.unionid
                }
            };
            await user_db.inset(accountInfo);

            //注册成功
            ctx.body = html;
            socket.volatile.emit('bossWechatRegSuccess', '注册成功');

        } catch (error) {
            ctx.body = html;
            sio.to(ctx.query.state).volatile.emit('appError','注册发生错误');
            console.log(error);
        }
    }
}

/**
 * 员工账号注册
 * 
 * @returns 
 */
Reg.prototype.staffWechatReg = ()=> {
    return async(ctx)=> {

        //关闭微信登入网页
        let html = `
            <script type="text/javascript">
                self.close()
            </script> 
        `
        
        try {

            //得到此链接的socket
            let socket = sio.sockets.connected[ctx.query.state];
            
            if (!socket) {
                ctx.body = html;
                socket.volatile.emit('appError', '注册发生错误');
                return;
            }

            //是否是boss权限
            if(socket.account.authority.indexOf('boss') === -1) {
                ctx.body = html;
                socket.volatile.emit('appError', '注册发生错误');
                return;
            }

            //获取微信信息
            let wxtoken = JSON.parse(await wechat.getAccessToken(wechat.appId, wechat.appSecret, ctx.query.code));
            let wxuser = JSON.parse(await wechat.getUnionId(wxtoken.access_token, wxtoken.openid));

            if(wxtoken.errcode) {
                ctx.body = html;
                socket.volatile.emit('appError', '注册发生错误');
                return console.log(wxtoken);
            }

            //根据unionid查询，用户是否注册过
            let where = {'wechat.unionid': wxuser.unionid};
            let isReg = await user_db.count(where) < 1 ? true : false;

            if(!isReg) {
                ctx.body = html;
                socket.volatile.emit('appError', '此微信已经注册');
                return;
            }

            //注册信息
            let accountInfo = {
                'company.bossId':    socket.account._id,
                nickname:   wxuser.nickname,
                sex:        wxuser.sex,
                province:   wxuser.province,
                city:       wxuser.city,
                country:    wxuser.country,
                headimgurl: wxuser.headimgurl,
                 wechat: {
                    accessToken: wxtoken.access_token,
                    refreshToken: wxtoken.refresh_token,
                    unionid: wxuser.unionid
                }
            };
            await user_db.inset(accountInfo);

            //注册成功
            ctx.body = html;
            socket.volatile.emit('staffWechatRegSuccess', '注册成功');

        } catch (error) {
            ctx.body = html;
            sio.to(ctx.query.state).volatile.emit('appError','注册发生错误');
            console.log(error);
        }
    }
}

module.exports = new Reg();
