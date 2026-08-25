//getting elements
// var randomNum; i moved it to the server side , bro you cant cheat anymore =)
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
var baseDif = "beginner";
var hardcoreCheck = document.getElementById("hardcore-check");
var gif = document.getElementById("gif");
var correctGifs = ["GIFs/Correct/Win_01.gif", "GIFs/Correct/Win_02.gif", "GIFs/Correct/Win_03.gif"];
var downGifs = ["GIFs/Down/Down_01.gif", "GIFs/Down/Down_02.gif", "GIFs/Down/Down_03.gif"];
var upGifs = ["GIFs/UP/Point_Up_01.gif", "GIFs/UP/Point_Up_02.gif", "GIFs/UP/Point_Up_03.gif"];
var errorGifs = ["GIFs/Error/Error_01.gif", "GIFs/Error/Error_02.gif", "GIFs/Error/Error_03.gif", "GIFs/Error/Error_04.gif", "GIFs/Error/Error_05.gif", "GIFs/Error/Error_06.gif", "GIFs/Error/Error_07.gif", "GIFs/Error/Error_08.gif", "GIFs/Error/Error_09.gif"];
// var totalBoard = document.getElementById("totalBoard");
//point giving system , moved to the server side, bro you cant cheat anymore =)
// var basePoints = {
//     "beginner": 10,
//     "normal": 25,
//     "hard": 50,
//     "expert": 100,
//     "master": 200,
//     "impossible": 500
// };
// var attemptPenalty = {
//     "beginner": 1,
//     "normal": 2,
//     "hard": 3,
//     "expert": 4,
//     "master": 5,
//     "impossible": 6
// };
// var minimumPoints = {
//     "beginner": 2,
//     "normal": 5,
//     "hard": 10,
//     "expert": 20,
//     "master": 40,
//     "impossible": 100
// };
var weekBtn = document.getElementById("week-btn");
var weekMenu = document.getElementById("week-menu");
var weekOptions = document.getElementsByClassName("weekOption");
var weekText = document.getElementById("weekText");
var sUser = document.getElementById("sUser");
var musicBtn = document.getElementById("musicBtn");
var savedMute = localStorage.getItem("asobi_muted");
// for logout btn 
var logoutbTn = document.getElementById("logoutbTn");
var speaking = true;
// preloading audio and gifs so they dont lag when actually needed
var preloadaudio = {};
var allSounds = wsound.concat(lsound);
for (var i = 0; i < allSounds.length; i++) {
    var audio = new Audio(allSounds[i]);
    preloadaudio[allSounds[i]] = audio;
}

var preloadgif = [];
var allGifs = correctGifs.concat(downGifs, upGifs, errorGifs);
for (var i = 0; i < allGifs.length; i++) {
    var img = new Image();
    img.src = allGifs[i];
    preloadgif.push(img);
}
if (savedMute == null) {
    speaking = false;
    localStorage.setItem("asobi_muted", "true");
} else if (savedMute == "true") {
    speaking = false;
} else {
    speaking = true;
}
if (speaking) {
    musicBtn.src = "Icons/sound-on.svg";
} else {
    musicBtn.src = "Icons/sound-off.svg";
}
sUser.textContent = localStorage.getItem("asobi_username");
// music 
var wsound = ["Sounds/Win/Yatta.mp3"];
var lsound = ["Sounds/Error/error_01.mp3", "Sounds/Error/error_02.mp3", "Sounds/Error/error_03.mp3"];
function updateScoreKey() {
    if (hardcoreCheck.checked) {
        scoreKey = "best_" + baseDif + "_hardcore";
    } else {
        scoreKey = "best_" + baseDif;
    }
}
//making sure player has username
var checkPlayerId = localStorage.getItem("asobi_player_id");
if (checkPlayerId == null) {
    window.location.href = "index.html";
}
// localStorage can still remember you even if the server forgot you
// so double check with the server too, or else scores just dont save
//gemini helped debug this 
fetch("Backend/check_session.php")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if (!data.loggedIn) {
            window.location.href = "username.html";
        }
    });
hardcoreCheck.addEventListener("change", function () {
    updateScoreKey();
    showBestScore();
    loadLeaderboard();
    resetGame();
});
minNumText.textContent = minNum;
maxNumText.textContent = maxNum;

guessBtn.addEventListener("click", function () {
    if (guessInput.value == "") {
        msgBox.textContent = "Ermm, maybe enter a number first";
        return;
    }
    playerGuess = guessInput.value;
    playerGuess = Number(playerGuess);
    // var hardcoreValue;
    // if (hardcoreCheck.checked) {
    //     hardcoreValue = "1";
    // } else {
    //     hardcoreValue = "0";
    // }
    fetch("Backend/the_checker.php",{
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "guess=" + playerGuess
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            guessCount = data.guesses;
            guessCountBox.textContent = "Guesses: " + guessCount;
            var arrow = "";
            var arrowClass = "";
            if (data.result == "high") {
                arrow = "&darr;";
                arrowClass = "arrowHigh";
            } else if (data.result == "low") {
                arrow = "&uarr;";
                arrowClass = "arrowLow";
            }
            if (hardcoreCheck.checked) {
                arrow = "";
                arrowClass = "";
            }
            var card = document.createElement("div");
            card.className = "historyItem";
            card.innerHTML = playerGuess + '<span class="' + arrowClass + '">' + arrow + '</span>';
            guessHistoryBox.insertBefore(card, guessHistoryBox.firstChild);
            while (guessHistoryBox.children.length > historyLimit) {
                guessHistoryBox.removeChild(guessHistoryBox.lastChild);
            }
            if (data.result == "high") {
                if (hardcoreCheck.checked) {
                    msgBox.textContent = "Wrong guess and No hints in Hardcore mode";
                } else {
                    msgBox.textContent = "Nah Buddy, Try guessing lower..";
                }
                msgBox.className = "msgHigh";
                doGif("high");
                playmusic("lose");
            } else if (data.result == "low") {
                if (hardcoreCheck.checked) {
                    msgBox.textContent = "Wrong guess and No hints in Hardcore mode";
                } else {
                    msgBox.textContent = "Nah buddy, Try guessing higher..";
                }
                msgBox.className = "msgLow";
                doGif("low");
                playmusic("lose");
            } else {
                msgBox.textContent = "Perfect! Thats correct..";
                msgBox.className = "msgCorrect";
                guessBtn.disabled = true;
                doGif("win");
                playmusic("win");
                var best = localStorage.getItem(scoreKey);
                if(best == null || guessCount < best){
                    localStorage.setItem(scoreKey, guessCount);
                }
                showBestScore();
                loadLeaderboard();
            }
            if (hardcoreCheck.checked || data.result == "correct") {
                distanceHintBox.textContent = "";
            } else if (data.closeness == "close") {
                distanceHintBox.textContent = "You are very close!";
            } else if (data.closeness == "warm") {
                distanceHintBox.textContent = "Getting close!";
            } else {
                distanceHintBox.textContent = "Nah buddy, Too far!";
            }
            if (data.result == "correct") {
                guessInput.classList.add("correctnum");
                guessInput.focus();
            } else {
                guessInput.classList.add("wrongnum");
                guessInput.select();
                setTimeout(function () {
                    guessInput.classList.remove("wrongnum");
                    guessInput.value = "";
                }, 500);
            }
        });
});
// for leaderboard 
var leaderboardList = document.getElementById("leaderboardList");
var currentTime = "24h";
function loadLeaderboard() {
    fetch("Backend/leaderboard.php?difficulty=" + scoreKey + "&time=" + currentTime)
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
                var showName = scores[i].username;
                if (scores[i].username == playerName) {
                    showName = showName + " (You)";
                }
                row.innerHTML = '<span class="rank">' + (i + 1) + '</span>'
                    + '<span class ="username">' + showName + '</span>'
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
//play again , now reseting the game
//play again , now reseting the game
function resetGame() {
    var hardcoreValue;
    if (hardcoreCheck.checked) {
        hardcoreValue = "1";
    } else {
        hardcoreValue = "0";
    }
    fetch("Backend/the_game.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "minNum=" + minNum + "&maxNum=" + maxNum + "&baseDif=" + baseDif + "&hardcore=" + hardcoreValue
    })
        .then(function (r) {
            return r.json();
        })
        .then(function (d) {
            guessBtn.disabled = false;
            guessCount = 0;
            guessCountBox.textContent = "Guesses: 0";
            msgBox.textContent = "";
            msgBox.className = "";
            distanceHintBox.textContent = "";
            guessInput.value = "";
            guessInput.classList.remove("correctnum");
            guessHistoryBox.innerHTML = "";
            gif.style.display = "none";
            gif.src = "";
        });
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
        baseDif = optionId;
        updateScoreKey();
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
        bestScoreBox.textContent = "Your Best: -";
    } else {
        bestScoreBox.textContent = "Your Best: " + best +" tries";
    }
    for (var i = 0; i < optionItem.length; i++) {
        if (optionItem[i].classList.contains("selected")) {
            optionItem[i].parentNode.insertBefore(bestScoreBox, optionItem[i].nextSibling);
        }
    }
    bestScoreBox.classList.remove("showbest");
    void bestScoreBox.offsetWidth;
    bestScoreBox.classList.add("showbest");
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
    baseDif = "custom_" + minNum + "_" + maxNum;
    updateScoreKey();
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
resetGame();
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
musicBtn.addEventListener("click", function () {
    speaking = !speaking;
    if (speaking) {
        musicBtn.src = "Icons/sound-on.svg";
        localStorage.setItem("asobi_muted", "false");
    } else {
        musicBtn.src = "Icons/sound-off.svg";
        localStorage.setItem("asobi_muted", "true");
    }
});
//playing the win or error music
function playmusic(result) {
    if (!speaking) {
        return;
    }
    var list;
    if (result == "win") {
        list = wsound;
    } else {
        list = lsound;
    }
    var pick = list[Math.floor(Math.random() * list.length)];
    var sound = preloadaudio[pick];
    sound.currentTime = 0;
    sound.play();
}
weekBtn.addEventListener("click", function () {
    if (weekMenu.style.display == "block") {
        weekMenu.style.display = "none";
    } else {
        weekMenu.style.display = "block";
    }
});
for (var i = 0; i < weekOptions.length; i++) {
    weekOptions[i].addEventListener("click", function (e) {
        e.stopPropagation();
        weekText.textContent = this.textContent;
        weekMenu.style.display = "none";
        currentTime = this.getAttribute("data-range");
        loadLeaderboard();
    })
}
document.addEventListener("click", function (e) {
    if (!weekBtn.contains(e.target)) {
        weekMenu.style.display = "none";
    }
});
//adding the logout 
logoutbTn.addEventListener("click", function(){
    fetch("Backend/logout.php")
    .then(function(){
        localStorage.removeItem("asobi_username");
        localStorage.removeItem("asobi_player_id");
        window.location.href = "username.html";
    });
});