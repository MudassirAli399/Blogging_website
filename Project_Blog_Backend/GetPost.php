<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
include 'connection.php';

$conn->begin_transaction();
$query = "SELECT * FROM blogdetails";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $posts = array();
    while ($row = $result->fetch_assoc()) {
        $posts[] = $row;
    }
    echo json_encode($posts);
} else {
    echo json_encode(array());
}
$conn->commit();

?>