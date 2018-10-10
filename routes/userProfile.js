var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('Profile', { title: 'Profile | TraveLog',logo:'images/logo.jpg', anyArray: [1,2,3] });
});

router.get('/settings', function(req, res, next) {
    res.render('Settings', { title: 'Settings | TraveLog',logo:'../images/logo.jpg' });
});

router.get('/profileJournal', function(req, res, next) {
    res.render('profileJournal', { title: 'Journal Name | TraveLog',logo:'../images/logo.jpg' });
});

module.exports = router;
