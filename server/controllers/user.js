const model = require('../models/model.js');

module.exports = {
    initialize: function() {
        model.initialize();
    },

    signup: function(req, res) {
        username = req.body.fullName;
        email = req.body.Email;
        password = req.body.password;
        phoneNumber=req.body.number;

        model.addUser(username, email, password,phoneNumber)
        .then((result) => {
            req.session.user=result;
            console.log("Successfully created new user:", result.uid);
            res.redirect('/profile');
        })
        .catch((err) => {
            console.log("Error creating new user:", err);
            res.render('index', { title: 'Login/Signup | TraveLog',logo:'images/logo.jpg',loginError: false,SignUpError: true });
        });
    },

    signin: function(req, res) {
        email = req.body.Email;
        password = req.body.password;

        model.loginUser(email, password)
        .then((result) => {
            console.log("SignedIn Successfully:", result.uid);
            req.session.user=result;
            res.redirect('/profile');
        })
        .catch((err) => {
            console.log("Error Signing In:" + err);
            res.render('index', { title: 'Login/Signup | TraveLog',logo:'images/logo.jpg',loginError: true,SignUpError: false });
        });
    }
}