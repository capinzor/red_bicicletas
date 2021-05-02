require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('./config/passport');
const session = require('express-session');
const jwt = require('jsonwebtoken')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tokenRouter = require('./routes/token');
var bicyclesRouter = require('./routes/bicycles');
var bicyclesAPIRouter = require('./routes/api/bicycles');
var usersAPIRouter = require('./routes/api/users');
var authAPIRouter = require('./routes/api/auth')

const User = require('./models/user');
const Token = require('./models/token');

const store = new session.MemoryStore;

var app = express();

app.set('secretKey', 'jwt_pwd_!!223344');

app.use(session({
  cookie: { maxAge: 240 * 60 * 60 * 100 }, // 10 dias
  store: store,
  saveUninitialized: true,
  resave: 'true',
  secret: 'red_bicis_!!!***!!!**123456789'
}));

var mongoose = require('mongoose');


var mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser:true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB conection error: '));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', function(req, res) {
  res.render('session/login');
});

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);
    if (!user) return res.render('session/login', {info});
    req.logIn(user, function(err) {
      if (err) return next(err);
      return res.redirect('/');
    });
  })(req, res, next);
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/forgotPassword', function(req, res) {
  res.render('session/forgotPassword');
});

app.post('/forgotPassword', function(req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (!user) return res.render('session/forgotPassword', {info: {message: 'No existe el usuario'}});
 
    user.resetPassword(function(err){
      if (err) return next(err);
      console.log('session/forgotPasswordMessage');
    });

    res.render('session/forgotPasswordMessage');  
  });
});

app.get('/resetPassword/:token',  function(req, res, next){
  Token.findOne({ token: req.params.token }, function (err, token) {
    if (!token) return res.status(400).send({ type: 'not-verified', msg:  'No existe el token.'});

    User.findById(token._userId, function (err, user) {
      if (!user) return res.status(400).send({ type: 'not-verified', msg:  'No existe un usuario al token.'});
      res.render('session/resetPassword', {errors: {}, user: user});
    });
  });
});

app.post('/resetPassword',  function(req, res){
  if (req.body.password != req.body.confirm_password) {
    res.render('session/resetPassword', {errors: {confirm_password: {message: 'No coinciden los passwords.'}}});
    return;
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    user.password = req.body.password;
    user.save(function(err){
      if (err) {
        res.render('session/resetPassword', {errors: err.errors, user: new Usuario({ email: req.body.email })});
      } else{
        res.redirect('/login');    
      }
    });
  });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/token', tokenRouter);
app.use('/bicycles', loggedIn, bicyclesRouter);

app.use('/api/auth', authAPIRouter);
app.use('/api/bicycles',validateUser, bicyclesAPIRouter);
app.use('/api/users', usersAPIRouter);

app.use('/privacy_policy',function (req,res) {
  res.sendFile('public/privacy_policy.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    console.log('Usuario sin loguearse');
    res.redirect('/login');
  }
};

function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{

      req.body.userId = decoded.id;

      console.log('jwt verify: ' + decoded);

      next();
    }
  });
}

module.exports = app;
