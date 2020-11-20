//onclick search btn

//API key 
var apiKey = "3f5256b0aed6bc757eed5b3080beadb6";
//build the URL to query database

var fivedayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey; 


$("#search-form").on("submit", function(event) {
    // since it is a form, we will event.preventDefault() in order to stop the page from refreshing automatically
    event.preventDefault();
    var searchInput = $("#search-input").val();
    //console.log(searchInput);
    getCityWeather(searchInput);
})

function getCityWeather(city) {

    var currentDayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    $.ajax({
      url: currentDayURL,
      method: "GET",
    }).then(function (results) {
      //console.log(results);
      $("#city").text(results.name)
    });
}

//When input search button clicked
//store input in local storage
//GET current weather (temp/wind/humidity/uv index) for city in big card
//append to each in html
//get future dates and weather for each card
