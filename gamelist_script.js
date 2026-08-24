//getting elements
var sUser = document.getElementById("sUser");
var savedName = localStorage.getItem("asobi_username");
var logoutbTn = document.getElementById("logoutbTn");
sUser.textContent = savedName;
// logout 
logoutbTn.addEventListener("click", function(){
    fetch("Backend/logout.php")
    .then(function(){
        localStorage.removeItem("asobi_username");
        localStorage.removeItem("asobi_player_id");
        window.location.href = "username.html";
    });
});