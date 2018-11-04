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

    addDiary:function (title,Description,tripType,Link,Location,thumbnail,userID) {
        return new Promise((resolve, reject) => {

            let temploc = Location.match(/\(([^)]+)\)/)[1];
            temploc=temploc.split(',');

            let newAppKey =firebaseKey.key();
            console.log('newAppKey'+newAppKey);

            db.ref('Diary/' +tripType+'/'+userID+'/'+newAppKey).set({
                Title: title,
                Description: Description,
                Link:Link,
                Location:{
                    latitude:temploc[0],
                    longitude:temploc[1]
                },
                Thumbnail:thumbnail
            });
            console.log("In addDiary");
            resolve();
        });
    },
    getProfileData(UserID){
        return new Promise((resolve, reject) => {
            db.ref('/users/' + UserID).once('value')
                .then(function(snapshot) {
                    resolve({
                        data:snapshot.val()
                    });
                })
                .catch(function (err) {
                    console.log('unable to read User Profile Data ');
                    reject(err.code + err.message);
                })

        });
    },
    updateProfileData(name,email,number,age,city,country,UserID){
        return new Promise((resolve, reject) => {

            var postData = {
                email: email,
                phoneNumber: number,
                username: name,
                age: age,
                city: city,
                country: country
            };

            var updates = {};
            updates['/users/' + UserID] = postData;

            db.ref().update(updates)
                .then(function() {
                    resolve();
                })
                .catch(function (err) {
                    console.log('unable to Update User Profile Data ');
                    reject(err.code + err.message);
                })

        });
    },
    getUserProfile:function(userID){
        return new Promise((resolve, reject) => {
            var tripType_1 = {},tripType_2= {},tripType_3= {};

             db.ref('Diary/Within City Trips/' + userID)
                .on('value', function(snapshot) {
                    tripType_1=snapshot.val()
                });

             db.ref('Diary/Out of City Trips/' + userID)
                .on('value', function(snapshot) {
                    tripType_2=snapshot.val();
                });

            db.ref('Diary/Out of State Trips/' + userID)
                .on('value', function(snapshot) {
                    tripType_3=snapshot.val();

                    resolve({
                        tripType_1:tripType_1,
                        tripType_2:tripType_2,
                        tripType_3:tripType_3
                    });
                });

        });
    },
    showJournalDetail:function(itemID, tripType,userID){
        return new Promise((resolve, reject) => {


            //console.log("Route:" + 'Diary/'+ Type +'/' + userID+'/' + itemID);
            db.ref('Diary/'+ tripType +'/' + userID+'/' + itemID)
                .on('value', function(snapshot) {
                    resolve({
                        data:snapshot.val()
                    });
                });
        });
    },
    deleteJournalDetail:function(itemID, tripType,userID){
        return new Promise((resolve, reject) => {

            console.log("Route:" + 'Diary/'+ tripType +'/' + userID+'/' + itemID);
            db.ref('Diary/'+ tripType +'/' + userID+'/' + itemID)
                .remove().then(function () {
                    console.log("Item Deleted");
                    resolve();
            }).catch(function () {
                console.log("Item not Deleted");
                reject();
            })
        });
    },
    editJournalDetail:function(itemID, tripType,userID){
        return new Promise((resolve, reject) => {
            console.log("Route:" + 'Diary/'+ tripType +'/' + userID+'/' + itemID);
            db.ref('Diary/'+ tripType +'/' + userID+'/' + itemID)
                .on('value', function(snapshot) {
                    resolve({
                        data:snapshot.val()
                    });
                });
        });
    },
    updateJournalDetail:function(itemID, tripType,userID,title,Desc,uploadFile){
        return new Promise((resolve, reject) => {
            console.log("Route:" + 'Diary/'+ tripType +'/' + userID+'/' + itemID);

            let postData;
            if(uploadFile!==undefined){
                postData = {
                    Title: title,
                    Description: Desc,
                    Link:uploadFile
                };
            } else {
                postData = {
                    Title: title,
                    Description: Desc
                };
            }


            db.ref('Diary/'+ tripType +'/' + userID+'/' + itemID).update(postData)
                .then(function() {
                    resolve();
                })
                .catch(function (err) {
                    console.log('unable to Update User Profile Data ');
                    reject(err.code + err.message);
                })
        });
    },

    checkUserByFB_Google: function(email,id) {
        return new Promise((resolve, reject) => {
            let flag=false;
            db.ref('users/').once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    if(childSnapshot.key === id && childSnapshot.val()['email'] ===email){
                        reject(true);
                    } else if (childSnapshot.key !== id && childSnapshot.val()['email'] ===email) {
                        reject(false);
                    } else {
                        flag=true;
                    }
                });
                if(flag===true){
                    resolve();
                }
            });
        });
    },

    addUserByFB_Google: function(fullName,email,id) {
        return new Promise((resolve, reject) => {
            db.ref('users/' + id).set({
                username: fullName,
                email: email
            }).then(function () {
                resolve();
            }).catch(function () {
                reject();
            })
        });
    },
};