var loc=location.href;
var n1=loc.length; //地址的總長度
var n2=loc.indexOf("="); //取得=號的位置
var device_id = decodeURI(loc.substr(n2+1, n1-n2));//從=號後面的内容
alert("Device ID:" + device_id); 
// document.write("device_id:"+device_id)
console.log('=> ' + device_id);

var lcd1602;
var led;
var led2;
var buzzer;
var dht;
var servo;

function getElement(dom) {
  var element = document.querySelector(dom);
  return element;
}

function controllerBtnEvent(c, e, callback) {
  if (e !== 'click') {
    var _u = navigator.userAgent;
    if (_u.indexOf('Android') > -1 || _u.indexOf('iPhone') > -1 || _u.indexOf('iPad') > -1) {
      c.addEventListener(e[1], async function () {
        callback();
      });
    } else {
      c.addEventListener(e[0], async function () {
        callback();
      });
    }
  } else {
    c.addEventListener('click', async function () {
      callback();
    });
  }
}

function buzzer_music(m) {
  var musicNotes = {};
  musicNotes.notes = [];
  musicNotes.tempos = [];
  if (m[0].notes.length > 1) {
    for (var i = 0; i < m.length; i++) {
      if (Array.isArray(m[i].notes)) {
        var cn = musicNotes.notes.concat(m[i].notes);
        musicNotes.notes = cn;
      } else {
        musicNotes.notes.push(m[i].notes);
      }
      if (Array.isArray(m[i].tempos)) {
        var ct = musicNotes.tempos.concat(m[i].tempos);
        musicNotes.tempos = ct;
      } else {
        musicNotes.tempos.push(m[i].tempos);
      }
    }
  } else {
    musicNotes.notes = [m[0].notes];
    musicNotes.tempos = [m[0].tempos];
  }
  return musicNotes;
}

boardReady({board: 'Smart', device: device_id, transport: 'mqtt'}, async function (board) {
  board.samplingInterval = 50;
  lcd1602 = getLCD1602(board,4,5,0x27);
  led = getLed(board, 0);
  led2 = getLed(board, 12);
  buzzer = getBuzzer(board, 16);
  dht = getDht(board, 14);
  servo = getServo(board, 13);
  servo.angle = 90;
  lcd1602.clear();
  led.on();
  await delay(1);
  lcd1602.print('Hello');
  dht.read(async function(evt){
    document.querySelector("#btn-group .show").innerHTML = ([dht.temperature,'˚C，',dht.humidity,'%'].join(''));
  }, 1000);
  controllerBtnEvent(getElement('#btn-group .num1'),'click', async function () {
    lcd1602.clear();
    servo.angle = 175;
    await delay(0.5);
    lcd1602.print('Welcome Home');
  });
  controllerBtnEvent(getElement('#btn-group .num2'),'click', async function () {
    lcd1602.clear();
    servo.angle = 90;
    buzzer.play(buzzer_music([{ notes : ["C6","D6","E6","F6","G6","A6","B6"] , tempos : ["8","8","8","8","8","8","8"] }]).notes ,buzzer_music([{ notes : ["C6","D6","E6","F6","G6","A6","B6"] , tempos : ["8","8","8","8","8","8","8"] }]).tempos );
    await delay(0.5);
    lcd1602.print('BYE');
  });
  controllerBtnEvent(getElement('#btn-group .num3'),'click', async function () {
    led2.blink(500);
    buzzer.play(buzzer_music([{ notes:['E7','E7','0','E7','0','C7','E7','0','G7','0','0','0','G6','0','0','0','C7','0','0','G6','0','0','E6','0','0','A6','0','B6','0','AS6','A6','0','G6','E7','0','G7','A7','0','F7','G7','0','E7','0','C7','D7','B6','0','0','C7','0','0','G6','0','0','E6','0','0','A6','0','B6','0','AS6','A6','0','G6','E7','0','G7','A7','0','F7','G7','0','E7','0','C7','D7','B6','0','0'] , tempos:['8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8'] }]).notes ,buzzer_music([{ notes:['E7','E7','0','E7','0','C7','E7','0','G7','0','0','0','G6','0','0','0','C7','0','0','G6','0','0','E6','0','0','A6','0','B6','0','AS6','A6','0','G6','E7','0','G7','A7','0','F7','G7','0','E7','0','C7','D7','B6','0','0','C7','0','0','G6','0','0','E6','0','0','A6','0','B6','0','AS6','A6','0','G6','E7','0','G7','A7','0','F7','G7','0','E7','0','C7','D7','B6','0','0'] , tempos:['8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8'] }]).tempos );
  });
  controllerBtnEvent(getElement('#btn-group .num4'),'click', async function () {
    led.toggle();
  });
  controllerBtnEvent(getElement('#btn-group .num5'),'click', async function () {
    led2.off();
    buzzer.stop();
  });
});
