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
  $(".btn btn-primary").on("click",function(event){
    event.preventDefault();

// grab user user input
    var firstName = $("#validationDefault01").val().trim();
    var lastName = $("#validationDefault02").val().trim();
    var city = $("#validationDefault03").val().trim();
    var state = $("#validationDefault04").val().trim();
    var zipCode = $("#validationDefault05").val().trim();
    var milesAway = $("#validationDefault06").val().trim();
    var typeOfFood = $("#validationDefault07").val().trim();

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
    $("#validationDefault01").val("");
    $("#validationDefault02").val("");
    $("#validationDefault03").val("");
    $("#validationDefault04").val("");
    $("#validationDefault05").val("");
    $("#validationDefault06").val("");
    $("#validationDefault07").val("");


  });
