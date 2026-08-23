//getting elements
var asobiUser = document.getElementById("asobiuser");
var nPasscode = document.getElementById("nPasscode");
var submitBtn =document.getElementById("submit");
var msgBox = document.getElementById("msgBox");
var noacc = document.getElementById("noacc");
var which = "login";
var repasscode = document.getElementById("repasscode");
repasscode.style.display = "none";

//skipping page for username saved people
var checkUser = localStorage.getItem("asobi_username");
if(checkUser != null){
    window.location.href = "gamelist.html";
}

noacc.addEventListener("click",function(){
    msgBox.textContent = "";
    if(which == null || which == "login"){
        which = "signup";
        noacc.textContent = "You have an account already? Login";
        submitBtn.textContent = "Sign Up";
        repasscode.style.display = "block";
    } else {
        which = "login";
        noacc.textContent = "No account ? Sign Up";
        submitBtn.textContent = "Submit";
        repasscode.style.display = "none";
    }
});

submitBtn.addEventListener("click",function(){
    if(asobiUser.value == "" || nPasscode.value == ""){
        msgBox.textContent = "Bruh, Please fill in both fields";
        return;
    }
    if(which == "signup" && nPasscode.value != repasscode.value){
    msgBox.textContent = "Umm, your passcode don't match";
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
// making your life easy with enter key addition 
asobiUser.addEventListener("keydown", function(event){
    if(event.key == "Enter"){
        nPasscode.focus();
    }
});
nPasscode.addEventListener("keydown", function(event){
    if(event.key == "Enter"){
        nPasscode.focus();
    }
});
nPasscode.addEventListener("keydown", function(event){
    if(event.key == "Enter"){
        if(which == "signup"){
            repasscode.focus();
        } else {
            submitBtn.click();
        }
    }
});
repasscode.addEventListener("keydown", function(event){
    if(event.key == "Enter"){
        submitBtn.click();
    }
});