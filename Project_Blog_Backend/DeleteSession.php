<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include 'connection.php';

session_start();

session_unset();


session_destroy();
if (ini_get("session.use_cookies")) {
    setcookie(session_name(), '', time() - 3600, "/");
}



?>