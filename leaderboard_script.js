//getting elements
var leaderTabel = document.getElementById("leaderTabel");
var diffs = document.getElementsByClassName("diff");
var rankNum = document.getElementById("rankNum");
var scoreNum = document.getElementById("scoreNum");
var gamesNum = document.getElementById("gamesNum");
var yourRank = document.getElementById("yourRank");
var yourScore = document.getElementById("yourScore");
var yourGames = document.getElementById("yourGames");
var backBtn = document.getElementById("backBtn");
var scoreBtn = document.getElementById("scoreBtn");
var scorePopup = document.getElementById("scorePopup");
var closeBtn = document.getElementById("closeBtn");
var card= document.getElementById("scorePopupCard");
var bounds;

//showing players on the leaderbaord
function showBoard(players){
    var plRows = document.getElementById("plRows");
    plRows.innerHTML = "";

    for(var i=0; i<players.length; i++){
        var row = document.createElement("div");
        row.className= "tRow";
        if(i ==0){
            row.className = "tRow topRow rank1";
        } else if(i==1){
            row.className="tRow topRow rank2";
        } else if(i ==2){
            row.className ="tRow topRow rank3";
        }
        row.innerHTML = '<span class="pRank"><span class="rankBox">'+(i+1)+'</span></span>'
        + '<span class="pName">' + players[i].username + '</span>'
        +'<span class="totalBox">' + players[i].score + '</span>'
        +'<span class="pTime">' + players[i].games+'</span>';
        plRows.appendChild(row);
    }
}
// loading total leaderboard
function loadTotal(){
    fetch("Backend/total_Board.php")
    .then(function(r){
        return r.json();
    })
    .then(function(players){
        showBoard(players);
        showInfo(players);
    });
}
//shwoing your own rank , score and games
function showInfo(p){
    var myName = localStorage.getItem("asobi_username");
    var myRank = "-";
    var myScore = "-";
    var myGames = "-";
    for(var i=0; i<p.length; i++){
        if(p[i].username == myName){
            myRank = "#" + (i+1);
            myScore = p[i].score;
            myGames =p[i].games;
        }
    }
    rankNum.textContent = myRank;
    scoreNum.textContent = myScore;
    gamesNum.textContent = myGames;
    yourRank.textContent = myRank;
    yourScore.textContent= myScore;
    yourGames.textContent = myGames;
}
loadTotal();
for(var i=0; i<diffs.length; i++){
    diffs[i].addEventListener("click",function(){
        var text = this.textContent;
        if(text == "Total Leaderboard"){
            loadTotal();
        } else {
            var difficulty = text.split(" ")[0].toLowerCase();
            fetch("Backend/leaderboard.php?difficulty=best_"+difficulty)
            .then(function(r){
                return r.json();
            })
            .then(function(scores){
                showBoard(scores);
                showInfo(scores);
            });
        }
    });
}
backBtn.addEventListener("click",function(){
    window.location.href = "guess.html";
});
//showing card for how scoring works
scoreBtn.addEventListener("click",function(){
    scorePopup.style.display="flex";
});
closeBtn.addEventListener("click",function(){
    scorePopup.style.display="none";
});

// card design by mark miro (credited with link in github)
function rotateToMouse(e) {
    var mouseX = e.clientX;
    var mouseY = e.clientY;
    var leftX = mouseX - bounds.x;
    var topY = mouseY - bounds.y;
    var centerX = leftX - bounds.width / 2;
    var centerY = topY - bounds.height / 2;
    var distance = Math.sqrt(centerX ** 2 + centerY ** 2);

    card.style.transform = "scale3d(1.05, 1.05, 1.05) rotate3d(" + (centerY / 100) + "," + (-centerX / 100) + ",0," + (Math.log(distance) * 2) + "deg)";

    card.querySelector(".glow").style.backgroundImage = "radial-gradient(circle at " + (centerX * 2 + bounds.width / 2) + "px " + (centerY * 2 + bounds.height / 2) + "px, #ffffff55, #0000000f)";
}
card.addEventListener("mouseenter", function () {
    bounds = card.getBoundingClientRect();
    document.addEventListener("mousemove", rotateToMouse);
});
card.addEventListener("mouseleave", function () {
    document.removeEventListener("mousemove", rotateToMouse);
    card.style.transform = "";
});
