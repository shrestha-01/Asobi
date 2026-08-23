//getting elements
var asobiUser = document.getElementById("asobiuser");
var nPasscode = document.getElementById("nPasscode");
var submitBtn =document.getElementById("submit");
var msgBox = document.getElementById("msgBox");
var noacc = document.getElementById("noacc");
var which = "login";

//skipping page for username saved people
var checkUser = localStorage.getItem("asobi_username");
if(checkUser != null){
    window.location.href = "gamelist.html";
}

noacc.addEventListener("click",function(){
    if(which == "login"){
        which = "signup";
        noacc.textContent = "You already have an account ? Login";
        submitBtn.textContent = "Sign Up";
    } else {
        which = "login";
        noacc.textContent = "Don't have an account? Sign Up";
        submitBtn.textContent = "Submit";
    }
});

submitBtn.addEventListener("click",function(){
    if(asobiUser.value == "" || nPasscode.value == ""){
        msgBox.textContent = "Bruh, Please fill in both fields";
        return;
    }
    fetch("Backend/get_player.php",{
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "username=" + encodeURIComponent(asobiUser.value) + "&passcode=" + encodeURIComponent(nPasscode.value) + "&mode=" + which
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