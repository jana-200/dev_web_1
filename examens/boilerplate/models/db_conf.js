// file db_conf.js in models

const db = require('better-sqlite3')('./exoplanets.db', { verbose: console.log });

module.exports = db;