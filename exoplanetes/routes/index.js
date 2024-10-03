const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', (req, res) => {
  const date = new Date();
  const sstring= date.getDate() + "/"+ date.getMonth()+1 + "/"+ date.getFullYear(); 
  const heure= date.getHours()+":"+date.getMinutes();
  res.render('index.hbs', {sstring, heure});
  
});

router.get('/tele', (req, res) => {
  const liste= [];
  let error="";
  const tele1 = { name : "Gran Telescopio Canarias", pays: "Espagne", diam:"10.4" };
  const tele2 = { name : "Keck 1", pays: "Etats-Unis", diam:"9.8" };
  const tele3 = { name : "Seimei", pays: "Japon", diam:"3.8" };
  
  liste.push(tele1, tele2, tele3);
  if(liste.length<3) error="Il faut au minimum 3 télescopes dans le tableau";
  else error="";
  res.render('tele.hbs', {liste, error});
  
});

module.exports = router;