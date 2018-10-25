const model = require('../models/model.js');

module.exports = {
    initialize: function() {
        model.initialize();
    },

    showUserJournal: function(req, res) {
        itemID = req.params.id;
        tripType = req.params.tripType;

        console.log("itemID: "+itemID);
        console.log("tripType: "+typeof(tripType));

        let TypeOfTrip;
        if(tripType==='1'){
            TypeOfTrip="Within City Trips";
        } else if (tripType==='2'){
            TypeOfTrip="Out of City Trips";
        } else if (tripType==='3'){
            TypeOfTrip="Out of State Trips";
        }

        model.showJournalDetail(itemID, TypeOfTrip,req.session.user.userID)
        .then((result) => {
            console.log("Fired:" + result.data);
            res.render('profileJournal', { title: 'Journal Name | TraveLog',logo:'/images/logo.jpg',session: req.session.user,data:result.data });
        })
        .catch((err) => {
            console.log("Cancel!!" + err);
            res.redirect('/profile');
        });
    },
    deleteUserJournal: function(req, res) {
        itemID = req.body.fullName;
        tripType = req.body.fullName;

        model.deleteJournalDetail(itemID, tripType,req.session.user.userID)
            .then((result) => {
                res.redirect('/profile');
            })
            .catch((err) => {
                console.log("Cancel!!" + err);
                res.redirect('/profile');
            });
    },
    editUserJournal: function(req, res) {
        itemID = req.body.fullName;
        tripType = req.body.fullName;

        model.editJournalDetail(itemID, tripType,req.session.user.userID)
            .then((result) => {
                res.redirect('/profile');
            })
            .catch((err) => {
                console.log("Cancel!!" + err);
                res.redirect('/profile');
            });
    }
};