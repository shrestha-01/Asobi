<?php
require "db.php";
$username = $_POST["username"];
$username = trim($username);

if($username == ""){
    echo json_encode(["error" => "empty username"]);
    exit;
}

$stmt = $conn->prepare("SELECT id, username FROM players WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$player = $result->fetch_assoc();

if($player){
    echo json_encode(["error" => "Emr.. this username is already taken"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO players (username) VALUES (?)");
$stmt->bind_param("s", $username);
$stmt->execute();

$newId = $conn->insert_id;
echo json_encode(["id" => $newId, "username" => $username]);
?>