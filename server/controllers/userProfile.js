const model = require('../models/model.js');
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'hussain-imagestorage',
    api_key: '826587816326516',
    api_secret: 'UhhqwZ47HbpaL5D9snn-jqZ-CwM'
});


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

        cloudinary.uploader.upload(req.file.path, function(result) {
            // add cloudinary url for the image to the campground object under image property
            console.log('URL:' + result.secure_url);

            model.addDiary(title,Description,tripType,result.secure_url,req.session.user.userID)
                .then((result) => {
                    console.log("Done!!" + result);
                    res.redirect('/profile');
                })
                .catch((err) => {
                    console.log("Cancel!!" + err);
                    res.redirect('/profile');
                });
        });
    }
}