var relay;
var soil;

function getElement(dom) {
  var element = document.querySelector(dom);
  return element;
}

function controllerBtnEvent(c, e, callback) {
  if (e !== 'click') {
    var _u = navigator.userAgent;
    if (_u.indexOf('Android') > -1 || _u.indexOf('iPhone') > -1 || _u.indexOf('iPad') > -1) {
      c.addEventListener(e[1], function () {
        callback();
      });
    } else {
      c.addEventListener(e[0], function () {
        callback();
      });
    }
  } else {
    c.addEventListener('click', function () {
      callback();
    });
  }
}


boardReady({board: 'Smart', device: '10QMJrxd', transport: 'mqtt'}, function (board) {
  board.samplingInterval = 50;
  relay = getRelay(board, 5);
  soil = getSoil(board, 0, 0);
  relay.off();
  soil.detect(function(val){
    soil.detectedVal = val;
    document.querySelector("#btn-group .show").innerHTML = (Math.round((soil.detectedVal)*100))/100;
    controllerBtnEvent(getElement('#btn-group .num1'),'click', function () {
      relay.on();
    });
    controllerBtnEvent(getElement('#btn-group .num2'),'click', function () {
      relay.off();
    });
  });
});