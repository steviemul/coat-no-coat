(function() {

  window.CNC = function() {

    CNC_DATA.train();

    var RAIN_CODES = {
      500 : 'light rain',
      501 : 'moderate rain',
      502 : 'heavy intensity rain',
      503 : 'very heavy rain',
      504 : 'extreme rain',
      511 : 'freezing rain',
      520 : 'light intensity shower rain',
      521 : 'shower rain',
      522 : 'heavy intensity show rain',
      531 : 'ragged shower rain'
    };

    var DRIZZLE_CODES = {
      300 : 'light intensity drizzle',
      301 : 'drizzle',
      302 : 'heavy intensity drizzle',
      310 : 'light intensity drizzle rain',
      311 : 'drizzle rain',
      312 : 'heavy intensity drizzle rain',
      313 : 'shower rain and drizzle',
      314 : 'heavy shower rain and drizzle',
      321 : 'shower drizzle'
    };

    var SNOW_CODES = {
      600 : 'light snow',
      601 : 'snow',
      602 : 'heavy snow',
      611 : 'sleet',
      612 : 'shower sleet',
      615 : 'light rain and snow',
      616 : 'rain and snow',
      620 : 'light shower snow',
      621 : 'shower snow',
      622 : 'heavy shower snow'
    };

    var THUNDER_CODES = {
      200 : 'thunderstorm with light rain',
      201 : 'thunderstorm with rain',
      202 : 'thunderstorm with heavy rain',
      210 : 'light thunderstorm',
      211 : 'thunderstorm',
      212 : 'heavy thunderstorm',
      221 : 'ragged thunderstorm',
      230 : 'thunderstorm with light drizzle',
      231 : 'thunderstorm with drizzle',
      232 : 'thunderstorm with heavy drizzle'
    };

    function isRaining(weather) {
      var raining = 0;

      for (var condition of weather) {
        for (var code of [RAIN_CODES, DRIZZLE_CODES, SNOW_CODES, THUNDER_CODES]) {
          if (code[condition.id]) {
            raining = 1;
          }
        }
      }

      return raining;
    }

    function analyse(temp, wind, rain, humidity) {

      var answer = CNC_DATA.ask(temp, wind, rain, humidity);
      var result = answer.result;

      console.info('ANSWER : ' + result);

      return answer;
    }

    return {
      tellMe : (lat, lon, callback) => {
        const weatherUrl = new URL('https://api.openweathermap.org/data/2.5/weather');

        weatherUrl.searchParams.append('appid', '9d0220a01b6485088d44d4f72071819a');
        weatherUrl.searchParams.append('lat', lat);
        weatherUrl.searchParams.append('lon', lon);
        weatherUrl.searchParams.append('units', 'metric');

        fetch(
          weatherUrl
        )
        .then(result => result.json())
        .then((result) => {
          var answer = analyse(
            result.main.temp,
            result.wind.speed,
            isRaining(result.weather),
            result.main.humidity
          );

          if (callback) {
            callback(answer.result);
          }
        })
      }
    }
  }();
})();
