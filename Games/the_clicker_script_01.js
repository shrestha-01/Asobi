//getting elements 
var startBtn = document.getElementById("startBtn");
var time = document.getElementById("time");
var clickMe = document.getElementById("clickMe");
var totalClks = document.getElementById("totalClks");
var cps = document.getElementById("CPS");
var timeremain;
var timer;

//starting the game 
startBtn.addEventListener("click",function(){
    timeremain = 10;
    time.textContent = timeremain;
    timer = setInterval(countdown, 1000);
});
function countdown(){
    timeremain = timeremain - 1;
    time.textContent = timeremain;
    if(timeremain <= 0){
        clearInterval(timer);
    }
}