$(function() {
  var baseURL = 'https://bison.usgs.gov/api/search.jsonp'

  function displaySearchData(data) {
    console.log(data);
  }

  function getDataFromApi(searchTerm, callback){
     var query = {
       species: searchTerm,
       type: "scientific_name",
     }
     $.getJSON(baseURL, query, callback);
  }

  function watchSubmit(){
    $("button").click(function(e) {
      var query = $(this).find("input").val();
      getDataFromApi(query, displaySearchData);
    });
  }
  
  watchSubmit();
})


