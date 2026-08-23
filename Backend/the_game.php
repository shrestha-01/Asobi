<?php 
session_start();
require "db.php";

$baseDif = $_POST["baseDif"];
$hardcoreValue = $_POST["hardcore"];

$ranges = [
    "beginner" => [1, 10],
    "normal" => [1, 100],
    "hard" => [1, 1000],
    "expert" => [1, 10000],
    "master" => [1, 100000],
    "impossible" => [1, 1000000]
];
$isCustom = strpos($baseDif, "custom") !== false;
if($isCustom){
    $minNum = (int)$_POST["minNum"];
    $maxNum= (int)$_POST["maxNum"];
} else if(isset($ranges[$baseDif])){
    $minNum = $ranges[$baseDif][0];
    $maxNum = $ranges[$baseDif][1];
} else {
    $minNum = 1;
    $maxNum = 10;
    $baseDif = "beginner";
}

$imposter = rand($minNum, $maxNum);
$_SESSION["imposter"] = $imposter;
$_SESSION["minNum"] = $minNum;
$_SESSION["maxNum"] = $maxNum;
$_SESSION["guessCount"] = 0;
$_SESSION["diff"] =  $baseDif;

if($hardcoreValue == "1"){
    $_SESSION["hard"] = true;
} else {
    $_SESSION["hard"] = false;
}
echo json_encode(["ready" => true]);
?>