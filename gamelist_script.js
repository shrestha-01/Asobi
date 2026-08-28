//getting elements
var sUser = document.getElementById("sUser");
var savedName = localStorage.getItem("asobi_username");
var logoutbTn = document.getElementById("logoutbTn");
var loadingScreen = document.getElementById("loading");
var loadingwhat = document.getElementById("loadingwhat");
var amount = document.getElementById("amount");
sUser.textContent = savedName;
// preloading images so the page feels ready before showing it
var imageList = [
    "GameLogo/GuessTheNumberLogo.png",
    "GameLogo/The Clicker logo.png",
    "Icons/home.svg",
    "Icons/games.svg",
    "Icons/leaderboard.svg",
    "Icons/logout.svg"
];
var total = imageList.length;
var loaded = 0;
function checkloaded() {
    loaded = loaded + 1;
    loadingwhat.textContent = "Loading images...";
    var percent = Math.floor((loaded / total) * 100);
    amount.textContent = percent + "%";
    if (loaded >= total) {
        loadingScreen.classList.add("hideLoading");
    }
}
var theloads = [];
for (var i = 0; i < imageList.length; i++) {
    var img = new Image();
    img.addEventListener("load", checkloaded);
    img.addEventListener("error", checkloaded);
    img.src = imageList[i];
    theloads.push(img);
}
// localStorage can still remember you even if the server forgot you
// so double check with the server too, or else scores just dont save
//gemini helped with this part
fetch("Backend/check_session.php")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if (!data.loggedIn) {
            localStorage.removeItem("asobi_username");
            localStorage.removeItem("asobi_player_id");
            window.location.href = "username.html";
        }
    });
// logout 
logoutbTn.addEventListener("click", function(){
    fetch("Backend/logout.php")
    .then(function(){
        localStorage.removeItem("asobi_username");
        localStorage.removeItem("asobi_player_id");
        window.location.href = "username.html";
    });
});