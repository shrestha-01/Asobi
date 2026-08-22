<?php
require "db.php";
$username = $_POST["username"];
$username = trim($username);
$passcode = $_POST["passcode"];
$mode = $_POST["mode"];
if($username == "" || $passcode == ""){
    echo json_encode(["error" => "Bruh, fill in both input boxes"]);
    exit;
}
$stmt = $conn->prepare("SELECT id, username, passcode FROM players WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$player = $result->fetch_assoc();
if($mode == "signup"){
    if($player){
        echo json_encode(["error" => "Erm... this username is already taken"]);
        exit;
    }
    $hashedPasscode = password_hash($passcode, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO players (username, passcode) VALUES (? , ?)");
    $stmt->bind_param("ss", $username, $hashedPasscode);
    $stmt->execute();
    $newId = $conn->insert_id;
    echo json_encode(["id" => $newId, "username" => $username]);
} else {
    if(!$player){
        echo json_encode(["error" => "Dude , I couldnt even find any account with that username"]);
        exit;
    }
    if(!password_verify($passcode, $player["passcode"])){
        echo json_encode(["error" => "oops, wrong passcode"]);
        exit;
    }
    echo json_encode(["id" => $player["id"], "username" => $player["username"]]);  
}
?>