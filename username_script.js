//getting elements
var asobiUser = document.getElementById("asobiuser");
var submitBtn = document.getElementById("submit");
var msgBox = document.getElementById("msgBox");

// skipping page for username saved people 
var checkUser = localStorage.getItem("asobi_username");
if(checkUser != null){
    window.location.href = "gamelist.html";
}

submitBtn.addEventListener("click",function(){
    if(asobiUser.value == ""){
        msgBox.textContent = "Bruh, Please enter a username first";
        return;
    }
    fetch("Backend/get_player.php",{
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "username=" + encodeURIComponent(asobiUser.value)
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        if(data.error){
            msgBox.textContent = data.error;
            return;
        }
        var playerId = data.id;
        localStorage.setItem("asobi_username", data.username);
        localStorage.setItem("asobi_player_id", playerId);
        window.location.href="gamelist.html";
    });
});