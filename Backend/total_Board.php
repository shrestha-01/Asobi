<?php
require "db.php";
$sql = "SELECT players.username, SUM(guess_the_number_scores.score) AS score
FROM guess_the_number_scores
JOIN players
ON guess_the_number_scores.player_id = players.id
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