function light_id(){
  var id = prompt("請輸入開發版 ID :", "devide id");
  if (id != null) {
    // alert("你的 device id 為 ：" + id)
    location.href="light/demo.html?"+"device_id="+encodeURI(id);
  }
}