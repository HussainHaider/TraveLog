const model = require('../models/model.js');

module.exports = {
    initialize: function() {
        model.initialize();
    },

    showUserJournal: function(req, res) {
        itemID = req.body.fullName;
        tripType = req.body.fullName;

        model.showJournalDetail(itemID, tripType,req.session.user.userID)
        .then((result) => {
            res.render('profileJournal', { title: 'Journal Name | TraveLog',logo:'../images/logo.jpg' });
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