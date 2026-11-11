<?php
// 1. CORS Headers - Configured for localhost development
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");

// 2. CRITICAL: Handle preflight OPTIONS request immediately
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'connection.php';

// Force JSON response layout
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'] ?? '';
    $summary = $_POST['summary'] ?? '';
    $content = $_POST['content'] ?? '';
    $userId = $_POST['userid'] ?? '';
    $imageFile = $_FILES['image'] ?? null;
    
    // Identifiers for the WHERE clause
    $imageforupdate = $_POST['imageforupdate'] ?? '';
    $date = $_POST['dateforupdate'] ?? '';

    // Default target path is the existing image URL in case they aren't uploading a new one
    $target_path = $imageforupdate; 

    // 3. Process new image only if one was actually uploaded
    if ($imageFile && $imageFile['error'] === UPLOAD_ERR_OK) {
        $original_name = basename($imageFile['name']);
        $target_dir = "uploads/";
        
        // Ensure directory exists
        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0755, true);
        }

        $unique_name = time() . "_" . $original_name;
        $target_path = $target_dir . $unique_name;

        move_uploaded_file($imageFile['tmp_name'], $target_path);
    }

    // 4. Sanitize inputs to prevent database execution errors
    $userId = $conn->real_escape_string($userId);
    $title = $conn->real_escape_string($title);
    $summary = $conn->real_escape_string($summary);
    $content = $conn->real_escape_string($content);
    $target_path = $conn->real_escape_string($target_path);
    $imageforupdate = $conn->real_escape_string($imageforupdate);
    $date = $conn->real_escape_string($date);

    // 5. Run the SQL UPDATE query
    $query = "UPDATE blogdetails 
              SET id = '$userId', title = '$title', summary = '$summary', content = '$content', image = '$target_path' 
              WHERE image = '$imageforupdate' AND date = '$date'";
              
    $result = $conn->query($query);

    // 6. Always return a JSON response
    if ($result) {
        echo json_encode([
            "status" => true,
            "message" => "Post updated successfully"
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "status" => false,
            "message" => "Database update failed: " . $conn->error
        ]);
    }
    exit();
}
?>