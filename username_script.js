//getting elements
var asobiUser = document.getElementById("asobiuser");
var submitBtn = document.getElementById("submit");
var msgBox = document.getElementById("msgBox");

submitBtn.addEventListener("click",function(){
    if(asobiUser.value == ""){
        msgBox.textContent = "Please enter a username first";
        return;
    }
    localStorage.setItem("asobi_username",asobiUser.value);
    window.location.href = "gamelist.html";
});