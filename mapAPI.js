// Create setup map variables
var ourLoc;
var view;
var map;
// lat=47.6820
// log=-122.1468
// Initialize our variables
function init(){
  ourLoc = ol.proj.fromLonLat([-122.1468,47.6820]);

  view = new ol.View({
    center: ourLoc,
    zoom: 6
  });
  map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    loadTilesWhileAnimating: true,
    view: view
  });
}

function panHome(){
  view.animate({
    center: ourLoc,
    duration: 2000
  });
}

function panToLocation(){
  // get the country name from the user
  var countryName = document.getElementById("country-name").value;

  if(countryName === ""){
    alert("You didn't enter a coutnry name!");
    return;
  }
  // get the country information from the countries API
  var query = "https://restcountries.eu/rest/v2/name/"+countryName;

  query = query.replace(/ /g, "%20");
  var countryRequest = new XMLHttpRequest();
  countryRequest.open('GET', query, false);

  countryRequest.send();

  if(countryRequest.readyState != 4 || countryRequest.status != 200 || countryRequest.responseText === ""){
    window.console.error("Request had an error");
    return;
  }

  var countryInformation = JSON.parse(countryRequest.responseText);
  // save the long and lat from the country
  var lon = countryInformation[0].latlng[1];
  var lat = countryInformation[0].latlng[0];
  var location = ol.proj.fromLonLat([lon,lat]);
  // run the animation function
  view.animate({
    center: location,
    duration: 2000
  });

}
window.onload = init;
