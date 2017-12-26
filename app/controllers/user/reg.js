const wechat = require('../../modules/wechat')();
const token = require('../../modules/node-jwt');
const user_db = require('../../service/mongodb/m_uesr');
const sio = require('../../sio');

function Reg() {
    this.name = 'Reg';
}

Reg.prototype.bossWechatReg = ()=> {
    return async(ctx)=> {

        let namespace = sio.to(ctx.query.state);
        
        for( let i in namespace.connected) {
            console.log(i);
        }

        // console.log(Object.keys(namespace.connected)); 
        // console.log(namespace.connected[0]); 

        // console.log(namespace.connected[0].Socket.account);
        //关闭微信登入网页
        let html = `
            <script type="text/javascript">
                self.close()
            </script> 
        `
        try {
            let wxtoken = JSON.parse(await wechat.getAccessToken(wechat.appId, wechat.appSecret, ctx.query.code));
            let wxuser = JSON.parse(await wechat.getUnionId(wxtoken.access_token, wxtoken.openid));

            if(wxtoken.errcode) {
                ctx.body = html;
                sio.to(ctx.query.state).emit('appError', '注册发生错误');
                return console.log(wxtoken);
            }

            //根据unionid查询，用户是否注册
            let where = {'wechat.unionid': wxuser.unionid};
            let isReg = await user_db.count(where) < 1 ? true : false;

            if(!isReg) {
                ctx.body = html;
                sio.to(ctx.query.state).emit('appError', '此微信已经注册');
                return;
            }

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
            sio.to(ctx.query.state).emit('bossWechatRegSuccess','注册成功');

        } catch (error) {
            ctx.body = html;
            sio.to(ctx.query.state).emit('appError','注册发生错误');
            console.log(error);
        }
    }
}


Reg.prototype.employeeWechatReg = ()=> {
    return async(ctx)=> {
        //关闭微信登入网页
        let html = `
            <script type="text/javascript">
                self.close()
            </script> 
        `
        try {
            let wxtoken = JSON.parse(await wechat.getAccessToken(wechat.appId, wechat.appSecret, ctx.query.code));
            let wxuser = JSON.parse(await wechat.getUnionId(wxtoken.access_token, wxtoken.openid));

            if(wxtoken.errcode) {
                ctx.body = html;
                sio.to(ctx.query.state).emit('appError', '注册发生错误');
                return console.log(wxtoken);
            }

            //根据unionid查询，用户是否注册
            let where = {'wechat.unionid': wxuser.unionid};
            let isReg = await user_db.count(where) < 1 ? true : false;

            if(!isReg) {
                ctx.body = html;
                sio.to(ctx.query.state).emit('appError', '此微信已经注册');
                return console.log(wxtoken);
            }

            let accountInfo = {
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
            sio.to(ctx.query.state).emit('employeeWechatRegSuccess','注册成功');

        } catch (error) {
            ctx.body = html;
            sio.to(ctx.query.state).emit('appError','注册发生错误');
            console.log(error);
        }
    }
}

module.exports = new Reg();


// { KVNwrrpE0FEt51WIAAAA: 
//     Socket { 
//         nsp: Namespace {name: '/',server: [Object],sockets: [Object],connected: [Object],fns: [],ids: 0,rooms: [Array],flags: {},adapter: [Object],_events: [Object],_eventsCount: 1 },
//         server: Server {nsps: [Object],_path: '/socket.io',_serveClient: true,parser: [Object],encoder: Encoder {}, _adapter: [Function: Adapter],_origins: '*:*',sockets: [Object],eio: [Object],httpServer: [Object],engine: [Object] },
//         adapter: Adapter {nsp: [Object],rooms: [Object],sids: [Object],encoder: Encoder {} },
//         id: 'KVNwrrpE0FEt51WIAAAA',
//         client: Client {server: [Object],conn: [Object],encoder: Encoder {},decoder: [Object],id: 'KVNwrrpE0FEt51WIAAAA',request: [Object],onclose: [Function: bound ],ondata: [Function: bound ],onerror: [Function: bound ],ondecoded: [Function: bound ],sockets: [Object],nsps: [Object],connectBuffer: [] },
//         conn: Socket {id: 'KVNwrrpE0FEt51WIAAAA',server: [Object],upgrading: false,upgraded: false,readyState: 'open',writeBuffer: [],packetsFn: [],sentCallbackFn: [],cleanupFn: [Array],request: [Object],remoteAddress: '::ffff:118.250.126.238',checkIntervalTimer: null,upgradeTimeoutTimer: null,pingTimeoutTimer: [Object],transport: [Object],_events: [Object],_eventsCount: 3 },
//         rooms: { KVNwrrpE0FEt51WIAAAA: 'KVNwrrpE0FEt51WIAAAA' },
//         acks: {},
//         connected: true,
//         disconnected: false,
//         handshake: { headers: [Object],time: 'Tue Dec 26 2017 08:33:27 GMT+0000 (UTC)',address: '::ffff:118.250.126.238',xdomain: true,secure: false,issued: 1514277207424,url: '/socket.io/?EIO=3&transport=websocket',query: [Object] },
//         fns: [],
//         flags: {},
//         _rooms: [],
//         _events: { disconnect: [Function],authentication: [AsyncFunction],postBossAccount: [AsyncFunction],putBossAccount: [AsyncFunction],deleteBossAccount: [AsyncFunction],tokenLogin: [Function],postProject: [AsyncFunction],getProject: [AsyncFunction],getProjects: [AsyncFunction],putProject: [AsyncFunction],getReadStsToken: [AsyncFunction],getWriteStsToken: [AsyncFunction] },
//         _eventsCount: 12,
//         account: { _id: 5a3c987c8b10af001b53511b,nickname: 'pan',sex: 1,province: 'Zhejiang',city: 'Taizhou',country: 'CN',headimgurl: 'http://wx.qlogo.cn/mmopen/vi_32/L8mzhKNSy7Yv3zdicIWYWFiayQXX26owVXbsfVKu7K27jWyPSZMia6IngNIW67pgUxwul3Gzwn9H0sE3xazPfyzVg/0',accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjbG91ZC50dWppbmd3YW5nLmNvbSIsImV4cCI6MTUxMzkyMzQxNTU2NywiX2lkIjoiNWEzYzk4N2M4YjEwYWYwMDFiNTM1MTFiIiwiYXV0aG9yaXR5IjpbImFkbWluIl19.gkA9A0Cny8PoMQlPCDPXKGbZ8sBcCBGbjjzLfDHy1cQ=',authority: [Array] } 
//     } 
// }