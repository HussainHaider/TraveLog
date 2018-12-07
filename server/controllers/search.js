const model = require('../models/model.js');

module.exports = {
    initialize: function() {
        model.initialize();
    },

    searchProfiles: function(req, res) {
        searchType = req.body.searchType;
        searchText = req.body.searchText;

        console.log('searchType: ' + searchType);
        console.log('searchText: ' + searchText);

        model.searchUsersProfile(searchType, searchText)
        .then((result) => {
            console.log("Search Result is:" + JSON.stringify(result.data));
            res.render('searchProfiles', { title: 'Search | TraveLog',logo:'images/logo.jpg',session: req.session.user,Data:result.data });
        })
        .catch((err) => {
            console.log("Error creating new user:", err);
            res.redirect('/explore');
        });
    },
    explore: function(req, res) {
        let LocationType = req.body.LocationType;
        if(LocationType === undefined){
            LocationType = 'Historical places';
        }

        model.getLocationGalleryImages(LocationType)
            .then((result) => {
                console.log("Search Result of Location Gallery:" + JSON.stringify(result.data));
                res.render('Explore', { title: 'Explore | TraveLog',logo:'images/logo.jpg',session: req.session.user,Data:result.data });
            })
            .catch((err) => {
                console.log("Error getting new Location Gallery:", err);
                res.redirect('/profile');
            });

    }
};