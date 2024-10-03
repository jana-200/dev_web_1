const db = require('../models/db_conf');

module.exports.list = () => db.prepare("SELECT * FROM EXOPLANETS").all();

module.exports.save = (data) => {
  if (data.id) {
    const stmt = db.prepare('UPDATE EXOPLANETS SET unique_name = ?, hclass = ?, discovery_year = ? WHERE exoplanet_id = ?');
    const info = stmt.run(data.uniqueName, data.hClass, data.discoveryYear, data.id);
    console.log("exoplanet model save update" + info.changes);
  } else {
    const stmt = db.prepare('INSERT INTO EXOPLANETS(unique_name, hclass, discovery_year) VALUES (?, ?, ?)');
    const info = stmt.run(data.uniqueName, data.hClass, data.discoveryYear);
    console.log("exoplanet model save insert" + info.changes);
  }
};

module.exports.search = (uniqueName) => {
  return db.prepare('SELECT * FROM EXOPLANETS WHERE unique_name LIKE ?').all(uniqueName + '%');
};

module.exports.delete = (id) => {
  const info = db.prepare('DELETE FROM EXOPLANETS WHERE exoplanet_id = ?').run(id);
  console.log("exoplanet model delete" + info.changes);
};


module.exports.find = (id) => db.prepare('SELECT * FROM EXOPLANETS WHERE exoplanet_id = ?').get(id);

// ============= Si vous devez ajouter du code, écrivez le ci-dessous =============




