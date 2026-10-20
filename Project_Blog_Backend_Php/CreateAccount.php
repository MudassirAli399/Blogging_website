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



    $username = $data['username'];
    $password = $data['password'];
    $email = $data['email'];

    $query = "INSERT INTO test(NAME, EMAIL, PASSWORD) VALUES ('$username','$email','$password')";

    if ($conn->query($query) === TRUE) {
        $userId = $conn->insert_id;
        $conn->commit();

          
              
        $_SESSION['id'] = $userId;
        $_SESSION['email'] = $email;
        $_SESSION['username'] = $username;

        echo json_encode([
            'status' => 'success',
            'message' => 'Account created successfully',
            'user' => $username,
            'id' => $userId,
            'email' => $email
        ]);
    } else {
        $conn->rollback();
        echo json_encode([
            'status' => 'error',
            'message' => 'Error creating account:'
        ]);
    }

}







?>