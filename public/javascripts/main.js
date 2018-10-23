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
    var heading_ID= "Trip_"+id;
    var div_ID= "Trips_Div_"+id;
    //console.log("Trips_Div: "+div_ID);

    var element = document.querySelector(".active_box");
    element.classList.remove("active_box");
    document.getElementById(heading_ID).classList.add("active_box");
    for(var i=1;i<=3;i++){
        var tempID="Trips_Div_"+i;
        //console.log("tempID: "+tempID);
        document.getElementById(tempID).style.display = "none";
    }

    document.getElementById(div_ID).style.display = "block";
}


// function showTripsDiv() {
//     document.getElementById("loader").style.display = "none";
//     document.getElementById("Trips_Div").style.display = "block";
// }
//
// function progress_timer() {
//     setTimeout(showTripsDiv, 3000);
// }

