var startBtn = document.getElementById("startBtn");
const logoLetters = document.querySelectorAll(".logo span");

//hover sound
logoLetters.forEach(function(letter){
    letter.addEventListener("mouseenter",function(){
        let sound = new Audio("Sounds/pop.wav");
        sound.play();
    });
});
//redirecting to username.html
startBtn.addEventListener("click",function(){
    window.location.href = "username.html";
});