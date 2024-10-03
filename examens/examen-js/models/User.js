
const db = require('../models/db_conf');

module.exports.save = (data) => {
    console.log(data);
    const stmt = db.prepare('INSERT INTO MEMBERS(name, firstname, email, password) VALUES (?, ?, ?, ?)');
    const info = stmt.run(data.name, data.firstname, data.email, data.password);
    console.log("user model save member" + info.changes);
}


module.exports.find = (email) => {
    console.log(email);
    return db.prepare('SELECT * FROM MEMBERS WHERE email = ?').get(email);
}

// ============= Si vous devez ajouter du code, écrivez le ci-dessous =============


