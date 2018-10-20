var firebase = require('firebase');


var db;

module.exports = {
  initialize: function() {
      var config = require('../configuration/config');
      firebase.initializeApp(config.firebase);
      var db = firebase.database();

    console.log('model online');
  },

  addUser: function(username, email, password) {
    return new Promise((resolve, reject) => {
      admin.auth().createUser({
        email: email,
        emailVerified: false,
        password: password,
        displayName: username,
        disabled: false
      }).then(function(userRecord) {
        resolve(userRecord);
      }).catch(function(error) {
        reject(error);
      });
    });
  },

  loginUser: function(email, password) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        reject(errorCode + errorMessage);
      }).then((userRecord) => {
        resolve({
          userID:userRecord.user.uid,
        })
      });
    });
  }
}