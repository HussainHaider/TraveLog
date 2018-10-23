var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var hbs = require('express-handlebars');

var indexRouter = require('../routes/index');
var usersRouter = require('../routes/userProfile');
var exploreRouter = require('../routes/explore');

// Controllers
const user = require('./controllers/user.js');
const userProfile = require('./controllers/userProfile.js');

var app = express();

var firebase = require("firebase");
var session = require('express-session');



 var config = require('../configuration/config');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;


var cloudinary = require('cloudinary');
var multer = require('multer');

var storage = multer.diskStorage({
    filename: function(req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter});

cloudinary.config({
    cloud_name: 'hussain-imagestorage',
    api_key: '826587816326516',
    api_secret: 'UhhqwZ47HbpaL5D9snn-jqZ-CwM'
});



// view engine setup

//app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');

app.use(passport.initialize());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
    secret: 'sf54s84a846as684saf4s68f4afajk',
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: true }
}));

app.use('/', indexRouter);
app.use('/userProfile', isAuthenticated, usersRouter);
app.use('/explore', isAuthenticated, exploreRouter);
user.initialize();


app.post('/signUp', user.signup);
app.post('/login', user.signin);
app.get('/profile',isAuthenticated, userProfile.getProfileDetails);
app.get('/settings',isAuthenticated, userProfile.getUserProfileData);
app.post('/editProfile',isAuthenticated, userProfile.editUserProfileData);
app.get('/logOut', user.signOut);
app.post('/addDiary',isAuthenticated, upload.single('image'), userProfile.addUserDiary);


// Passport session setup.
passport.serializeUser(function(user, done) {
    console.log('serializeUser');
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    console.log('deserializeUser');
    done(null, obj);
});

// Use the FacebookStrategy within Passport.
passport.use(new FacebookStrategy({
        clientID: config.facebookAuth.api_key,
        clientSecret: config.facebookAuth.api_secret,
        callbackURL:config.facebookAuth.callback_url,
        profileFields: ['id', 'first_name', 'last_name', 'email']
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('profile' + profile);
        //profile.id,profile.name(profile.name.givenName),profile.emails[0].value
        return done(null, profile);
    }
));

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/profile',
        failureRedirect: '/' }));

passport.use(new GoogleStrategy({
        clientID: config.googleAuth.CLIENT_ID,
        clientSecret: config.googleAuth.CLIENT_SECRET,
        callbackURL: config.googleAuth.callback_url
    },
    function(token, tokenSecret, profile, done) {
        //profile.id,profile.displayName,profile.emails[0].value
        console.log("Google profile" + JSON.stringify(profile));
        return done(null, profile);
    }
));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { successRedirect : '/profile',failureRedirect: '/' }));


function isAuthenticated(req, res, next) {
    // do any checks you want to in here

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (req.session.user!=null)
        return next();

    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.redirect('/');
}


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

module.exports = app;
