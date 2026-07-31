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
var difficultySelect = document.getElementById("difficultySelect");
var difficultyBox = document.getElementById("difficultyBox");
var selectTitle = document.getElementById("selectTitle");
var selectValue = document.getElementById("selectValue");
var optionItem = document.getElementsByClassName("optionItem");
var minNum = 1;
var maxNum = 10;

guessBtn.addEventListener("click",function(){
    guessCount = guessCount + 1;
    guessCountBox.textContent = "Guesses: " + guessCount;
    playerGuess = guessInput.value;
    playerGuess = Number(playerGuess);
    
    if(optionId == "beginner"){
        minNum = 1;
        maxNum = 10;
    } else if(optionId == "easy"){
        minNum = 1;
        maxNum = 50;
    } else if(optionId == "normal"){
        minNum = 1;
        maxNum = 50;
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
for(var i=0; i<optionItem.length; i++){
    optionItem[i].addEventListener("click",function(){
        var optionId = this.id;
        var optionTitle = document.getElementById(optionId + "Title").textContent;
        var optionValue = document.getElementById(optionId + "Value").textContent;
        selectTitle.textContent = optionTitle;
        selectValue.textContent = optionValue;
        difficultyBox.classList.remove("dropdownOpen");
    });
}