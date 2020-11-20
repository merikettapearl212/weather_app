//onclick search btn

//API key 
var apiKey = "3f5256b0aed6bc757eed5b3080beadb6";
//moment()
var todaysDate = moment().format("MM/DD/YYYY");
//build the URL to query database

var fivedayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey; 


$("#search-form").on("submit", function(event) {
    // since it is a form, we will event.preventDefault() in order to stop the page from refreshing automatically
    event.preventDefault();
    var searchInput = $("#search-input").val();
    //console.log(searchInput);
    getCityWeather(searchInput);
})
//Get UVINDEX
/*function UVIndex(){
  //lets build the url for uvindex.
  var getuvURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ apiKey+"&lat="+lt+"&lon="+ln;
  $.ajax({
          url: getuvURL,
          method:"GET"
          }).then(function(response){
              $("#uvIn").html(response.value);
          });
}*/

//city search history


function getCityWeather(city) {

    var currentDayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    console.log(currentDayURL)

    $.ajax({
      url: currentDayURL,
      method: "GET",
    }).then(function (results) {
      
      //console.log(results);
      $("#city").text(results.name)
      $("#currentDay").text(todaysDate);
      $("#currentIcon").attr("src", "http://openweathermap.org/img/wn/" + (results.weather[0].icon) + "@2x.png");
      var farenheitTemp = (results.main.temp - 273.15) * 1.80 + 32;
      $("#currentTemp").text(farenheitTemp);
      $("#currentHum").text(results.main.humidity);
      $("WindS").text(results.wind.speed);
      //$("#uvIn").text(results)
    });


}

//$("#clear-history").on("click",clearHistory);
//When input search button clicked
//store input in local storage
//GET current weather (temp/wind/humidity/uv index) for city in big card
//append to each in html
//get future dates and weather for each card
