function ShowRegisterDiv(num) {
    document.getElementById("SignUp_button").style.display = "none";
    document.getElementById("LogIn_button").style.display = "none";
    if (num === 1) {
        document.getElementById("SignUp").style.display = "block";
        document.getElementById("LogIn").style.display = "none";
    }
    if (num === 2) {
        document.getElementById("SignUp").style.display = "none";
        document.getElementById("LogIn").style.display = "block";
    }
}


function ShowTrips(id) {
    var element = document.querySelector(".active_box");
    element.classList.remove("active_box");
    document.getElementById(id["id"]).classList.add("active_box");
}


function showTripsDiv() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("Trips_Div").style.display = "block";
}

function progress_timer() {
    setTimeout(showTripsDiv, 3000);
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
function onSignInFailure() {
    // Handle sign-in errors
}

function facebooklogin() {
    FB.login(function (response) {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me?fields=id,email,first_name,last_name', function (response) {
                console.log('Good to see you, ' + JSON.stringify(response) + '.');
            });
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {scope: 'public_profile,email'});
}

function facebooklogOut() {
    FB.logout(function (response) {
        console.log('Person is now logged out');
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId      : '308338449961614',
        cookie     : true,
        xfbml      : true,
        version    : 'v1.0'
    });

    FB.AppEvents.logPageView();
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));