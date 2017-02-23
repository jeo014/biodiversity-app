function initMap() {
  var centerStart = {
    lat: 38.895,
    lng: -77.036
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: centerStart
  });
//  var marker = new google.maps.Marker({
  //  position: uluru,
    // map: map
  //});
}

$(function() {
  var baseURL = 'https://bison.usgs.gov/api/search.jsonp?'

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

  function addMarker() {

  }

  function listResults(array) {
    array.forEach(function(item) {
      $(".results-list").append("<li>Lattitude: " + item.lat + " Longitude: " + item.lng + "</li>")
    })
  }

  function displaySearchData(results) {
    console.log(results);
    var allLocations = [];
    for (var i=1; i < results.data.length; i++) {
      var location = {
        lat: results.data[i].decimalLatitude,
        lng: results.data[i].decimalLongitude
      }
      console.log(location)
      allLocations.push(location);
      // var marker = new google.maps.Marker({
      //   position: location,
      //   map: map
      // });
    }
    console.log(allLocations)
    listResults(allLocations)
  }


  // function displaySearchData(results) {
  //   console.log(results)
  //   var allLocations = {};
  //   for (var i = 0; i < results.data.length; i++) {
  //     var locationData = results.data[i]
  //     var latLng = new google.maps.LatLng(locationData[i].decimalLatitude,locationData[i].decimalLongitude);
  //     var marker = new google.maps.Marker({
  //       position: latLng,
  //       map: map
  //     });
  //     allLocations.i = [locationData[i].decimalLatitude, locationData[i].decimalLongitude];
  //   }
  //   console.log(allLocations)
  // }

  function watchSubmit(){
    $("button").click(function(e) {
      var query = $("input").find("input").val();
      getDataFromApi(query, displaySearchData);
    });
  }
  
  watchSubmit();
})