<?php
require "db.php";
$difficulty = $_GET["difficulty"];
$time = $_GET["time"];
$extra = "";
if($time == "24h"){
    $extra = "AND guess_the_number_scores.created_at >= NOW() - INTERVAL 1 DAY";
} else if($time == "week"){
    $extra = "AND guess_the_number_scores.created_at >= NOW() - INTERVAL 7 DAY";
}
$sql = "SELECT players.username, SUM(guess_the_number_scores.score) AS score, COUNT(*) AS games
FROM guess_the_number_scores
JOIN players
ON guess_the_number_scores.player_id = players.id
WHERE difficulty = ? " . $extra . "
GROUP BY players.id
ORDER BY score DESC
LIMIT 100";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $difficulty);
$stmt->execute();
$result = $stmt->get_result();
$scores = [];
while($row = $result->fetch_assoc()){
    $scores[] =$row;
}
echo json_encode($scores);
?>