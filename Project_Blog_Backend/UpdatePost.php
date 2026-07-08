<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");

include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'] ?? '';
    $summary = $_POST['summary'] ?? '';
    $content = $_POST['content'] ?? '';
    $userId = $_POST['userid'] ?? '';
    $imageFile = $_FILES['image'] ?? null;
    $titleforupdate = $_POST['titleforupdate'] ?? '';
    $imageforupdate = $_POST['imageforupdate'] ?? '';
    $date = $_POST['dateforupdate'] ?? '';
    

    if ($imageFile) {
        $original_name = basename($imageFile['name']);
        $target_dir = "uploads/";
        $unique_name = time() . "_" . $original_name;
        $target_path = $target_dir . $unique_name;


    }

    move_uploaded_file($imageFile['tmp_name'], $target_path);

   $query = "UPDATE blogdetails SET id = '$userId', title = '$title', summary = '$summary', content = '$content', image = '$target_path' WHERE image = '$imageforupdate'AND date = '$date' ";
   $result = $conn->query($query);
   if($result){
    echo json_encode(array("message" => "Post updated successfully"));
   }
}
?>
