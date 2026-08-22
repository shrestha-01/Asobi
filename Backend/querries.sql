CREATE DATABASE asobi;
USE asobi;
CREATE TABLE players(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE guess_the_number_scores(
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT,
    difficulty VARCHAR(20),
    score INT,
    attempts INT,
    won TINYINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players(id)
);
SELECT * FROM players;
SELECT * FROM guess_the_number_scores;
TRUNCATE guess_the_number_scores;
ALTER TABLE guess_the_number_scores MODIFY difficulty VARCHAR(50);
ALTER TABLE players ADD passcode VARCHAR(255) NOT NULL DEFAULT '';