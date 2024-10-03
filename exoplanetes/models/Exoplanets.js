const db = require('../models/Db_conf.js'); 


/* exoplanetes */
module.exports.list = () => {
    const stmt_all = db.prepare("SELECT * FROM liste2");
    return stmt_all.all();
};

module.exports.add = (name,classe,year,image) => { 
    const stmt_insert = db.prepare('INSERT INTO liste2 (name, classe, year,image) VALUES (?, ?, ?, ?)');
    //run -> return infos about changes made
  const info = stmt_insert.run(name, classe, year,image);
};

module.exports.finById = (id) => { 
    const stmt_one = db.prepare("SELECT * FROM liste2 u WHERE u.id=?");
    // get(2) -> return one row where u.id=2 in an object like below
    // {id:2, name:'user2', pseudo:'stef'}
    return stmt_one.get(id);
};

module.exports.search = (recherche) => {
    const stmt_all = db.prepare("SELECT * FROM liste2 WHERE LOWER(name) LIKE LOWER('"+recherche+"%')");
    return stmt_all.all();
};

module.exports.change = (id,name,classe,year) => {
    const stmt_all = db.prepare(" UPDATE liste2 SET name='"+name+"', classe='"+classe+"', year='"+year+"' WHERE id='"+id+"'");
    return stmt_all.run();
};

module.exports.supp = (id) => {
    const stmt_all = db.prepare(" DELETE FROM liste2 WHERE id='"+id+"'");
    return stmt_all.run();
};

