const express = require('express');
const router = express.Router();


const messagesTable = [];



/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    exoplanetsTable: ['Trappist-1-d', 'Trappist-1-e', 'Trappist-1-f', 'Trappist-1-g']
  });
});

/* GET forum. */
router.get('/forum', (req, res, next) => {
  res.render('indexForum', { messagesTable });
});

/* POST add forum. */
router.post('/forum/add', (req, res, next) => {
  console.log("POST ADD FORUM");
  messagesTable.push({ message: req.body.message, author: req.body.author });
  res.redirect('/forum');
});

// ============= Si vous devez ajouter du code, écrivez le ci-dessous =============



module.exports = router;
