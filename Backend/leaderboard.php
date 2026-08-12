<?php
require "db.php";
$difficulty = $_GET["difficulty"];
$sql="SELECT players.username, SUM(guess_the_number_scores.score) AS score
FROM guess_the_number_scores
JOIN players
ON guess_the_number_scores.player_id = players.id
WHERE difficulty = ?
GROUP BY players.id
ORDER BY score DESC
LIMIT 100";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $difficulty);
$stmt->execute();
$result = $stmt->get_result();
$scores = [];
while($row = $result->fetch_assoc()){
    $scores[]= $row;
}
echo json_encode($scores);
?>