<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include 'connection.php';

session_start();
$data = json_decode(file_get_contents('php://input'), true);

if($data){

    $conn->begin_transaction();

    $password = $data['password'];
    $email = $data['useremail'];
    
    
    $query = "SELECT * FROM test WHERE EMAIL = '$email' AND PASSWORD = '$password'";
   

    
    $result = $conn->query($query);
    if($result){
        $user = $result->fetch_assoc();
        
    }

    if ($result && $result->num_rows > 0) {
        $conn->commit();
        
        


        echo json_encode([
            'status' => 'success',
            'message' => 'Login successful',
            'user' => $user  
        ]);
    } else {
        $conn->rollback();
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid username or password'
        ]);
    }
}
?>
