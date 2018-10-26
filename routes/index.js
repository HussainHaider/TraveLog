var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("index route: " + JSON.stringify(req.session));
    if(req.session.user===null && req.session.passport===null){
        console.log("User already exit");
        res.redirect('/profile');
    } else {
        console.log("U have to sign In");
        res.render('index', { title: 'Login/Signup | TraveLog',logo:'images/logo.jpg',loginError: false,SignUpError: false });
    }
});

module.exports = router;
