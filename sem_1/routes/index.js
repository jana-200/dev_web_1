const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  let date = new Date();
  let sstring= date.getDate() + "/"+ date.getMonth() +1+ "/"+ date.getFullYear(); 
  let heure= date.getHours()+":"+date.getMinutes()  ;
  res.render('index.hbs', {sstring, heure});
  
});

router.get('/exolunes', (req, res) => {
  let listeExoLunes= [];
  let listeExo1 = { name : "DH Tauri"};
  let listeExo2 = { name : "Kepler-40"};
  let listeExo3 = { name : "WASP-49"};
  listeExoLunes.push(listeExo1, listeExo2, listeExo3)
  res.render('exolunes.hbs', {listeExoLunes});
  
});
router.get('/tele', (req, res) => {
  let liste= [];
  let error="";
  let tele1 = { name : "Gran Telescopio Canarias", pays: "Espagne", diam:"10.4" };
  let tele2 = { name : "Keck 1", pays: "Etats-Unis", diam:"9.8" };
  let tele3 = { name : "Seimei", pays: "Japon", diam:"3.8" };
  
  liste.push(tele1, tele2, tele3)
  if(liste.length<3) error="Il faut au minimum 3 télescopes dans le tableau";
  else error="";
  res.render('tele.hbs', {liste, error});
  
});






module.exports = router;
