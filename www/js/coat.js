(function() {

  window.CNC = function() {

    CNC_DATA.train();

    var ANSWERS = {
      0 : 'COAT',
      1 : 'NO COAT'
    };

    var THRESHOLDS = {
      'TEMP' : 14,
      'WIND' : 20,
      'RAIN' : 1
    };

    function analyse(temp, wind, rain) {

      var answer = CNC_DATA.ask(temp, wind);
      var result = answer.result;

      console.info('ANSWER : ' + result);

      return answer;
    }

    var prompt = document.getElementById('answer');

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
            var answer = analyse(result.main.temp, result.wind.speed);

            var result = answer.result;
            var imgSrc = 'images/kenny.png';

            if (result > 0.5) {
              imgSrc = 'images/cartman.png';
            }

            var image = prompt.getElementsByTagName('img')[0];
            
            image.src = imgSrc;

            image.onload = function() {
              prompt.setAttribute('active', true);
            }
          }
        )
      },
      check : analyse,
      dismiss : function() {
        prompt.removeAttribute('active');
      }
    }
  }();
})();
