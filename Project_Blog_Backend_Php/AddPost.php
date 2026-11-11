
<?php

// 1. CORS Configuration

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");

// Handle Preflight Request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'connection.php';

header('Content-Type: application/json');

// 2. Handle POST Request

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Receive FormData fields
    $title = $_POST['title'] ?? '';
    $summary = $_POST['summary'] ?? '';
    $content = $_POST['content'] ?? '';
    $userId = $_POST['userid'] ?? '';
    $frontendId = $_POST['Frontend-Id'] ?? '';
    $date = $_POST['date'] ?? '';

    // Receive Image
    $imageFile = $_FILES['image'] ?? null;

    $target_path = '';

    // 3. Validate Required Fields

    if (
        empty($title) ||
        empty($summary) ||
        empty($content) ||
        empty($userId) ||
        empty($frontendId) ||
        empty($date)
    ) {
        http_response_code(400);

        echo json_encode([
            'status' => false,
            'message' => 'All fields are required'
        ]);

        exit();
    }

    // 4. Process Image

    if ($imageFile && $imageFile['error'] === UPLOAD_ERR_OK) {

        $target_dir = "uploads/";

        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0755, true);
        }

        // Validate Image Type
        $allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

        $fileType = mime_content_type($imageFile['tmp_name']);

        if (!in_array($fileType, $allowedTypes)) {

            http_response_code(400);

            echo json_encode([
                'status' => false,
                'message' => 'Invalid image format'
            ]);

            exit();
        }

        // Generate Unique Image Name
        $extension = strtolower(pathinfo($imageFile['name'], PATHINFO_EXTENSION));

        $unique_name = uniqid('blog_', true) . '.' . $extension;

        $target_path = $target_dir . $unique_name;

        if (!move_uploaded_file($imageFile['tmp_name'], $target_path)) {

            http_response_code(500);

            echo json_encode([
                'status' => false,
                'message' => 'Image upload failed'
            ]);

            exit();
        }

    } else {

        http_response_code(400);

        echo json_encode([
            'status' => false,
            'message' => 'Image is required'
        ]);

        exit();
    }

    // 5. Insert Data into Database Using Prepared Statement

    $query = "INSERT INTO blogdetails
    (User_Id, Frontend_Id, TITLE, SUMMARY, CONTENT, IMAGE, date)
    VALUES (?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($query);

    if (!$stmt) {

        http_response_code(500);

        echo json_encode([
            'status' => false,
            'message' => 'Database preparation failed'
        ]);

        exit();
    }

    $stmt->bind_param(
        "sssssss",
        $userId,
        $frontendId,
        $title,
        $summary,
        $content,
        $target_path,
        $date
    );

    $result = $stmt->execute();

    // 6. Send Response

    if ($result) {

        echo json_encode([
            'status' => true,
            'message' => 'Post added successfully',
            'id' => $stmt->insert_id,
            'userid' => $userId,
            'frontendid' => $frontendId,
            'image' => $target_path
        ]);

    } else {

        http_response_code(500);

        echo json_encode([
            'status' => false,
            'message' => 'Database error: ' . $stmt->error
        ]);

    }

    $stmt->close();
    $conn->close();

    exit();
}

?>
