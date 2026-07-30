//make random number
var randomNum;
var playerGuess;
randomNum = Math.floor(Math.random() * 100) + 1;
var guessBtn = document.getElementById("guessBtn");
var guessInput = document.getElementById("guessInput");
var msgBox = document.getElementById("msgBox");

guessBtn.addEventListener("click",function(){
    playerGuess = guessInput.value;
    playerGuess = Number(playerGuess);
    
    if(playerGuess > randomNum){
        msgBox.textContent = "Nah Buddy, Try guessing lower...";
    } else if(playerGuess < randomNum){
        msgBox.textContent = "Nah Buddy, Try guessing higher...";
    }  else {
        msgBox.textContent = "Correct !";
    }
});