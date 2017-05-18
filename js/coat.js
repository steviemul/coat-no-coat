(function() {

  window.CNC = function() {

    CNC_DATA.init();

    var ANSWERS = {
      0 : 'COAT',
      1 : 'NO COAT'
    };

    var THRESHOLDS = {
      'TEMP' : 14,
      'WIND' : 20,
      'RAIN' : 1
    };

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
            console.info(result);

            var input = {
              temp : result.main.temp < THRESHOLDS['TEMP'] ? 0 : 1
            };

            var answer = Math.round(CNC_DATA.ask(input));

            alert("ANSWER : " + ANSWERS[answer]);
          }
        )
      }
    }
  }();
})();
