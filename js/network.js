(function() {

  window.CNC_DATA = function() {

    var COAT = 0, NO_COAT=1;

    var DATA = [
      {input:[0], output:[COAT]},
      {input:[1], output:[NO_COAT]}
    ];

    var network = new neataptic.Architect.Perceptron(1,4,1);

    return {
      init : function() {
        network.train(DATA);
      },
      ask : function(input) {
        return network.activate([input.temp]);
      }
    };

  }();
})();
