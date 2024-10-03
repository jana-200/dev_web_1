const express = require('express');
const router = express.Router();
const Exolunes=require("../models/Exolunes.js");

router.get('/', (req, res) => {
    const listeExoLunes=Exolunes.list();
    res.render('exolunes.hbs', {listeExoLunes});
});

module.exports = router;