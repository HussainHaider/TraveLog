var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('Explore', { title: 'Explore | TraveLog',logo:'images/logo.jpg' });
});

module.exports = router;
