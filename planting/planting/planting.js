var loc=location.href;
var n1=loc.length; //地址的總長度
var n2=loc.indexOf("="); //取得=號的位置
var device_id = decodeURI(loc.substr(n2+1, n1-n2));//從=號後面的内容
alert("Device ID:" + device_id); 
// document.write("device_id:"+device_id)
console.log('=> ' + device_id);

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


boardReady({board: 'Smart', device: device_id, transport: 'mqtt'}, function (board) {
  board.samplingInterval = 50;
  relay = getRelay(board, 5);
  soil = getSoil(board, 0, 0);
  relay.off();
  soil.detect(function(val){
    soil.detectedVal = val;
    document.querySelector("#demo-area-09 .btn-show").innerHTML = (Math.round((soil.detectedVal)*100))/100;
    controllerBtnEvent(getElement('#demo-area-09 .btn-num1'),'click', function () {
      relay.on();
    });
    controllerBtnEvent(getElement('#demo-area-09 .btn-num2'),'click', function () {
      relay.off();
    });
  });
});