<?php
session_start();

if(isset($_SESSOIN["p_id"])){
    echo json_encode(["loggedIn" => true]);
} else {
    echo json_encode(["loggedIn" => false]);
}
?>