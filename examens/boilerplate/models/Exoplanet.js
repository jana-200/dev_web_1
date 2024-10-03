const db = require('../models/db_conf');


module.exports.list = () => {
    return db.prepare("SELECT * FROM exoplanets").all();
};

module.exports.save = (data) => {
    console.log("SAVE :" + JSON.stringify(data));
    //no id => add exoplanet
    if (data.id === undefined) {
        const stmt = db.prepare('INSERT INTO EXOPLANETS(unique_name, hclass, discovery_year, image) VALUES (?, ?, ?, ?)');
        const info = stmt.run(data.uniqueName, data.hClass, data.discoveryYear, data.image);
        console.log("exoplanet model save" + info.changes);
    }
    // id => update exoplanet
    else {
        const stmt = db.prepare('UPDATE EXOPLANETS SET unique_name = ?, hclass = ?, discovery_year = ?, ist = ?, pclass = ? WHERE exoplanet_id = ?');
        const info = stmt.run(data.uniqueName, data.hClass, data.discoveryYear, data.IST, data.pClass, data.id);
        console.log("exoplanet model save update" + info.changes);

    }

};

module.exports.search = (uniqueName) => {
    // LIKE is already case insensitive
    return db.prepare('SELECT * FROM EXOPLANETS WHERE unique_name LIKE ?').all(uniqueName + '%');
};

module.exports.delete = (id) => {
    const info = db.prepare('DELETE FROM EXOPLANETS WHERE exoplanet_id = ?').run(id);
    console.log("exoplanet model delete" + info.changes);
};

module.exports.findById = (id) => {
    return db.prepare("SELECT * FROM exoplanets WHERE exoplanet_id = ?").get(id);
};

module.exports.searchByHclass = (hclass) => {
    return db.prepare('SELECT * FROM EXOPLANETS WHERE hclass = ?').all(hclass);
}

module.exports.searchByYear = (year) => {
    return db.prepare('SELECT * FROM EXOPLANETS WHERE discovery_year = ?').all(year);
}

module.exports.countPerYear=(year)=>{ 
    return db.prepare('SELECT COUNT(*) as count FROM EXOPLANETS WHERE discovery_year = ?').get(year);
}

module.exports.sort=(sortBy)=>{ 
    if(sortBy=="Alphabetique")
        return db.prepare('SELECT * FROM exoplanets ORDER BY unique_name ASC').all();
    else return db.prepare('SELECT * FROM exoplanets ORDER BY discovery_year').all();
}