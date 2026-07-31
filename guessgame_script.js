//getting elements
var randomNum;
var playerGuess;
var guessBtn = document.getElementById("guessBtn");
var guessInput = document.getElementById("guessInput");
var msgBox = document.getElementById("msgBox");
var guessCount = 0;
var guessCountBox = document.getElementById("guessCountBox");
var playAgainBtn = document.getElementById("playAgainBtn");
var maxGuess = 10;
// var difficultySelect = document.getElementById("difficultySelect");
var difficultyBox = document.getElementById("difficultyBox");
// var selectTitle = document.getElementById("selectTitle");
// var selectValue = document.getElementById("selectValue");
var optionItem = document.getElementsByClassName("optionItem");
var minNum = 1;
var maxNum = 10;
randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
var bestScoreBox = document.getElementById("bestScoreBox");
var scoreKey = "best_normal";
var distanceHintBox = document.getElementById("distanceHintBox");
var guessHistoryBox = document.getElementById("guessHistoryBox");

guessBtn.addEventListener("click",function(){
    guessCount = guessCount + 1;
    guessCountBox.textContent = "Guesses: " + guessCount;
    playerGuess = guessInput.value;
    playerGuess = Number(playerGuess);
    var arrow = "";
    if(playerGuess > randomNum){
        arrow = "&uarr;";
    } else if(playerGuess < randomNum){
        arrow = "&darr;";
    }
    var card = document.createElement("div");
    card.className = "historyItem";
    card.innerHTML = playerGuess + " " + arrow;
    guessHistoryBox.appendChild(card);
    
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
        var best = localStorage.getItem(scoreKey);
        if(best == null || guessCount < best){
            localStorage.setItem(scoreKey, guessCount);
        }
        showBestScore();
    }
    var distance = Math.abs(randomNum - playerGuess);
    var range = maxNum - minNum;
    if(playerGuess == randomNum){
        distanceHintBox.textContent = "";
    } else if(distance < range * 0.05){
        distanceHintBox.textContent = "You are very close!";
    } else if(distance < range * 0.2){
        distanceHintBox.textContent = "Getting close!"
    } else{
        distanceHintBox.textContent = "Nah buddy, Too far!";
    }
});

playAgainBtn.addEventListener("click",function(){
    guessBtn.disabled = false;
    randomNum = Math.floor(Math.random()* (maxNum - minNum + 1)) + minNum;
    guessCount = 0;
    guessCountBox.textContent = "Guesses: 0";
    msgBox.textContent = "";
    guessInput.value = "";
    guessHistoryBox.innerHTML = "";
});

for(var i=0; i<optionItem.length; i++){
    optionItem[i].addEventListener("click",function(){
        var optionId = this.id;
        var optionTitle = document.getElementById(optionId + "Title").textContent;
        var optionValue = document.getElementById(optionId + "Value").textContent;
        // selectTitle.textContent = optionTitle;
        // selectValue.textContent = optionValue;
        for(var j=0; j<optionItem.length; j++){
            optionItem[j].classList.remove("selected");
        }
        this.classList.add("selected");
        if(optionId == "beginner"){
        minNum = 1;
        maxNum = 10;
    } else if(optionId == "easy"){
        minNum = 1;
        maxNum = 50;
    } else if(optionId == "normal"){
        minNum = 1;
        maxNum = 100;
    } else if(optionId == "medium"){
        minNum = 1;
        maxNum = 500;
    } else if(optionId == "hard"){
        minNum = 1;
        maxNum = 1000;
    } else if(optionId == "expert"){
        minNum = 1;
        maxNum = 10000;
    } else if(optionId == "master"){
        minNum = 1;
        maxNum = 100000;
    } else if(optionId == "impossible"){
        minNum = 1;
        maxNum = 1000000;
    }
    randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        scoreKey = "best_" + optionId;
        showBestScore();
    });
}
function showBestScore(){
    var best = localStorage.getItem(scoreKey);
    if(best == null){
        bestScoreBox.textContent = "Best: -";
    } else{
        bestScoreBox.textContent = "Best: " + best;
    }
}
showBestScore();