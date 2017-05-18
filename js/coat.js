(function() {

  window.CNC = function() {

    CNC_DATA.init();

    return {
      tellMe : function(pLocation) {
        var lat = pLocation.latLng.lat();
        var lon = pLocation.latLng.lng();
        $.get(
          '//api.openweathermap.org/data/2.5/weather',
          {
            appid:'9d0220a01b6485088d44d4f72071819a',
            lat:lat,
            lon:lon,
            units:'metric'
          },
          function(result) {
            var answer = CNC_DATA.ask(result.main.temp);

            alert("ANSWER : " + answer);
            
          }
        )
      }
    }
  }();
})();
