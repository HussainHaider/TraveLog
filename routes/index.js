var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("index route");
  res.render('index', { title: 'Login/Signup | TraveLog',logo:'images/logo.jpg',loginError: false,SignUpError: false });
});

module.exports = router;
