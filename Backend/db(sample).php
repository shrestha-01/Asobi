<?php
$host = ""; //host name here
$dbUser = ""; //database username here
$dbPass = ""; //database password here
$dbName = ""; //database name here

$conn = new mysqli($host, $dbUser, $dbPass, $dbName);

if($conn->connect_error){
    die("Connection failed: ". $conn->connect_error);
}
?>
