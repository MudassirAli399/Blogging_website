<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

session_start();

if(isset($_SESSION['username']) || isset($_SESSION['email'])){

  
    echo json_encode([
        'username' => $_SESSION['username'],
        'email' => $_SESSION['email'],
        'status' => true,
        'id' => $_SESSION['id'] 

    ]);
}
else{
    echo json_encode(['status' => false]);
}


?>
