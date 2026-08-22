<?php
require "db.php";
$time = $_GET["time"];
$where = "";

if($time == "24h"){
    $where = "WHERE guess_the_number_scores.created_at >= NOW() - INTERVAL 1 DAY";
} else if($time == "week"){
    $where = "WHERE guess_the_number_scores.created_at >= NOW() - INTERVAL 7 DAY";
}

$sql = "SELECT players.username, SUM(guess_the_number_scores.score) AS score, COUNT(*) AS games
FROM guess_the_number_scores
JOIN players
ON guess_the_number_scores.player_id = players.id " . $where . "
GROUP BY players.id
ORDER BY score DESC
LIMIT 100";
$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();
$scores = [];
while($row = $result->fetch_assoc()){
    $scores[] = $row;
}
echo json_encode($scores);
?>