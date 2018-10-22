const model = require('../models/model.js');

module.exports = {
    initialize: function() {
        model.initialize();
    },

    getProfileDetails: function(req, res) {
        res.render('Profile', { title: 'Profile | TraveLog',logo:'images/logo.jpg', anyArray: [1,2,3], session: req.session.user });
        // model.getUserProfile(email, password)
        // .then((result) => {
        //     res.redirect('/profile');
        // })
        // .catch((err) => {
        //     console.log("Error Signing In:" + err);
        //     res.json({
        //         'message': 'Error getting Profile',
        //         'obj': err
        //     });
        // });
    },


    addUserDiary: function(req, res) {
        title = req.body.title;
        Description = req.body.Description;
        tripType = req.body.tripType;
        uploadFile=req.body.uploadFile;

        console.log("title" + title);
        console.log("Description" + Description);
        console.log("tripType" + tripType);
        console.log("uploadFile" + uploadFile);


        model.addDiary(title,Description,tripType,uploadFile,req.session.user.userID)
            .then((result) => {
                console.log("Done!!" + result);
                res.redirect('/profile');
            })
            .catch((err) => {
                console.log("Cancel!!" + err);
                res.redirect('/profile');
            });
    }
}