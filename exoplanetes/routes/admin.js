const express = require('express');
const router = express.Router();
const Users = require('../models/Users.js');

router.get('/', (req, res) => {
    if (req.session.admin) {
        res.render('admin.hbs', { listUsers: Users.getAllUsers() });
    } else {
        res.redirect('/users/member');
    }
});

router.post('/desactiver', (req, res) => {
     if(req.session.Admin===false){
        res.redirect('/users/member');
     }else{
     Users.desactiver(req.body.userId);
     console.log(req.body.userId);
     res.redirect('/admin')
     }
});

router.post('/activer', (req, res) => {
    if(req.session.Admin===false){
       res.redirect('/users/member');
    }else{
    Users.activer(req.body.userId);
   res.redirect('/admin')
    }
});

module.exports = router;