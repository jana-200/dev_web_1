const express = require('express');
const router = express.Router();
const Forum=require("../models/Forum.js");


router.get('/', function (req, res, next) {
    const listeCom=Forum.list();
    res.render('forum.hbs', {listeCom});
  });
  
  router.post('/add', function (req, res, next){
    const message= req.body.message;
    const auteur= req.body.auteur;
    Forum.add(message,auteur);
    res.redirect('/forum');
  });

  router.post('/like', function (req, res, next){
    const listeCom= Forum.list();
    Forum.like(req.body.id);
    res.render('forum.hbs',{listeCom});
  });


  module.exports = router;