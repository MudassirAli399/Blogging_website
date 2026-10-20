<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");

include 'connection.php';

$data = json_decode(file_get_contents("php://input"), true);

$date = $data['Date'] ?? '';

$query = "DELETE FROM blogdetails WHERE date = '$date'";
$result = $conn->query($query);
   if($result){
    echo json_encode(array("message" => "Post updated successfully",
    "date" => $date,
    "result" => $result
    ));
   }
?>