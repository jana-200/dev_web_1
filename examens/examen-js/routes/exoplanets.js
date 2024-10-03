const express = require('express');
const router = express.Router();

const Exoplanet = require('../models/Exoplanet.js');


/* GET exoplanets index. */
router.get('/', (req, res, next) => {
  res.render('exoplanets/index', { exoplanetsTable: Exoplanet.list() });
});

/* POST add exoplanet. */
router.post('/add', (req, res, next) => {
  console.log("POST ADD EXOPLANET");
  Exoplanet.save({
    uniqueName: req.body.uniqueNameExoplanet,
    hClass: req.body.hClassExoplanet,
    discoveryYear: req.body.discoveryYearExoplanet
  });
  res.redirect('/exoplanets');
});

/* GET search exoplanet. */
router.get('/search', (req, res, next) => {
  let exoplanetsTable = null;
  let min3Char = false;
  console.log("GET SEARCH EXOPLANET");
  const uniqueNameExoplanetParam = req.query.uniqueNameExoplanet;
  if (uniqueNameExoplanetParam.length >= 3) {
    min3Char = true;
    exoplanetsTable = Exoplanet.search(uniqueNameExoplanetParam);
  }
  res.render('exoplanets/index', { exoplanetsTable, min3Char });
});

router.post('/delete', (req, res, next) => {
  console.log("id Exoplanète à supprimer : " + req.body.id);
  Exoplanet.delete(req.body.id);
  res.redirect('/exoplanets');
});


router.post('/update/index', (req, res, next) => {
  console.log("id exoplanet : " + req.body.id);
  results = Exoplanet.find(req.body.id);
  res.render('exoplanets/indexUpdate', { exoplanet: results });
});

router.post('/update', (req, res, next) => {
  console.log("POST UPDATE EXOPLANET");
  Exoplanet.save({
    id: req.body.id,
    uniqueName: req.body.uniqueNameExoplanet,
    hClass: req.body.hClassExoplanet,
    discoveryYear: req.body.discoveryYearExoplanet
  });
  res.redirect('/exoplanets');
});

// ============= Si vous devez ajouter du code, écrivez le ci-dessous =============

router.get('/list', (req, res, next) => {
  let boo=false;
  const tablehClass=["Mésoplanète","Psychroplanète", "Thermoplanète", "Hypopsychroplanète","Non Habitable"];
  const hClass=req.query.hClass;
  let found ;
  if(hClass){ 
    for(let hc of tablehClass){ 
      if(hClass.toLocaleLowerCase()===hc.toLocaleLowerCase()){ 
        found=hc;
        break;
      }
    }
  }
  if(found){ 
    res.render('exop.hbs', { exoplanetsTable: Exoplanet.hClass(hClass)});
  }
  else{ 
    boo=true;
    res.render('hClass_select.hbs',{boo});
  }

});

router.get('/select-hclass', (req, res, next) => {
  res.render('hClass_select.hbs');
});

router.get('/select', (req, res, next) => {
  const hClass=req.query.hClassExoplanet;
  res.redirect('/exoplanets/list?hClass='+ hClass);
});

router.post('/toutSup',  (req, res, next) => {
  const table=Exoplanet.list();
  for(let exop of table ){ 
    Exoplanet.delete(exop.exoplanet_id);
  }
  res.redirect('/exoplanetss');
});
module.exports = router;