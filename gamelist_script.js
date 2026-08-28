//getting elements
var sUser = document.getElementById("sUser");
var savedName = localStorage.getItem("asobi_username");
var logoutbTn = document.getElementById("logoutbTn");
sUser.textContent = savedName;
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