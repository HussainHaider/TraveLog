var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('Profile', { title: 'Profile | TraveLog' });
});

router.get('/settings', function(req, res, next) {
    res.render('Settings', { title: 'Settings | TraveLog' });
});

module.exports = router;
