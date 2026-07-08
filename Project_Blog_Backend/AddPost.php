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
    $date = $_POST['date'] ?? '';
    $Frontend_Id = $_POST['Frontend-Id'] ?? '';

    

    if ($imageFile) {
        $original_name = basename($imageFile['name']);
        $target_dir = "uploads/";
        $unique_name = time() . "_" . $original_name;
        $target_path = $target_dir . $unique_name;


    }

    move_uploaded_file($imageFile['tmp_name'], $target_path);

   $query = "Insert INTO blogdetails(Frontend_Id,TITLE,SUMMARY,CONTENT,id,IMAGE,date) VALUES('$Frontend_Id','$title','$summary','$content','$userId','$target_path','$date')";

   $result = $conn->query($query);
// this will send data to line 81 of elements/AddPostForm.jsx
   if($result){
    echo json_encode(['status' => true,
                            "message" => "Post added successfully",

]);
   }

}
?>
