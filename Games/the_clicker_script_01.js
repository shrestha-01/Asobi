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
        starttime = Date.now();
        timeremain = 10;
        time.textContent = timeremain;
        timer = setInterval(countdown, 1000);
        clickno = 1;
        totalClks.textContent = clickno;
    } else {
        clickno = clickno + 1;
        totalClks.textContent = clickno;
    }
});
function countdown(){
    timeremain = timeremain - 1;
    time.textContent = timeremain;
    if(timeremain <=0){
        clearInterval(timer);
        timesup = true;
        endtime = Date.now();
        var secPass = (endtime-starttime)/1000;
        // cps.textContent = (clickno/10).toFixed(3);
        cps.textContent = (clickno/secPass).toFixed(1);
        clickMe.disabled = true;
        clickMe.textContent = "Take a breath";
        rest = setTimeout(function(){
            clickMe.disabled = false;
            clickMe.textContent = "Click Me!";
        }, 3000);
    }
}