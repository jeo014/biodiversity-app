function initMap() {
  var uluru = {
    lat: -25.363,
    lng: 131.044
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
//  var marker = new google.maps.Marker({
  //  position: uluru,
    // map: map
  //});
}

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