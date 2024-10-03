const db = require('better-sqlite3')('C:/HE Vinci/BD/exoplanetes.bd', { verbose: console.log });
module.exports = db;