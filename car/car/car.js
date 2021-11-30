let loc = location.href;
let n1 = loc.length; //地址的總長度
let n2 = loc.indexOf("="); //取得=號的位置
let device_id = decodeURI(loc.substr(n2+1, n1-n2));//從=號後面的内容
alert("Device ID:" + device_id); 
// document.write("device_id:"+device_id)
console.log('=> ' + device_id);

// 車子控制
let car;
let speed;
let BoardEvent = webduino.BoardEvent;
let st7_connect = document.getElementById('st7_connect');

let board = new webduino.WebArduino({
  device: device_id,
  initialReset: false,
  handleDigitalPins: false,
  multi: true
});

function getElement(dom) {
  let element = document.querySelector(dom);
  return element;
}

function controllerBtnEvent(c, e, callback) {
  if (e !== 'click') {
    let _u = navigator.userAgent;
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

window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
  if (window.orientation === 180 || window.orientation === 0) {
      alert('目前您的螢幕為縱向！');
  }
  if (window.orientation === 90 || window.orientation === -90 ){
      alert('目前您的螢幕為橫向！');
  }
}, false);

boardReady({board: 'Smart', device: device_id, transport: 'mqtt'}, function (board) {
  board.samplingInterval = 50;
  car = getToyCar(board, 14, 16, 2, 5);
  speed = 100;
  car.setRightSpeed(speed);
  car.setLeftSpeed(speed);

  controllerBtnEvent(getElement('.st3_add'), 'click', function () {
    speed = speed + 5;
    console.log('+5');
    car.setRightSpeed(speed);
    car.setLeftSpeed(speed);
  });

  controllerBtnEvent(getElement('.st3_less'), 'click', function () {
    speed = speed - 5;
    console.log('-5');
    car.setRightSpeed(speed);
    car.setLeftSpeed(speed);
  });

  controllerBtnEvent(getElement('.st5_front'),['mousedown', 'touchstart'], function () {
    car.goFront();
    console.log('F');
  });

  controllerBtnEvent(getElement('.st5_back'),['mousedown', 'touchstart'], function () {
    car.goBack();
    console.log('B');
  });

  controllerBtnEvent(getElement('.st5_left'),['mousedown', 'touchstart'], function () {
    car.turnLeft();
    console.log('L');
  });

  controllerBtnEvent(getElement('.st5_right'),['mousedown', 'touchstart'], function () {
    car.turnRight();
    console.log('R');
  });

  controllerBtnEvent(getElement('.st5_stop'),['mousedown', 'touchstart'], function () {
    car.stop();
    console.log('S');
  });

  controllerBtnEvent(getElement('.st5_front'),['mouseup', 'touchend'], function () {
    car.stop();
  });

  controllerBtnEvent(getElement('.st5_back'),['mouseup', 'touchend'], function () {
    car.stop();
  });

  controllerBtnEvent(getElement('.st5_left'),['mouseup', 'touchend'], function () {
    car.stop();
  });

  controllerBtnEvent(getElement('.st5_right'),['mouseup', 'touchend'], function () {
    car.stop();
  });

});

