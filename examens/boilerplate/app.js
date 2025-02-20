const express = require('express');
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const hbs = require('hbs');

// Use of sessions
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


// TODO Require your controllers here
const indexRouter = require("./routes/index.js");
const exoplanetRouter = require("./routes/exoplanets.js");
const forumRouter = require("./routes/forum.js");
const exoluneRouter = require("./routes/exolunes.js");
const usersRouter = require('./routes/users.js');
const membersRouter = require('./routes/members.js');
const adminRouter = require('./routes/admin.js');
const telescopeRouter = require('./routes/telescopes.js');


const app = express();
const port = 3000;

// Setup views folder and handlebar engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev')); // Log each request
app.use(express.urlencoded({ extended: false })); // Decode form values
app.use(express.static(path.join(__dirname, 'public'))); // Get static files from public folder

// use of sessions
app.use(session({ secret: "Your secret key", resave: false, saveUninitialized: false }));
// use of session variables in views via res.locals
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

// TODO Call your controllers here
app.use("/", indexRouter);
app.use("/exoplanets", exoplanetRouter);
app.use("/forum", forumRouter);
app.use("/exolunes", exoluneRouter);
app.use("/users", usersRouter);
app.use("/members", membersRouter);
app.use("/admin", adminRouter);
app.use("/telescopes", telescopeRouter);




// Create error on page not found
app.use((req, res, next) => next(createError(404)));

// Show error hbs page
app.use((error, req, res) => {
  res.status(error.status || 500);
  res.render('error', { error });
});

// Launch server
app.listen(port, () => console.log('App listening on port ' + port));
