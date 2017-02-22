$(function() {
  var baseURL = 'https://bison.usgs.gov/api/search.jsonp?'

  function displaySearchData(data) {
    console.log(data);
  }

function getDataFromApi(searchTerm, callback) {
  var settings = {
    url: baseURL,
    data: {
      species: searchTerm,
      type: "scientific_name"
    },
    
    dataType: 'jsonp',
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
}

  function watchSubmit(){
    $("button").click(function(e) {
      var query = $(this).find("input").val();
      getDataFromApi(query, displaySearchData);
    });
  }
  
  watchSubmit();
})

var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: new google.maps.LatLng(2.8, -187.3),
    mapTypeId: 'terrain'
  });

  // // Create a <script> tag and set the USGS URL as the source.
  // var script = document.createElement('script');
  // // This example uses a local copy of the GeoJSON stored at
  // // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
  // script.src = 'https://bison.usgs.gov/api/search.jsonp?species=Bison%20bison&type=scientific_name';
  // document.getElementsByTagName('head')[0].appendChild(script);
}

// Loop through the results array and place a marker for each
// set of coordinates.
window.eqfeed_callback = function(results) {
  for (var i = 0; i < data.length; i++) {
    var coords = data[i];
    var latLng = new google.maps.LatLng(coords[2], coords[3]);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }
}