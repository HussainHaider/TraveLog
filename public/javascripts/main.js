function ShowRegisterDiv(num) {
    document.getElementById("SignUp_button").style.display = "none";
    document.getElementById("LoginIn_button").style.display = "none";
    if (num === 1) {
        document.getElementById("SignUp").style.display = "block";
        document.getElementById("LoginIn").style.display = "none";
    }
    if (num === 2) {
        document.getElementById("SignUp").style.display = "none";
        document.getElementById("LoginIn").style.display = "block";
    }
}

function something() {

    document.getElementById("SignUp").style.display = "none";
    document.getElementById("LoginIn").style.display = "none";
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


//function initMap() {
//    var location = {
//        lat: 33.7294,
//        lng: 73.0931
//    };
//    var map = new google.maps.Map(document.getElementById('map'), {
//        zoom: 3,
//        center: location
//    });
//    var marker = new google.maps.Marker({
//            position: location,
//            map: map
//        
//    });
//}
