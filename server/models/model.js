var firebase = require('firebase');
const firebaseKey = require("firebase-key");

var db;

module.exports = {
  initialize: function() {
      var config = require('../../configuration/config');

      firebase.initializeApp(config.firebase);
      db = firebase.database();

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

    logoutUser:function(){
        return new Promise((resolve, reject) => {
            console.log("In logoutUser");
            firebase.auth().signOut()
                .then(function() {
                    console.log("Sign-out successful.");
                resolve("done!");
            }).catch(function(error) {
                // An error happened.
                console.log("Error SignOut user data:", error);
                reject(error.code + error.message);
            });
        });
    },

    addDiary:function (title,Description,tripType,Link,userID) {
        return new Promise((resolve, reject) => {

            var newAppKey =firebaseKey.key();
            console.log('newAppKey'+newAppKey);

            db.ref('Diary/' +tripType+'/'+userID+'/'+newAppKey).set({
                Title: title,
                Description: Description,
                Link:Link
            });
            console.log("In addDiary");
            resolve();
        });
    }
}