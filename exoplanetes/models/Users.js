const db = require('../models/Db_conf.js'); 

module.exports.list = () => {
    const stmt_all = db.prepare("SELECT * FROM users");
    return stmt_all.all();
};

module.exports.add = (data) => { 
    const stmt = db.prepare('INSERT INTO users(user_name, firstname, email, password) VALUES (?, ?, ?, ?)');
    const info = stmt.run(data.name, data.firstname, data.email, data.password);
    console.log("user model save member" + info.changes);
};

module.exports.find = (user_name) => {
    const stmt = db.prepare('SELECT * FROM users WHERE user_name = ?');
    // get -> only one record
    return stmt.get(user_name);
}

module.exports.getAllUsers = () => {
    const stmt_all = db.prepare("SELECT * FROM users ");
    return stmt_all.all();
};

module.exports.desactiver = (userId) => {
    const stmt_all = db.prepare('UPDATE users SET actif=0  WHERE user_id= ?');
    return stmt_all.run(userId);
};

module.exports.activer = (userId) => {
    const stmt = db.prepare('UPDATE users SET actif=1 WHERE user_id= ?');
    return stmt.run(userId);
};