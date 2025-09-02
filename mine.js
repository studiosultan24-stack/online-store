let EGP=document.getElementById('EGP');
let USD=document.getElementById('USD');
let EURO=document.getElementById('EURO');
let KWD=document.getElementById('KWD');
EGP.onkeyup = function(){
    USD.value=EGP.value*0.021
    EURO.value=EGP.value*0.018
    KWD.value=EGP.value*0.0063
}
USD.onkeyup = function(){
    EGP.value=USD.value*48.58
    EURO.value=0.85/USD.value
    KWD.value=0.31/USD.value
}
EURO.onkeyup = function(){
    USD.value=EURO.value*1.17
    EGP.value=EURO.value/56.95
    KWD.value=0.36/EURO.value
}
KWD.onkeyup = function(){
    USD.value=KWD.value*3.27
    EGP.value=158.98/KWD.value
    EURO.value=KWD.value*2.79
}

  // دالة لإخفاء كل الصور
  function hideAllImages() {
    document.getElementById("currencyImageEGP").style.display = "none";
    document.getElementById("currencyImageUSD").style.display = "none";
    document.getElementById("currencyImageEURO").style.display = "none";
    document.getElementById("currencyImageKWD").style.display = "none";
  }
  document.getElementById("EGP").addEventListener("click", function() {
    hideAllImages();
    document.getElementById("currencyImageEGP").style.display = "block";
  });
  document.getElementById("USD").addEventListener("click", function() {
    hideAllImages();
    document.getElementById("currencyImageUSD").style.display = "block";
  });
  document.getElementById("EURO").addEventListener("click", function() {
    hideAllImages();
    document.getElementById("currencyImageEURO").style.display = "block";
  });
  document.getElementById("KWD").addEventListener("click", function() {
    hideAllImages();
    document.getElementById("currencyImageKWD").style.display = "block";
  });