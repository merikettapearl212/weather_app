//API key
var apiKey = "3f5256b0aed6bc757eed5b3080beadb6";
//moment()
var todaysDate = moment().format("MM/DD/YYYY");
//build the URL to query database

  
var savedSearch = JSON.parse(localStorage.getItem("savedCities")) || [];

for (i = 0; i < savedSearch.length; i++) {
  var cityBtn = $(`<button class="list-group-item" data-city="${savedSearch[i]}">${savedSearch[i]}</button>`);
  $("#recentSearches").prepend(cityBtn);
}

$("#search-form").on("submit", function (event) {
  // since it is a form, we will event.preventDefault() in order to stop the page from refreshing automatically
  event.preventDefault();
  var searchInput = $("#search-input").val();
 cityBtn = $(`<button class="list-group-item" data-city="${searchInput}">${searchInput}</button>`);
  
    $("#recentSearches").prepend(cityBtn);

    savedSearch.push(searchInput);
      console.log(searchInput)
    localStorage.setItem("savedCities", JSON.stringify(savedSearch));

  //console.log(searchInput);
  getCityWeather(searchInput);
  fivedayURL(searchInput);
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
//Get five day forcast URL 
function fivedayURL(city) {
  //build url for 5day forcast
  var getfiveDayURL =
  "https://api.openweathermap.org/data/2.5/forecast?q=" +
  city +
  "&appid=" +
  apiKey + "&units=imperial";
  console.log(getfiveDayURL);

  $.ajax({
    url: getfiveDayURL,
    method: "GET",
  }).then(function (response5) {
    console.log(response5);
    
    var response5 = response5.list;
    
    $(document).ready(function() {
    
      $("#date").text(`(${moment().format("l")})`);
        for (i = 1; i < 7; i++) {
          var forecastDate = $(`#date${i}`);
          forecastDate.text(moment().add(`${i}`, "d").format("l"));
    
        };
        for (i = 0; i < response5.length; i++) {

          $("#weather-icon" + i).attr("src", "http://openweathermap.org/img/wn/" + (response5[i].weather[0].icon) + "@2x.png");
          $("#temp" + i).text("Temp: " + Math.round(response5[i].main.temp) + " °F");
          $("#hum" + i).text("Humidity: " + response5[i].main.humidity + "%");
        
        }
  });
  
  })};
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




$("#recentSearches").on("click", "button", function () {

 searchInput = $(this).data("city");
 cityBtn = $(`<button class="list-group-item" data-city="${searchInput}">${searchInput}</button>`);
  
  getCityWeather(searchInput);
  fivedayURL(searchInput);
});

var recentSearches = document.getElementById("recentSearches")
document.querySelector("#clear-history").addEventListener("click", function (){
  recentSearches.style.display = "none";
  localStorage.clear();
  window.location.reload();
  
})