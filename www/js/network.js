(function() {

  window.CNC_DATA = function() {

    var COAT = 0, NO_COAT=1;
    
    var convertCelsius = function(input) {
      var max = 100, min = -50;

      var value = (input-min)/(max-min);

      return value;
    };

    var convertWind = function(input) {
      var max = 50, min = 0;

      var value = (input-min)/(max-min);

      return value;
    };

    var convertData = function(data) {
      var convertedData = [];

      for (item of data) {
        var celsius = convertCelsius(item.input[0]);
        var wind = convertWind(item.input[1]);
        var rain = item.input[2];
        var humidity = item.input[3] / 100;

        convertedData.push(
          {
            input:[celsius, wind, rain, humidity],
            output:item.output
          }
        )
      }

      return convertedData;
    };

    // temp, windspeed, rain, humidity
    var INITIAL_DATA = [
      {input:[-7.84, 13.86, 0, 83], output:[COAT]},
      {input:[5, 10, 1, 0], output:[COAT]},
      {input:[0.93, 1.1, 1, 0], output:[COAT]},
      {input:[12.83, 2.97, 1, 0], output:[COAT]},
      {input:[11.53, 2.6, 0, 81], output:[COAT]},
      {input:[13, 9.3, 1, 0], output:[COAT]},
      {input: [13.49, 3.1, 0, 0], output:[COAT]},
      {input: [15, 1.5, 0, 93], output:[NO_COAT]},
      {input:[17.13, 7.98, 0, 1], output:[NO_COAT]},
      {input:[20, 0, 0, 1], output:[NO_COAT]}
    ];

    var DATA = convertData(INITIAL_DATA);

    var network = new brain.NeuralNetwork();
    var trainingData = DATA;

    return {
      train : function(data) {
        if (data) {
          trainingData = data;
        }
        network.train(trainingData);
      },
      ask : function(temp, wind, rain, humidity) {
        console.info(arguments);

        var convertedTemp = convertCelsius(temp);
        var convertedWind = convertWind(wind);
        var convertedHumidity = humidity / 100;

        console.info(
          'TEMP : ' + convertedTemp + 
          ' - WIND ' + convertedWind + 
          ' - RAIN ' + rain + 
          ' - HUMIDITY ' + convertedHumidity
        );

        return {
          data: {
            temp:temp,
            wind:wind,
            rain:rain,
            humidity:humidity
          },
          result: network.run([convertedTemp, convertedWind, rain, convertedHumidity])
        }
      },
      data : function() {
        return trainingData;
      }
    };

  }();
})();
