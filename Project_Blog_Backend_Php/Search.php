<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");

include 'connection.php';

$data = json_decode(file_get_contents("php://input"), true);

$title = $data['TitleForSearch'] ?? '';
$IncrementNumber = $data['IncrementNumber'] ?? 0;
$Offset = $IncrementNumber * 5;
$query = "SELECT * FROM blogdetails WHERE TITLE = '$title' LIMIT 5 OFFSET $Offset";
$result = $conn->query($query);
   if ($result->num_rows > 0) {
    $posts = array();
    while ($row = $result->fetch_assoc()) {
        $posts[] = $row;
    }
    echo json_encode($posts);
} 
else {
    echo json_encode(false);
}
?>