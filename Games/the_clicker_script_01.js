//getting elements 
// var startBtn = document.getElementById("startBtn");
var time = document.getElementById("time");
var clickMe = document.getElementById("clickMe");
var totalClks = document.getElementById("totalClks");
var cps = document.getElementById("CPS");
var timeremain;
var timer;
var clickno = 0;
var timesup = true;
var rest;
var starttime;
var endtime;

//starting the game 
// startBtn.addEventListener("click",function(){
//     timesup = false;
//     timeremain = 10;
//     time.textContent = timeremain;
//     timer = setInterval(countdown, 1000);
// });
// function countdown(){
//     timeremain = timeremain - 1;
//     time.textContent = timeremain;
//     if(timeremain <= 0){
//         clearInterval(timer);
//         timesup = true;
//     }
// }
// // counting cliks
// clickMe.addEventListener("click", function(){
//     // clickno = clickno + 1;
//     // totalClks.textContent = clickno;
//     if(!timesup){
//         clickno = clickno + 1;
//         totalClks.textContent = clickno;
//     }
// });

clickMe.addEventListener("click",function(){
    if(timesup){
        timesup = false;
        starttime = performance.now();
        timeremain = 10;
        clickno = 1;
        totalClks.textContent = clickno;
        timer = requestAnimationFrame(countdown);
    } else {
        clickno = clickno + 1;
        totalClks.textContent = clickno;
        var secPass = (performance.now() - starttime) / 1000;
        cps.textContent = (clickno/secPass).toFixed(3);
    }
});
function countdown(){
    var secPass = (performance.now() - starttime) / 1000;
    timeremain = 10 - secPass;
    if(timeremain < 0){
        timeremain = 0;
    }
    time.textContent = timeremain.toFixed(2);
    if(timeremain <= 0){
        cancelAnimationFrame(timer);
        timesup = true;
        cps.textContent = (clickno/secPass).toFixed(3);
        clickMe.disabled = true;
        clickMe.textContent = "Take a breath";
        rest = setTimeout(function(){
            clickMe.disabled = false;
            clickMe.textContent = "Click Me!";
        }, 3000);
    } else {
        timer = requestAnimationFrame(countdown);
    }
}