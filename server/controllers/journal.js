const model = require('../models/model.js');

/**
 * @return {string}
 */
function TypeOfTrip(tripType){
    if(tripType==='1'){
        return "Within City Trips";
    } else if (tripType==='2'){
        return "Out of City Trips";
    } else if (tripType==='3'){
        return "Out of State Trips";
    }
}

module.exports = {
    initialize: function() {
        model.initialize();
    },

    showUserJournal: function(req, res) {
        itemID = req.params.id;
        tripType = req.params.tripType;


        model.showJournalDetail(itemID, TypeOfTrip(tripType),req.session.user.userID)
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
        itemID = req.params.id;
        tripType = req.params.tripType;



        model.deleteJournalDetail(itemID, TypeOfTrip(tripType),req.session.user.userID)
            .then((result) => {
                res.redirect('/profile');
            })
            .catch((err) => {
                console.log("Cancel!!" + err);
                res.redirect('/profile');
            });
    },
    editUserJournal: function(req, res) {
        itemID = req.params.id;
        tripType = req.params.tripType;


        model.editJournalDetail(itemID, TypeOfTrip(tripType),req.session.user.userID)
            .then((result) => {
                console.log("EDIT DATA:" + JSON.stringify(result.data));
                res.render('editJournal', { title: 'Journal Name | TraveLog',logo:'/images/logo.jpg',session: req.session.user,Data:result.data,updateError:false,itemID:itemID,tripType:tripType });
            })
            .catch((err) => {
                console.log("Cancel!!" + err);
                res.redirect('/profile');
            });
    },
    updateUserJournal: function(req, res) {
        itemID = req.params.id;
        tripType = req.params.tripType;

        title = req.body.title;
        Description = req.body.Description;
        //uploadFile=req.body.uploadFile;

        console.log("IN update User Journal");

        model.updateJournalDetail(itemID, TypeOfTrip(tripType),req.session.user.userID,title,Description)
            .then((result) => {
                console.log("EDIT DATA:" + JSON.stringify(result.data));
                res.redirect('/profile');
            })
            .catch((err) => {
                console.log("Cancel!!" + err);
                res.redirect('/profile');
            });
    },
    UserJournal: function(req, res) {
        res.render('userJournal', { title: 'Journal Name | TraveLog',logo:'/images/logo.jpg',session: req.session.user });
    }
};