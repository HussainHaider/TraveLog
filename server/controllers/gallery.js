const model = require('../models/model.js');

module.exports = {
    initialize: function() {
        model.initialize();
    },

    getGalleryDetail: function(req, res) {
        let path = req.params.path;
        let regex = /_/gi;
        console.log("Path: "+ path.replace(regex, "/"));

        model.getGalleryDetails(path.replace(regex, "/"))
        .then((result) => {
            console.log("Search Result is:" + JSON.stringify(result.data));
            res.render('galleryJournal', { title: 'Gallery Journal | TraveLog',logo:'images/logo.jpg',session: req.session.user,Data:result.data });
        })
        .catch((err) => {
            console.log("Error while getting Gallery:", err);
            res.redirect('/profile');
        });
    }
};