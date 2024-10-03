var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Use of sessions
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var exoplanetsRouter = require('./routes/exoplanets');
var membersRouter = require('./routes/members');

var app = express();
var port = 3000;

// register partials views 
// important to do that before set engine 
// BEFORE app.set('view engine', 'hbs');
var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

//eq helper
hbs.registerHelper('eq', function (a, b) {
  return a === b;
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: "Your secret key", resave: false, saveUninitialized: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/exoplanets', exoplanetsRouter);
app.use('/members', membersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Start the server and listen on port 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



