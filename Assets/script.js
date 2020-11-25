//searches button 
//var citysearchEl = $("#recentSearches")

//API key
var apiKey = "3f5256b0aed6bc757eed5b3080beadb6";
//moment()
var todaysDate = moment().format("MM/DD/YYYY");
//build the URL to query database

  

$("#search-form").on("submit", function (event) {
  // since it is a form, we will event.preventDefault() in order to stop the page from refreshing automatically
  event.preventDefault();
  var searchInput = $("#search-input").val();
  //console.log(searchInput);
  getCityWeather(searchInput);
});
//Get UVINDEX function
function UVIndex(lt, ln) {
  //lets build the url for uvindex.
  var getuvURL =
    "https://api.openweathermap.org/data/2.5/uvi?appid=" +
    apiKey +
    "&lat=" +
    lt +
    "&lon=" +
    ln;
  $.ajax({
    url: getuvURL,
    method: "GET",
  }).then(function (response) {
    var uVi = response.value;
    //console.log(uVi);

    $("#uvIn").text(response.value);
    if (uVi <= 3) {
      $("#uvIn").addClass("bg-success text-white p-1 rounded")
      $("#uvIn").removeClass("bg-danger bg-warning")
    } else if (uVi > 3 && UVIndex <= 7) {
      $("#uvIn").addClass("bg-warning text-white p-1 rounded")
      $("#uvIn").removeClass("bg-danger bg-warning")
    } else if (uVi > 7) {
      $("#uvIn").addClass("bg-danger text-white p-1 rounded")
      $("#uvIn").removeClass("bg-danger bg-warning")
    }
  });
}

//city search history

function getCityWeather(cityName) {
  var currentDayURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    apiKey;
  //console.log(currentDayURL);

  $.ajax({
    url: currentDayURL,
    method: "GET",
  }).then(function (results) {
    $("#city").text(results.name);
    $("#currentDay").text(todaysDate);
    $("#currentIcon").attr(
      "src",
      "http://openweathermap.org/img/wn/" + results.weather[0].icon + "@2x.png"
    );
    var farenheitTemp = (results.main.temp - 273.15) * 1.8 + 32;
    $("#currentTemp").text(farenheitTemp);
    $("#currentHum").text(results.main.humidity);

    $("#WindS").text(results.wind.speed);
    //$("#uvIn").text(results)
    UVIndex(results.coord.lat, results.coord.lon);


  });
  
}
function fivedayURL(city) {
  var getfiveDayURL =
  "https://api.openweathermap.org/data/2.5/forecast?q=" +
  city +
  "&appid=" +
  apiKey;
  console.log(getfiveDayURL);

  $.ajax({
    url: getfiveDayURL,
    method: "GET",
  }).then(function(response){
   
    
  });
}



//$("#clear-history").on("click",clearHistory);
//When input search button clicked
//store input in local storage
//GET current weather (temp/wind/humidity/uv index) for city in big card
//append to each in html
//get future dates and weather for each card
//value = "value"
//var value = localStorage.getItem("key");
//console.log(value);
//localStorage.setItem("socks", "christmas");