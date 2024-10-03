const express = require('express');
const session = require('express-session');
const router = express.Router();
const Users=require("../models/Users.js");
const { table } = require('../models/Db_conf.js');
const validator= require('validator');

const bcrypt=require('bcrypt');
const saltRounds=10;


router.get('/', function (req, res, next){
    if(req.session.name){ 
        res.redirect('/users/member');
    } 
    res.render('user.hbs');

});


router.post('/login', (req, res, next) => {
    const userFound = Users.find(req.body.name);
    if (userFound) { 
        if(!userFound.actif){ 
            req.session.errors = "compte désactivé";
            res.redirect("/users");
        }
        else if (bcrypt.compareSync(req.body.password, userFound.password)) {
            req.session.name = req.body.name;
            req.session.connected = true;
            req.session.admin=userFound.admin;
            res.redirect('/users/member');
        } else {
            req.session.errors = "Mot de passe incorrect";
            res.redirect("/users");
        }
    } else {
        req.session.errors = "Utilisateur inconnu";
        res.redirect("/users");
    }
});

router.post('/logout', function (req, res, next){
    req.session.destroy();
    res.redirect("/users");
});

router.get('/register', (req, res)=>{
    res.render('register.hbs');
});

router.post('/add', function (req, res, next){
    let yes=false;
    let errors=[];
    if(req.body.name.length<3){ 
        errors.push("Le nom doit avoir 3 caractères au minimum");
        yes=true;
    }
    if(req.body.prenom.length<3){ 
        errors.push("Le prénom doit avoir 3 caractères au minimum");
        yes=true;
    }
    if(!validator.isAlphanumeric(req.body.name)){ 
        errors.push("Le nom doit contenir uniquement des caractères alphanumériques");
        yes=true;
    }
    if(!validator.isAlphanumeric(req.body.prenom)){ 
        errors.push("Le prénom doit contenir uniquement des caractères alphanumériques");
        yes=true;
    }
    if(!validator.isEmail(req.body.email)){ 
        errors.push("L’email doit être un email correct");
        yes=true;
    }
    if(req.body.password.length<=2){ 
        errors.push("Le mot de passe doit être un mot de passe fort");
        yes=true;
    }
    if(req.body.password!==req.body.conf){ 
        errors.push("le mot de passe et sa confirmation ne sont pas identiques");
        yes=true;
    }
    if(yes){ 
        res.render('register.hbs',{errors,yes})
    }
    else{ 
        Users.add({
        name: req.body.name,
        firstname: req.body.prenom,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, saltRounds)});
        res.redirect("/users");
    }
});

router.get('/member', (req, res, next) => {
    if (req.session.name) {
        const users = Users.find(req.session.name);
        res.render('membre.hbs', { users });
    }
    else { 
        res.redirect('/users');
    }
});

module.exports = router;