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