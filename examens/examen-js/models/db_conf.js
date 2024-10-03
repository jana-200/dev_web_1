// ============= INUTILE DE MODIFIER CE FICHIER =============

const path = require('path')
const db = require('better-sqlite3')(path.join(__dirname, '../exoplanets.db'), { verbose: console.log });

module.exports = db;