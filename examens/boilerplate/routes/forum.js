const express = require('express');
const router = express.Router();

const Message = require('../models/Message.js');
const User= require('../models/User.js');

/* GET forum. */
router.get('/', function (req, res, next) {
    if(req.session.login==undefined)
        res.redirect('/users');
    else res.render('forum/index.hbs', { messagesTable: Message.list(), error: req.query.error });
});


/* POST add forum. */
router.post('/add', function (req, res, next) {
    console.log("POST ADD FORUM");
    const name=User.find(req.session.login).name; 
    if(req.body.message==''){ 
        res.redirect('/forum?error=Le message ne peut pas être vide');
    }
    
    else Message.save({ message: req.body.message, author: name });
    res.redirect('/forum');
});

/* POST like message */
router.post('/like', function (req, res, next) {
    console.log("LIKE MESSAGE FORUM");
    Message.like(req.body.id);
    res.redirect('/forum');
});

module.exports = router;