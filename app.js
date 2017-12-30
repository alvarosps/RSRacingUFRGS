var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var dotenv = require('dotenv');
// Passport is the most popular Node Js authentication library
var passport = require('passport');
// We are including the Auth0 authentication strategy for Passport
var Auth0Strategy = require('passport-auth0');

var mongo = require('mongodb');
var monk = require('monk');
//var db = monk('localhost:27017/rsracingufrgs') //puc
//var db = monk('localhost:27017/test') //casa
//var db = monk('mongodb.rsracingufrgs.com.br:27017/rsracingufrgs01'); //servidor
var db = monk('rsracingufrgs01:rsr2017@mongodb.rsracingufrgs.com.br:27017/rsracingufrgs01');

//var porta = 3000 // localhost
var porta = 21031 //servidor 


dotenv.load();

var routes = require('./routes/index');

// This will configure Passport to use Auth0
var strategy = new Auth0Strategy({
    domain:       process.env.AUTH0_DOMAIN,
    clientID:     process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    //callbackURL: 'http://localhost:3000/callback'
    callbackURL:  'http://rsracingufrgs.com.br:21031/callback'


    
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // profile has all the information from the user
    return done(null, profile);
  });

// Here we are adding the Auth0 Strategy to our passport framework
passport.use(strategy);

// The searlize and deserialize user methods will allow us to get the user data once they are logged in.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'shhhhhhhhh',
  resave: true,
  saveUninitialized: true
}));
// We are also adding passport to our middleware flow
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});


app.use('/', routes);


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});


app.listen(porta);
