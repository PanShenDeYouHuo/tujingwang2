const user_db = require('../../service/mongodb/m_uesr');

function Reg() {
    this.name = 'Reg';
}

Reg.prototype.wechat = (token, user)=> {
    
}

module.exports = new Reg();