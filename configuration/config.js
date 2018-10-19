module.exports={
/*
* This file contains the configurations information of Twitter login app.
* It consists of Twitter app information, database information.
*/
    'facebookAuth' : {
        "api_key": "308338449961614",
        "api_secret": "349fa2dc05f27a2ce3cd9ae05cf26a8b",
        "callback_url": "https://travelog-app.herokuapp.com/auth/facebook/callback",
    },
    'googleAuth' : {
        "CLIENT_ID": "202266027367-9pu44m95a2hfs9ts46emkuk0f9j18502.apps.googleusercontent.com",
        "CLIENT_SECRET": "3g04XpqNNTuaoPs7E0txV1Sg",
        "callback_url": "https://travelog-app.herokuapp.com/auth/google/callback"
    },
    'firebase':{
        apiKey: "AIzaSyBZbh_46FeWin5OriADlBkUecKDy8cSEAU",
        authDomain: "travelog-1538753400083.firebaseapp.com",
        databaseURL: "https://travelog-1538753400083.firebaseio.com",
        projectId: "travelog-1538753400083",
        storageBucket: "travelog-1538753400083.appspot.com",
        messagingSenderId: "202266027367"
    }
};
