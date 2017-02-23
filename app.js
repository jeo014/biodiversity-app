var map

function initMap() {
  var centerStart = {
    lat: 38.895,
    lng: -77.036
  };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: centerStart
  });
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


  function listResults(array) {
    array.map(function(item) {
      $(".results-list").append("<li>Lattitude: " + item.lat + " Longitude: " + item.lng + "</li>");
      var marker = new google.maps.Marker({
        position: item,
      })
      marker.setMap(map);
    })
    
  }

  function displaySearchData(results) {
    console.log(results);
    var allLocations = [];
    for (var i=1; i < results.data.length; i++) {
      var location = {
        lat: Number(results.data[i].decimalLatitude),
        lng: Number(results.data[i].decimalLongitude)
      }
      console.log(location)
      allLocations.push(location);
    }
    console.log(allLocations)
    listResults(allLocations)
  }

  function watchSubmit(){
    $("button").click(function(e) {
      var query = $("input").find("input").val();
      getDataFromApi(query, displaySearchData);
    });
  }
  
  watchSubmit();
})