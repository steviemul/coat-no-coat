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

        convertedData.push(
          {
            input:[celsius, wind],
            output:item.output
          }
        )
      }

      return convertedData;
    };

    var INITIAL_DATA = [
      {input:[5, 10], output:[COAT]},
      {input:[0.93, 1.1], output:[COAT]},
      {input:[12.83, 2.97], output:[COAT]},
      {input:[13, 9.3], output:[COAT]},
      {input:[17.13, 7.98], output:[NO_COAT]},
      {input:[20, 0], output:[NO_COAT]}
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
      ask : function(temp, wind) {
        console.info(arguments);

        var convertedTemp = convertCelsius(temp);
        var convertedWind = convertWind(wind);

        console.info('TEMP : ' + convertedTemp + ' - WIND ' + convertedWind);

        return {
          data: {
            temp:temp,
            wind:wind
          },
          result : network.run([convertedTemp, convertedWind])
        }
      },
      data : function() {
        return trainingData;
      }
    };

  }();
})();
