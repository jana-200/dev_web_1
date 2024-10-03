const express = require('express');
const router = express.Router();

const Exoplanets=require("../models/Exoplanets.js");
const { table } = require('../models/Db_conf.js');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        const date = new Date();
        const uniquePrefix = date.getFullYear() + '-' + (date.getMonth() + 1) + 
        '-' + date.getDate() + '-' + date.getHours() + '-' + date.getMinutes() + 
        '-' + date.getSeconds();
        cb(null, uniquePrefix + '-' + file.originalname);
    }
})
const upload = multer({ storage: storage });

const validator= require('validator');

/* exoplanetes */

function isNumber(value) {
  return !isNaN(value);
}

router.get('/', function (req, res, next){
    const liste2=Exoplanets.list();
  res.render('exoplanetes.hbs', {liste2, errors :req.session.errors});
  req.session.errors=null;
});

router.get('/details', (req, res) => { 
  const liste1=[];
  let no="";
  let po="";

  const el=Exoplanets.finById(req.query.id);

  if(!isNumber(req.query.id)){ 
    no="it's not a number";
  }

  else{
    if(el==null){ 
    po="Aucune Exoplanète correspondante à cet ID !";
  } else liste1.push(el);
  }
  
  res.render('details.hbs', {liste1,no,po});
  
}); 

router.post('/add',upload.single('image'), function (req, res, next) {
  if(req.body.name.length<3 ||req.body.name.length>100 ){ 
    req.session.errors="le nom doit contenir min 3 caractères et max 100";
    res.redirect('/exoplanetes')
  }else{ 
     let name= req.body.name;
  let classe= req.body.classe;
  let year= req.body.date;
  let image=null;
  if(req.file!==undefined){ 
    image="/images/"+req.file.filename;

  }
  Exoplanets.add(name,classe,year,image);

  res.redirect('/exoplanetes');
  }
});

router.get('/search', (req, res) => {
  let val=null;
  let phrase="";
  const liste2=Exoplanets.list();
  if(req.query.name.length<3){
    phrase="non trouvé";
  } else {
    val=Exoplanets.search(req.query.name);
    console.table(val);
    if(val==null ||	val.length==0 ){
      phrase = "non trouvé"; 
    }
  }
  res.render('exoplanetes.hbs', {phrase, liste2:val});
});

router.post('/id', (req, res) => {
  const id=req.body.id;
  res.render('change.hbs',{id});
});

router.post('/change', (req, res) => {
  const id=req.body.id;
  const name=req.body.name;
  const classe=req.body.classe;
  const year=req.body.year;
  console.log(id,name,classe,year);
  Exoplanets.change(id,name,classe,year);
  const liste2=Exoplanets.list();
  res.render('exoplanetes.hbs',{id, liste2});
});

router.post('/supp', (req, res) => {
  const id=req.body.id;
  Exoplanets.supp(id);
  const liste2=Exoplanets.list();
  res.redirect('/exoplanetes');
});


router.get('/filter', function (req, res) {
  const liste2=Exoplanets.list();
  const filter = req.query.filter;
  let newTable = [];
  if (filter === "hclass") {
    for (const exop of liste2) {
      if (exop.classe === req.query.classe) {
        newTable.push(exop);
      }
    }
  }
  if (filter === "année") {
    for (const exop of liste2) {
      const annee = parseInt(req.query.year);
      if (exop.year === annee) {
        newTable.push(exop);
      }
    }
  }
  res.render('exoplanetes.hbs', { liste2: newTable });
});


module.exports = router;