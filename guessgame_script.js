//make random number
var randomNum;
var playerGuess;
randomNum = Math.floor(Math.random() * 100) + 1;
var guessBtn = document.getElementById("guessBtn");
var guessInput = document.getElementById("guessInput");
var msgBox = document.getElementById("msgBox");
var guessCount = 0;
var guessCountBox = document.getElementById("guessCountBox");
var playAgainBtn = document.getElementById("playAgainBtn");

guessBtn.addEventListener("click",function(){
    guessCount = guessCount + 1;
    guessCountBox.textContent = "Guesses: " + guessCount;
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

playAgainBtn.addEventListener("click",function(){
    randomNum = Math.floor(Math.random() * 100) + 1;
    guessCount = 0;
    guessCountBox.textContent = "Guesses: 0";
    msgBox.textContent = "";
    guessInput.value = "";
});