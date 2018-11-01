var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');


//config
var config = require('./config')
//passport
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

//Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var submitRouter = require('./routes/submit');
var fakeServer = require('./routes/fakeServer');

//models
var models = require('./models');


const sessOptions = {

  maxAge: 52 * 7 * 24 * 60 * 60 * 1000,
  secret: config.SESSION_SECRET,
};



var app = express();



passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user.dataValues.id);
});

passport.deserializeUser(function(id, done) {

  models.User.findOne({id: id}).then( (user) => {
    console.log(user);
    done(null,user);
  })

});



passport.use(new GoogleStrategy({
    clientID: '932013263345-vtif5ud94fdrf41ert6rr66thpt78t0q.apps.googleusercontent.com',
    clientSecret: 'GZUjAXTMUovMWSw9oXjTh-WS',

    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {

    process.nextTick(function() {

      var email = profile.email;
      var authId = profile.id;
      var name = profile.displayName;
      models.User
        .findOne({
          authId: authId
        })
        .then((obj) => {
          if (obj) {
            return done(null, obj);
          } else {
            models.User
              .create({
                email: email,
                authId: authId,
                name: name
              })
              .then((result) => {
                return done(null, result);
              })
          }
        })
    });
  }
));


app.use(session(sessOptions));
app.use(passport.initialize());
app.use(passport.session());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', ensureAuthenticated,usersRouter);
app.use('/submit', submitRouter);
app.use('/fakeServer', fakeServer);



app.get('/account', ensureAuthenticated, function(req, res) {
  res.render('account', {
    user: req.user
  });
});



app.get('/auth/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/userinfo.email'
  ]
}));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));





app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/google');
}




module.exports = app;
