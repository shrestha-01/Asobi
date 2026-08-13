//getting elements
var leaderTabel = document.getElementById("leaderTabel");
var diffs = document.getElementsByClassName("diff");

//showing players on the leaderbaord
function showBoard(players){
    var header = leaderTabel.querySelector(".tRow");
    leaderTabel.innerHTML = "";
    leaderTabel.appendChild(header);

    for(var i =0; i<players.length; i++){
        var row = document.createElement("div");
        row.className = "tRow";
        row.innerHTML = '<span class="pRank">'+(i+1)+'</span>'
        + '<span class="pName:">' + players[i].username + '</span>'
        +'<span class="totalBox">' + players[i].score + '</span>'
        +'<span class="pTime">' + players[i].games+'</span>';
        leaderTabel.appendChild(row);
    }
}
//loading total leaderboard
function loadTotal(){
    fetch("Backend/total_Board.php")
    .then(function(r){
        return r.json();
    })
    .then(function(players){
        showBoard(players);
    });
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
            });
        }
    });
}