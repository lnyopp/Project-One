/// Initialize Firebase
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
$(".btn.btn-primary").on("click", function (event) {
    event.preventDefault();

    // grab user user input
    var city = $("#city").val().trim();
    var state = $("#state").val().trim();
    var zipCode = $("#zipCode").val().trim();
    var milesAway = $("#travelMiles").val().trim();


    //temporary object customer info
    var newCust = {
        c: city,
        s: state,
        zip: zipCode,
        mile: milesAway
    };

    //pushes to database
    database.ref().push(newCust);
});

function getCuisines() {
    var queryURL = "https://developers.zomato.com/api/v2.1/cuisines?lat=35.081168&lon=-80.706246";

    $.ajax({
        url: queryURL,
        beforeSend: function (request) {
            request.setRequestHeader('user-key', "99b181866b0592190e9b469fec75abd4");
        },
        type: 'GET',
    }).then(function (res) {
        console.log(res);
        //load from results
        var cuisineList = res.cuisines;
        var $el = $("#cuisines");
        $el.empty(); // remove old options
        $.each(cuisineList, function (key, value) {
            var targetCuisine = value.cuisine;
            $el.append($("<option></option>")
                .attr("value", targetCuisine.cuisine_id).text(targetCuisine.cuisine_name));
        });
    });
}

function displayRestaurantInfo() {
    var city = $("#city").val().trim();
    var state = $("#state").val().trim();
    var zipCode = $("#zipCode").val().trim();
    var geoUrl = "http://open.mapquestapi.com/geocoding/v1/address?key=UISeCHVAVPQkB674cMljIU6v7cVnoNqj&location=";
    geoUrl += city + "," + state + "%20" + zipCode;
    $.ajax({
        url: geoUrl,
        type: 'GET'
    }).then(function (res) {
        console.log(res);
        var latLon = res.results[0].locations[0].latLng;
        console.log(latLon);
        loadRestaurants(latLon.lat, latLon.lng);
    });
}
$("#submit").on("click", function (event) {
    event.preventDefault();
    displayRestaurantInfo();

});

function loadRestaurants(lat, lon) {
    var queryURL = "https://developers.zomato.com/api/v2.1/search?cuisines=" + $("#cuisines").val();
    var milesAway = $("#travelMiles").val().trim();
    var metersAway = milesAway * 1609.34;
    queryURL += "&radius=" + metersAway;
    queryURL += "&lat=" + lat;
    queryURL += "&lon=" + lon;

    $.ajax({
        url: queryURL,
        beforeSend: function (request) {
            request.setRequestHeader('user-key', "99b181866b0592190e9b469fec75abd4");
        },
        type: 'GET'
    }).then(function (res) {
        console.log(res);
        $("tbody").empty();
        var tbl_body = "";
        var odd_even = false;
        $.each(res.restaurants, function (i, item) {
            $('<tr>').html(
                "<td>" + item.restaurant.name + "</td><td><a target=\"_blank\" href=\"" + item.restaurant.url + "\"><img class=\"thumb\" src=" + item.restaurant.thumb + "/></a></td><td>" + item.restaurant.user_rating.aggregate_rating + "</td>").appendTo('#restaurantTable');
        })
    });
}


getCuisines();