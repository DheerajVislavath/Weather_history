$(document).ready(function(){
var ac = new google.maps.places.Autocomplete(
      (document.getElementById('tags')),{types: ['geocode']}
    );
  google.maps.event.addListener(ac, 'place_changed', function(){
    var place = ac.getPlace();
    var newLat = place.geometry.location.lat();
    var newLon = place.geometry.location.lng();
    console.log(place.localdate);
    updateLocation(newLat, newLon);
    pastWeather(newLat, newLon);
  });

  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
      updateLocation(position.coords.latitude ,position.coords.longitude);
    pastWeather(position.coords.latitude ,position.coords.longitude);
       });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
});

 function updateLocation(a,b){
   var updateLatitude = a;
   var updateLongitude = b;
   $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + updateLatitude +"&lon=" + updateLongitude, function(json){
$(".name").text(json.name);   $(".description").text(json.weather[0].description);
$(".temperature").html(Math.round(json.main.temp) + " &#8451;" );
 $(".farenheit").on("click", function(){
  $(".temperature").html(Math.round((json.main.temp)* (9/5) + 32) + " &#8457;");
   $(".farenheit").removeClass("btnnone");
   $(".farenheit").addClass("btnbg");
    $(".celsius").removeClass("btnbg");
   $(".celsius").addClass("btnnone");
});
$(".celsius").on("click", function(){
  $(".temperature").html(Math.round(json.main.temp) + " &#8451;" );
   $(".celsius").removeClass("btnnone");
   $(".celsius").addClass("btnbg");
    $(".farenheit").removeClass("btnbg");
   $(".farenheit").addClass("btnnone");
});
     $.getJSON("https://maps.googleapis.com/maps/api/timezone/json?location=" + "17.3850" + "," + "78.4867" + "&timestamp=1331161200&key=AIzaSyCXKcuIUblGPt1vme81ofUWryhEKA6lilM", function(timejson){
       var offset = timejson.rawOffset + timejson.dstOffset;
       
       function calcTime(a) {
var d = new Date();
var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
var nd = new Date(utc + (1000*a));

console.log("The local time is " + nd.toLocaleString());
}
       calcTime(offset);
     });
 
    var i_a = "<i class=\"wi wi-day-sunny\"></i>";
    var i_b = "<i class=\"wi wi-day-cloudy\"></i>";
    var i_c = "<i class=\"wi wi-day-rain\"></i>";
    var i_d = "<i class=\"wi wi-fog\"></i>";
     
 var icon = ({
  "clear" : i_a,
  "clouds" : i_b,
  "rain" : i_c,
   "haze": i_d
})[json.weather[0].main.toLowerCase()];
 
 $(".symbol").html(icon); 
     var s_a = "https://images.pexels.com/photos/46160/field-clouds-sky-earth-46160.jpeg?w=940&h=650&auto=compress&cs=tinysrgb";
     var s_b = "https://wallpaperscraft.com/image/rain_island_clouds_volume_sky_52002_1920x1080.jpg";
     var s_c = "https://cdn.pixabay.com/photo/2015/06/19/20/14/water-815271_960_720.jpg";
     var s_d = "https://images.pexels.com/photos/5230/road-fog-foggy-mist.jpg?w=940&h=650&auto=compress&cs=tinysrgb";
 var bgImage = ({
  "clear" : s_a,
  "clouds" : s_b,
  "rain" : s_c,
   "drizzle": s_c,
   "haze": s_d,
})[json.weather[0].main.toLowerCase()] || "https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?w=940&h=650&auto=compress&cs=tinysrgb";
       
 $("body").css('background-image', 'url(' + bgImage + ')');    
       
function checkWeather(){
  json.weather[0].description.match()
}
      });
 }

function pastWeather(a,b){
  var lat_hist = a;
  var lon_hist = b;
  for(var n = 1; n<=7; n++){
    var unixTimeStamp = new Date((new Date()).valueOf() - 1000*60*60*24*n).getTime() / 1000;
    console.log(unixTimeStamp);
    $.getJSON("https://api.apixu.com/v1//history.json?key=f86c0b5f1f0b4676a62170516171908&q=" + lat_hist + "," + lon_hist + "&unixdt=" + unixTimeStamp, function(history){
      console.log(history);
       $(".weather-history .hist_date").append("<span class='cluster'>" + history.forecast.forecastday[0].date + "<br/>" +  history.forecast.forecastday[0].day.condition.text + "</span><br/>");
     
    });
}
  }
   