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
var vboard = document.getElementById("vboard");
var minNum = 1;
var maxNum = 10;
randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
var bestScoreBox = document.getElementById("bestScoreBox");
var scoreKey = "best_beginner";
var distanceHintBox = document.getElementById("distanceHintBox");
var guessHistoryBox = document.getElementById("guessHistoryBox");
var minNumInput = document.getElementById("minNumInput");
var maxNumInput = document.getElementById("maxNumInput");
var maxGuessInput = document.getElementById("maxGuessInput");
var startGameBtn = document.getElementById("startGameBtn");
var historyLimit = 5;
var clearHistory = document.getElementById("clearHistory");
var minNumText = document.getElementById("minNumText");
var maxNumText = document.getElementById("maxNumText");
var pRank = document.getElementById("pRank");
var hardcoreCheck = document.getElementById("hardcore-check");
var gif = document.getElementById("gif");
var correctGifs = ["GIFs/Correct/Win_01.gif", "GIFs/Correct/Win_02.gif", "GIFs/Correct/Win_03.gif"];
var downGifs = ["GIFs/Down/Down_01.gif", "GIFs/Down/Down_02.gif", "GIFs/Down/Down_03.gif"];
var upGifs = ["GIFs/UP/Point_Up_01.gif", "GIFs/UP/Point_Up_02.gif", "GIFs/UP/Point_Up_03.gif"];
var errorGifs = ["GIFs/Error/Error_01.gif", "GIFs/Error/Error_02.gif", "GIFs/Error/Error_03.gif", "GIFs/Error/Error_04.gif", "GIFs/Error/Error_05.gif", "GIFs/Error/Error_06.gif", "GIFs/Error/Error_07.gif", "GIFs/Error/Error_08.gif", "GIFs/Error/Error_09.gif"];
// var totalBoard = document.getElementById("totalBoard");
//point giving system
var basePoints = {
    "beginner": 10,
    "normal": 25,
    "hard": 50,
    "expert": 100,
    "master": 200,
    "impossible": 500
};
var attemptPenalty = {
    "beginner": 1,
    "normal": 2,
    "hard": 3,
    "expert": 4,
    "master": 5,
    "impossible": 6
};
var minimumPoints = {
    "beginner": 2,
    "normal": 5,
    "hard": 10,
    "expert": 20,
    "master": 40,
    "impossible": 100
};
//making sure player has username
var checkPlayerId = localStorage.getItem("asobi_player_id");
if (checkPlayerId == null) {
    window.location.href = "index.html";
}
hardcoreCheck.addEventListener("change", function () {
    resetGame();
});
minNumText.textContent = minNum;
maxNumText.textContent = maxNum;

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
        arrow = "&darr;";
        arrowClass = "arrowHigh";
    } else if (playerGuess < randomNum) {
        arrow = "&uarr;";
        arrowClass = "arrowLow";
    }
    if (hardcoreCheck.checked) {
        arrow = "";
        arrowClass = "";
    }
    var card = document.createElement("div");
    card.className = "historyItem";
    card.innerHTML = playerGuess + '<span class="' + arrowClass + '">'
        + arrow + '</span>';
    guessHistoryBox.insertBefore(card, guessHistoryBox.firstChild);
    while (guessHistoryBox.children.length > historyLimit) {
        guessHistoryBox.removeChild(guessHistoryBox.lastChild);
    }

    // if (guessCount >= maxGuess && playerGuess != randomNum) {
    //     msgBox.textContent = "Game over! Actually it was " + randomNum;
    //     msgBox.className = "msgHigh";
    //     guessBtn.disabled = true;
    // } else 
    if (playerGuess > randomNum) {
        if (hardcoreCheck.checked) {
            msgBox.textContent = "Wrong guess! No hints in Hardcore Mode.";
        } else {
            msgBox.textContent = "Nah Buddy, Try guessing lower...";
        }
        msgBox.className = "msgHigh";
        doGif("high");
    } else if (playerGuess < randomNum) {
        if (hardcoreCheck.checked) {
            msgBox.textContent = "Wrong guess! No hints in Hardcore Mode.";
        } else {
            msgBox.textContent = "Nah Buddy, Try guessing higher....";
        }
        msgBox.className = "msgLow";
        doGif("low");
    } else {
        msgBox.textContent = "Perfect! Thats Correct..";
        msgBox.className = "msgCorrect";
        guessBtn.disabled = true;
        doGif("win");
        var best = localStorage.getItem(scoreKey);
        if (best == null || guessCount < best) {
            localStorage.setItem(scoreKey, guessCount);
        }
        showBestScore();

        var isCustom = scoreKey.indexOf("custom") !== -1;
        if (!isCustom) {
            var difficultyName = scoreKey.replace("best_", "");
            var points = basePoints[difficultyName] - ((guessCount - 1) * attemptPenalty[difficultyName]);
            if (points < minimumPoints[difficultyName]) {
                points = minimumPoints[difficultyName];
            }
            if (hardcoreCheck.checked) {
                points = points * 2;
            }

            var playerId = localStorage.getItem("asobi_player_id");
            fetch("Backend/score_save.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "player_id=" + playerId + "&difficulty=" + scoreKey + "&score=" + points + "&attempts=" + guessCount + "&won=1"
            })
                .then(function () {
                    loadLeaderboard();
                    // loadTotalBoard();
                });
        }
        var distance = Math.abs(randomNum - playerGuess);
        var range = maxNum - minNum;
        if (hardcoreCheck.checked) {
            distanceHintBox.textContent = "";
        } else if (playerGuess == randomNum) {
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
// for leaderboard 
var leaderboardList = document.getElementById("leaderboardList");
function loadLeaderboard() {
    fetch("Backend/leaderboard.php?difficulty=" + scoreKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (scores) {
            leaderboardList.innerHTML = "";
            var playerName = localStorage.getItem("asobi_username");
            var myRank = null;
            for (var i = 0; i < scores.length; i++) {
                var row = document.createElement("div");
                row.className = "leaderRow";
                if (i == 0) {
                    row.className = "leaderRow rank1";
                } else if (i == 1) {
                    row.className = "leaderRow rank2";
                } else if (i == 2) {
                    row.className = "leaderRow rank3";
                }
                row.innerHTML = '<span class="rank">' + (i + 1) + '</span>'
                    + '<span class ="username">' + scores[i].username + '</span>'
                    + '<span class="score">' + scores[i].score + '</span>';
                leaderboardList.appendChild(row);
                if (scores[i].username == playerName) {
                    myRank = i + 1;
                }
            }
            if (myRank) {
                pRank.textContent = "Your rank: #" + myRank;
            } else {
                pRank.textContent = "";
            }
        });
}
//play again
function resetGame() {
    guessBtn.disabled = false;
    randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    guessCount = 0;
    guessCountBox.textContent = "Guesses: 0";
    msgBox.textContent = "";
    msgBox.className = "";
    distanceHintBox.textContent = "";
    guessInput.value = "";
    guessHistoryBox.innerHTML = "";
    gif.style.display = "none";
    gif.src = "";
}
playAgainBtn.addEventListener("click", function () {
    playAgainBtn.blur();
    playAgainBtn.focus();
    resetGame();
})

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
        scoreKey = "best_" + optionId;
        minNumText.textContent = minNum;
        maxNumText.textContent = maxNum;
        showBestScore();
        loadLeaderboard();
        resetGame();
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
    resetGame();
    scoreKey = "best_custom_" + minNum + "_" + maxNum;
    minNumText.textContent = minNum;
    maxNumText.textContent = maxNum;
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
clearHistory.addEventListener("click", function () {
    guessHistoryBox.innerHTML = "";
});
loadLeaderboard();
function loadTotalBoard() {
    fetch("Backend/total_Board.php")
        .then(function (response) {
            return response.json();
        })
        .then(function (scores) {
            totalBoard.innerHTML = "";
            for (var i = 0; i < scores.length; i++) {
                var row = document.createElement("div");
                row.className = "leaderRow";
                row.innerHTML = '<span class="rank">' + (i + 1) + '</span>' + '<span class="username">' + scores[i].username + '</span>' + '<span class="score">' + scores[i].score + '</span>';
                totalBoard.appendChild(row);
            }
        });
}
// loadTotalBoard();
//total leaderbaord link
vboard.addEventListener("click", function () {
    window.location.href = "leaderboard.html";
});

// chosing random gifs 
function doGif(result) {
    var list;
    if (result == "win") {
        list = correctGifs;
    } else if (result == "high") {
        list = downGifs.concat(errorGifs);
    } else {
        list = upGifs.concat(errorGifs);
    }
    var pick = list[Math.floor(Math.random() * list.length)];
    gif.src = pick;
    gif.style.display = "block";
}