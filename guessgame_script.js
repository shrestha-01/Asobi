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
var minNumInput = document.getElementById("minNumInput");
var maxNumInput = document.getElementById("maxNumInput");
var maxGuessInput = document.getElementById("maxGuessInput");
var startGameBtn = document.getElementById("startGameBtn");

guessBtn.addEventListener("click", function () {
    if (guessInput.value == "") {
        msgBox.textContent = "Ermm, Maybe enter a number first";
        return;
    }
    guessCount = guessCount + 1;
    guessCountBox.textContent = "Guesses: " + guessCount;
    playerGuess = guessInput.value;
    playerGuess = Number(playerGuess);
    var arrow = "";
    var arrowClass = "";
    if (playerGuess > randomNum) {
        arrow = "&uarr;";
        arrowClass = "arrowHigh";
    } else if (playerGuess < randomNum) {
        arrow = "&darr;";
        arrowClass = "arrowLow";
    }
    var card = document.createElement("div");
    card.className = "historyItem";
    card.innerHTML = playerGuess + '<span class="' + arrowClass + '">'
        + arrow + '</span>';
    guessHistoryBox.insertBefore(card, guessHistoryBox.firstChild);

    if (guessCount >= maxGuess && playerGuess != randomNum) {
        msgBox.textContent = "Game Over! Actually it was " + randomNum;
        msgBox.className = "msgHigh";
        guessBtn.disabled = true;
    } else if (playerGuess > randomNum) {
        msgBox.textContent = "Nah Buddy, Try guessing lower...";
        msgBox.className = "msgHigh";
    } else if (playerGuess < randomNum) {
        msgBox.textContent = "Nah Buddy, Try guessing higher...";
        msgBox.className = "msgLow";
    } else {
        msgBox.textContent = "Perfect! Thats Correct..";
        msgBox.className = "msgCorrect";
        guessBtn.disabled = true;
        var best = localStorage.getItem(scoreKey);
        if (best == null || guessCount < best) {
            localStorage.setItem(scoreKey, guessCount);
        }
        showBestScore();
    }
    var distance = Math.abs(randomNum - playerGuess);
    var range = maxNum - minNum;
    if (playerGuess == randomNum) {
        distanceHintBox.textContent = "";
    } else if (distance < range * 0.05) {
        distanceHintBox.textContent = "You are very close!";
    } else if (distance < range * 0.2) {
        distanceHintBox.textContent = "Getting close!"
    } else {
        distanceHintBox.textContent = "Nah buddy, Too far!";
    }
    guessInput.value = "";
    guessInput.focus();
});

playAgainBtn.addEventListener("click", function () {
    guessBtn.disabled = false;
    randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    guessCount = 0;
    guessCountBox.textContent = "Guesses: 0";
    msgBox.textContent = "";
    guessInput.value = "";
    guessHistoryBox.innerHTML = "";
});

for (var i = 0; i < optionItem.length; i++) {
    optionItem[i].addEventListener("click", function () {
        var optionId = this.id;
        var optionTitle = document.getElementById(optionId + "Title").textContent;
        var optionValue = document.getElementById(optionId + "Value").textContent;
        // selectTitle.textContent = optionTitle;
        // selectValue.textContent = optionValue;
        for (var j = 0; j < optionItem.length; j++) {
            optionItem[j].classList.remove("selected");
        }
        this.classList.add("selected");
        if (optionId == "beginner") {
            minNum = 1;
            maxNum = 10;
        } else if (optionId == "normal") {
            minNum = 1;
            maxNum = 100;
        } else if (optionId == "hard") {
            minNum = 1;
            maxNum = 1000;
        } else if (optionId == "expert") {
            minNum = 1;
            maxNum = 10000;
        } else if (optionId == "master") {
            minNum = 1;
            maxNum = 100000;
        } else if (optionId == "impossible") {
            minNum = 1;
            maxNum = 1000000;
        }
        randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        scoreKey = "best_" + optionId;
        showBestScore();
    });
}
function showBestScore() {
    var best = localStorage.getItem(scoreKey);
    if (best == null) {
        bestScoreBox.textContent = "Best: -";
    } else {
        bestScoreBox.textContent = "Best: " + best;
    }
}
showBestScore();
//custom
startGameBtn.addEventListener("click", function () {
    var newMinNum;
    var newMaxNum;
    var newMaxGuess;
    newMinNum = Number(minNumInput.value);
    newMaxNum = Number(maxNumInput.value);
    newMaxGuess = Number(maxGuessInput.value);
    minNum = newMinNum;
    maxNum = newMaxNum;
    maxGuess = newMaxGuess;
    randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    guessCount = 0;
    guessCountBox.textContent = "Guesses: 0";
    msgBox.textContent = "";
    distanceHintBox.textContent = "";
    guessInput.value = "";
    guessHistoryBox.innerHTML = "";
    guessBtn.disabled = false;
    scoreKey = "best_custom_" + minNum + "_" + maxNum;
    showBestScore();
});
guessInput.focus();
guessInput.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        guessBtn.click();
    }
});
//reminder
guessInput.addEventListener("input", function () {
    if (guessInput.value != "" && Number(guessInput.value) > maxNum) {
        guessInput.value = maxNum;
        msgBox.textContent = "Umm only numbers between " + minNum +
            " and " + maxNum + " allowed!";
        msgBox.className = "msgHigh";
    }
});
guessInput.addEventListener("blur", function () {
    if (guessInput.value != "" && Number(guessInput.value) < minNum) {
        guessInput.value = minNum;
        msgBox.textContent = "Umm only numbers between "
            + minNum + " and " + maxNum + " allowed !";
        msgBox.className = "msgHigh";
    }
});