const sio = require('../../sio');
const user_db = require('../../service/mongodb/m_uesr');

function notify(uid, notifyContent) {
    await user_db.findByIdAndUpdate(uid, {$push: {notifyContent}});

    //获取通知用户是否离线
    let user = await user_db.findById(uid, {'_id': 1,'socketId': 1, 'state': 1});
    if (user.state) return;
    sio.to(user.socketId).emit('notify');
}

module.exports = notify;