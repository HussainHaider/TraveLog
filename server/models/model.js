var firebase = require('firebase');
var admin = require("firebase-admin");

var db;
var storage;
var serviceAccount;

module.exports = {
  initialize: function() {
      var config = require('../../configuration/config');

      serviceAccount = require("../../configuration/serviceAccountKey.json");

      firebase.initializeApp(config.firebase);

      admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          storageBucket: "gs://travelog-1538753400083.appspot.com"
      });

      db = firebase.database();
      storage = admin.storage().bucket();

    console.log('model online');
  },

  addUser: function(fullName,email, password,number) {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            var user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: fullName,
                phoneNumber: number
            });

            db.ref('users/' + userRecord.user.uid).set({
                username: fullName,
                email: email,
                phoneNumber:number,
            });
            resolve({
                userID:userRecord.user.uid,
                userName: fullName,
                userEmail:email
            })
        })
        .catch(function(error) {
            console.log("Error creating new user:", error);
            reject(error.code + error.message);
        });
    });
  },

  loginUser: function(email, password) {
      return new Promise((resolve, reject) => {
          firebase.auth().signInWithEmailAndPassword(email, password)
              .then(function (userRecord) {
                  // See the UserRecord reference doc for the contents of userRecord.
                  console.log("Successfully fetched user data:", userRecord.user.uid);
                  resolve({
                      userID: userRecord.user.uid,
                      userName:userRecord.user.displayName,
                      userEmail:userRecord.user.email
                  })
              })
              .catch(function (error) {
                  console.log("Error fetching user data:", error);
                  reject(error.code + error.message);
              });
      });
  },

    addDiary:function (title,Description,tripType,uploadFile,userID) {
        return new Promise((resolve, reject) => {

            console.log("In addDiary");

            var uploadTask  = storage.ref('images/'+uploadFile).put('C:/Users/HP/Desktop');
            console.log("In addDiary_2");

            uploadTask.on('state_changed', // or 'state_changed'
                    function(error) {
                    // A full list of error codes is available at
                        console.log("error"+ error);
                        reject(error);
                }, function() {
                    // Upload completed successfully, now we can get the download URL
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        console.log('File available at', downloadURL);
                        resolve({
                            downloadURL:downloadURL
                        })
                    });
                });
        });
    }
}