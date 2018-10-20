const model = require('../models/model.js');

module.exports = {
    initialize: function() {
        model.initialize();
    },

    signup: function(req, res) {
        username = req.body.username;
        email = req.body.email;
        password = req.body.password;

        model.addUser(username, email, password)
        .then((result) => {
            res.status = 200;
            res.json({});
        })
        .catch((err) => {
            res.status = 777;
            res.json({
                'message': 'Error Signing In',
                'obj': err
            });
        });
    },

    signin: function(req, res) {
        email = req.body.Email;
        password = req.body.password;

        model.loginUser(email, password)
        .then((result) => {
            console.log("SignedIn Successfully:", result);
            res.redirect('/profile');
        })
        .catch((err) => {
            console.log("Error Signing In:");
            res.render('index', { title: 'Login/Signup | TraveLog',logo:'images/logo.jpg',loginError: true,SignUpError: false });
        });
    }
}