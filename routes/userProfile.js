var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/profile', function(req, res, next) {
    res.render('Profile', { title: 'Profile | TraveLog' });
});

module.exports = router;
