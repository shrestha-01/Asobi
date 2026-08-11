//getting elements
var sUser = document.getElementById("sUser");
var savedName = localStorage.getItem("asobi_username");

sUser.textContent = savedName;