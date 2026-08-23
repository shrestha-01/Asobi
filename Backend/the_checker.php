<?php
session_start();
require "db.php";

$playerGuess = $_POST["guess"];
$playerGuess = (int)$playerGuess;
$baseDif = $_POST["baseDif"];
$hardcore = $_POST["hardcore"];

$imposter = $_SESSION["imposter"];

if(!isset($_SESSION["guessCount"])){
    $_SESSION["guessCount"] = 0;
}
$_SESSION["guessCount"] = $_SESSION["guessCount"] + 1;
$guessCount = $_SESSION["guessCount"];

$basePoints = [
    "beginner" => 10,
    "normal" => 25,
    "hard" => 50,
    "expert" => 100,
    "master" => 200,
    "impossible" => 500
];
$attemptPenalty = [
    "beginner" => 1,
    "normal" => 2,
    "hard" => 3,
    "expert" => 4,
    "master" => 5,
    "impossible" => 6
];
$minimumPoints = [
    "beginner" => 2,
    "normal" => 5,
    "hard" => 10,
    "expert" => 20,
    "master" => 40,
    "impossible" => 100
];

$result = "";
$points = 0;
if($playerGuess > $imposter){
    $result = "high";
} else if($playerGuess < $imposter){
    $result = "low";
} else {
    $result = "correct";
    $isCustom = strpos($baseDif, "custom") !== false;
    if(!$isCustom && isset($basePoints[$baseDif])){
        $points = $basePoints[$baseDif] - (($guessCount - 1) * $attemptPenalty[$baseDif]);
        if($points < $minimumPoints[$baseDif]){
            $points = $minimumPoints[$baseDif];
        }
        if($hardcore == "1"){
            $points = $points * 2;
        }
    }
}
$range = $_SESSION["maxNum"] - $_SESSION["minNum"];
$distance = abs($playerGuess - $imposter);
$closeness = "far";
if($result == "correct"){
    $closeness = "";
} else if($distance < $range * 0.05){
    $closeness = "close";
} else if($distance < $range * 0.2){
    $closeness = "warm";
}
echo json_encode(["result" => $result, "guesses" => $guessCount, "points" => $points, "closeness" => $closeness]);
?>