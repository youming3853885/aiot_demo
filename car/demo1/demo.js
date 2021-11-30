// 車子控制
let car;
let speed;

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

function deviceIsConnected() {
  let st0 = document.querySelector('.st0');

  if (myBoard === undefined) {
    st0.style.fill = "#464544";
    return false;
  }
  else if (myBoard.isConnected === undefined) {
    st0.style.fill = "#464544";
    return false;
  }
  else {
    st0.style.fill = "#9AFF9A";
    return myBoard.isConnected;  
  }
}

// car demo 1
boardReady({board: 'Smart', device: 'GKw5K', transport: 'mqtt'}, function (board) {
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
