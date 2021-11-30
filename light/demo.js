let loc = location.href;
let n1 = loc.length; //地址的總長度
let n2 = loc.indexOf("="); //取得=號的位置
let device_id = decodeURI(loc.substr(n2+1, n1-n2));//從=號後面的内容
alert("Device ID:" + device_id); 
// document.write("device_id:"+device_id)
console.log('=> ' + device_id);

boardReady({board: 'Smart', device: device_id, transport: 'mqtt'}, function (board) {
  board.samplingInterval = 250;
  rgbled = getRGBLedCathode(board, 15, 12, 13);
  document.getElementById('light').addEventListener('click', function () {
    if (document.getElementById('light').className === 'on') {
      document.getElementById('light').className = 'off';
      rgbled.setColor('#000000');
    } else {
      document.getElementById('light').className = 'on';
      rgbled.setColor('#3333ff');
    }
  });
});

// document.getElementById('light').addEventListener('click', function () {
//   if (document.getElementById('light').className === 'on') {
//     document.getElementById('light').className = 'off';
//   } else {
//     document.getElementById('light').className = 'on';
//   }
// });