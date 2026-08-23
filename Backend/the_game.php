<?php
session_start();
require "db.php";
$minNum = $_POST["minNum"];
$maxNum = $_POST["maxNum"];
$minNum = (int)$minNum;
$maxNum = (int)$maxNum;

$imposter = rand($minNum, $maxNum);
$_SESSION["imposter"] = $imposter;
$_SESSION["minNum"] =  $minNum;
$_SESSION["maxNum"] = $maxNum;

echo json_encode(["ready" => true]);
?>