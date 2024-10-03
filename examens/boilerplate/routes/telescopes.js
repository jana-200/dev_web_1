const express = require('express');
const router = express.Router();

const Telescope = require('../models/Telescope.js');


router.get('/', function (req, res, next) {
    
    res.render('telescopes.hbs', { telescopesTable: Telescope.list()});
});

module.exports = router;