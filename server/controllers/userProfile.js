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
        console.log("In Profile");
        model.getUserProfile(req.session.user.userID)
        .then((result) => {
            console.log("Profile Detail_1 :"+ JSON.stringify(result.tripType_1));
            res.render('Profile', { title: 'Profile | TraveLog',logo:'images/logo.jpg', session: req.session.user,Type1:result.tripType_1,Type2:result.tripType_2,Type3:result.tripType_3 });
        })
        .catch((err) => {
            console.log("Error Signing In:" + err);
            res.json({
                'message': 'Error getting Profile',
                'obj': err
            });
        });
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
    },
    getUserProfileData: function(req, res) {
        model.getProfileData(req.session.user.userID)
            .then((result) => {
                console.log("Successfully read User Data:", result);
                res.render('Settings', { title: 'Settings | TraveLog',logo:'/images/logo.jpg',updateError:false,Data:result.data });
            })
            .catch((err) => {
                console.log("Error reading User Data user:", err);
                res.redirect('/profile');
            });
    },
    editUserProfileData: function(req, res) {
        model.updateProfileData(req.body.name,req.body.email,req.body.number,req.body.age,req.body.city,req.body.country,req.session.user.userID)
            .then((result) => {
                res.render('Settings', { title: 'Settings | TraveLog',logo:'/images/logo.jpg',updateError:false });
                res.redirect('/profile');
            })
            .catch((err) => {
                console.log("Error update user:", err);
                res.render('Settings', { title: 'Settings | TraveLog',logo:'/images/logo.jpg',updateError:true });
            });
    }
};