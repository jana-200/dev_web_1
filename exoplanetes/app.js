const express = require('express');
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const hbs = require('hbs');

const session = require('express-session');

/**
 * The {{#exists}} helper checks if a variable is defined.
 */
hbs.registerHelper('exists', function (variable, options) {
  if (typeof variable !== 'undefined') {
    return options.fn(this);
  }
  else {
    // options.inverse == else block
    return options.inverse(this);
  }
});

/**
 * eq checks if value are equal
 */
hbs.registerHelper('eq', function (a, b) {
  if (a === b) {
    return true;
  }
  else {
    return false;
  }
});

// TODO Exigez vos contrôleurs ici
const indexRouter = require("./routes/index.js");
const exoplanetesRouter = require("./routes/exoplanetes.js");
const forumRouter = require("./routes/forum.js");
const exolunesRouter = require("./routes/exolunes.js");
const userRouter = require("./routes/users.js");
const adminRouter = require("./routes/admin.js");



const app = express();
const port = 3000;

// Configuration du dossier des vues et du moteur du guidon
app.set('views', path.join(__dirname, 'views'));
app.set('afficher le moteur', 'hbs');

app.use(logger('dev')); // Enregistre chaque requête
app.use(express.urlencoded({ extended: false })); // Décoder les valeurs du formulaire
app.use(express.static(path.join(__dirname, 'public'))); // Récupère les fichiers statiques du dossier public

// use of sessions
// YOU MUST ADD THESES LINES BEFORE APP.USE ROUTERS !
app.use(session({secret: "Your secret key", resave: false, saveUninitialized:false}));
// use of session variables in views via res.locals
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});


// TODO Appelez vos contrôleurs ici
app.use("/", indexRouter);
app.use("/exoplanetes", exoplanetesRouter);
app.use("/forum", forumRouter);
app.use("/exolunes", exolunesRouter);
app.use("/exolunes", exolunesRouter);
app.use("/users", userRouter);
app.use("/admin", adminRouter);



// Créer une erreur sur la page introuvable
app.use((req, res, next) => next(createError(404)));

// Afficher la page hbs d'erreur
app.use((erreur, req, res) => {
  res.status(erreur.status || 500);
  res.render('erreur', { erreur });
});

// Lancement du serveur
app.listen(port, () => console.log('Application en écoute sur le port ' + port));


