function addCode() {
  var objectClass = document.querySelector("#"+this.id+"")
  var filename = objectClass.getAttribute('data-name')
  
  $('#pdfSection').attr('src', filename);
  $('#modal-agreement').modal("show");
  $(document).on('hide.bs.modal','#modal-agreement', function () {
    $('#pdfSection').attr('src', '');
  });
}

if(document.getElementById("demo1") !== null) {
  document.getElementById("demo1").addEventListener("click", addCode);
}
if(document.getElementById("demo2") !== null) {
  document.getElementById("demo2").addEventListener("click", addCode);
}
if(document.getElementById("demo3") !== null) {
  document.getElementById("demo3").addEventListener("click", addCode);
}
if(document.getElementById("demo4") !== null) {
  document.getElementById("demo4").addEventListener("click", addCode);
}
if(document.getElementById("demo5") !== null) {
  document.getElementById("demo5").addEventListener("click", addCode);
}
if(document.getElementById("demo6") !== null) {
  document.getElementById("demo6").addEventListener("click", addCode);
}
if(document.getElementById("demo7") !== null) {
  document.getElementById("demo7").addEventListener("click", addCode);
}
if(document.getElementById("demo8") !== null) {
  document.getElementById("demo8").addEventListener("click", addCode);
}
if(document.getElementById("demo9") !== null) {
  document.getElementById("demo9").addEventListener("click", addCode);
}
if(document.getElementById("demo10") !== null) {
  document.getElementById("demo10").addEventListener("click", addCode);
}
if(document.getElementById("demo11") !== null) {
  document.getElementById("demo11").addEventListener("click", addCode);
}
if(document.getElementById("demo12") !== null) {
  document.getElementById("demo12").addEventListener("click", addCode);
}
if(document.getElementById("demo13") !== null) {
  document.getElementById("demo13").addEventListener("click", addCode);
}
if(document.getElementById("demo14") !== null) {
  document.getElementById("demo14").addEventListener("click", addCode);
}
if(document.getElementById("demo15") !== null) {
  document.getElementById("demo15").addEventListener("click", addCode);
}
if(document.getElementById("demo16") !== null) {
  document.getElementById("demo16").addEventListener("click", addCode);
}
if(document.getElementById("demo17") !== null) {
  document.getElementById("demo17").addEventListener("click", addCode);
}
if(document.getElementById("demo18") !== null) {
  document.getElementById("demo18").addEventListener("click", addCode);
}
if(document.getElementById("demo19") !== null) {
  document.getElementById("demo19").addEventListener("click", addCode);
}
if(document.getElementById("demo20") !== null) {
  document.getElementById("demo20").addEventListener("click", addCode);
}
if(document.getElementById("demo21") !== null) {
  document.getElementById("demo21").addEventListener("click", addCode);
}