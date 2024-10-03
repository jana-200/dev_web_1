const listeExoLunes= [];
const listeExo1 = { name : "DH Tauri"};
const listeExo2 = { name : "Kepler-40"};
const listeExo3 = { name : "WASP-49"};
listeExoLunes.push(listeExo1, listeExo2, listeExo3);

module.exports.list = ()=>{ 
    return listeExoLunes;
};