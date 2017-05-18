(function() {

  window.CNC_DATA = function() {

    var COAT = 0, NO_COAT=1, learningRate = 0.0;

    var DATA = [
      {input:[5], output:[COAT]},
      {input:[10], output:[COAT]},
      {input:[15], output:[NO_COAT]}
    ];

    var input = new synaptic.Layer(1);
    var output = new synaptic.Layer(1);

    return {
      init : function() {
        for(var i = 0; i < DATA.length; i++) {
          input.activate(DATA[i]["input"]);
          output.activate();
          output.propagate(learningRate, DATA[i]["output"]);
        }
      },
      ask : function(temp) {
        input.activate([temp]);
        return output.activate();
      }
    };

  }();
})();
