const logoLetters = document.querySelectorAll(".logo span");

logoLetters.forEach(function(letter){
    letter.addEventListener("mouseenter",function(){
        let sound = new Audio("Sounds/pop.wav");
        sound.play();
    });
});