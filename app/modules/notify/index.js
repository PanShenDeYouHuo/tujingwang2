const user_db = require('../../service/mongodb/m_uesr');

notify = async(uid, notifyContent)=> {

    let res = await user_db.findByIdAndUpdate(uid, {$push: {notify: notifyContent}});
    //获取通知用户是否离线
    let user = await user_db.findById(uid, {'_id': 1,'socketId': 1, 'state': 1});
    if (!user.state) return;
    const sio = require('../../sio');
    sio.to(user.socketId).emit('notify');
    // sio.to(admin.socketId).volatile.emit('notify');
}

module.exports = notify;