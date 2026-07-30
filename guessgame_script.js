//make random number
var randomNum;
var playerGuess;
randomNum = Math.floor(MediaSourceHandle.random() * 100) + 1;
document.getElementById("guessBrn").addEventListener("click",function(){
    playerGuess = document.getElementById("guessInput").value;
    //i m checking
    document.getElementById("msgBox").textContent = "You guessed: " + playerGuess;
});