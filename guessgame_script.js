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
var maxGuess = 10;
var difficultySelect = document.getElementById("difficultySelect");
var difficultyBox = document.getElementById("difficultyBox");

guessBtn.addEventListener("click",function(){
    guessCount = guessCount + 1;
    guessCountBox.textContent = "Guesses: " + guessCount;
    playerGuess = guessInput.value;
    playerGuess = Number(playerGuess);
    
    if(guessCount >= maxGuess && playerGuess != randomNum){
        msgBox.textContent = "Game Over! Actually it was " + randomNum;
        guessBtn.disabled = true;
    } else if(playerGuess > randomNum){
        msgBox.textContent = "Nah Buddy, Try guessing lower...";
    } else if(playerGuess < randomNum){
        msgBox.textContent = "Nah Buddy, Try guessing higher...";
    } else {
        msgBox.textContent = "Correct!";
        guessBtn.disabled = true;
    }
});

playAgainBtn.addEventListener("click",function(){
    guessBtn.disabled = false;
    randomNum = Math.floor(Math.random() * 100) + 1;
    guessCount = 0;
    guessCountBox.textContent = "Guesses: 0";
    msgBox.textContent = "";
    guessInput.value = "";
});

difficultySelect.addEventListener("click",function(){
    difficultyBox.classList.toggle("dropdownOpen");
});