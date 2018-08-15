<<<<<<< Updated upstream
var one = "helloWord"
var one = "helloWord"
=======
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCZatYK5hPIJ2G5MuIvwKDh-yUWI3q_2vQ",
    authDomain: "foodforthought-1f199.firebaseapp.com",
    databaseURL: "https://foodforthought-1f199.firebaseio.com",
    projectId: "foodforthought-1f199",
    storageBucket: "foodforthought-1f199.appspot.com",
    messagingSenderId: "907458220010"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

//button for adding
  $(".btn.btn-primary").on("click",function(event){
    event.preventDefault();

// grab user user input
    var firstName = $("#firstname").val().trim();
    var lastName = $("#lastname").val().trim();
    var city = $("#city").val().trim();
    var state = $("#state").val().trim();
    var zipCode = $("#zipcode").val().trim();
    var milesAway = $("#travelmiles").val().trim();
    var typeOfFood = $("#foodtype").val().trim();

//temporary object customer info
    var newCust = {
        first: firstName,
        last: lastName,
        c: city,
        s: state,
        zip: zipCode,
        mile: milesAway,
        food: typeOfFood,
    };
//pushes to database
    database.ref().push(newCust);
    
    //clears boxes
    $("#firstname").val("");
    $("#lastname").val("");
    $("#city").val("");
    $("#state").val("");
    $("#zipcode").val("");
    $("#travelmiles").val("");
    $("#foodtype").val("");


  });


>>>>>>> Stashed changes
