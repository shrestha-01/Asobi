//getting elements
var leaderTabel = document.getElementById("leaderTabel");

fetch("Backend/total_Board.php")
    .then(function (response){
        return response.json();
    })
    .then(function (players){
        for(var i = 0; i<players.length; i++){
            var row = document.createElement("div");
            row.className = "tRow";
            row.innerHTML = '<span class="pRank">'+(i+1)+'</span>'
            + '<span class="pName">' + players[i].username + '</span>'
            + '<span class="totalBox">' + players[i].score + '</span>'
            + '<span class="pTime">' + players[i].games + '</span>';
            leaderTabel.appendChild(row);
        }
    });