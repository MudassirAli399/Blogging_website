
<?php

// 1. CORS Configuration

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// 2. Handle OPTIONS Request

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 3. Allow Only POST Request

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {

    http_response_code(405);

    echo json_encode([
        'status' => 'error',
        'message' => 'Method not allowed'
    ]);

    exit();
}

// 4. Database Connection

include 'connection.php';

session_start();

// 5. Receive JSON Data

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {

    http_response_code(400);

    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request data'
    ]);

    exit();
}

// 6. Extract User Information

$username = trim($data['username'] ?? '');
$email = strtolower(trim($data['email'] ?? ''));
$password = $data['password'] ?? '';

// 7. Validate Required Fields

if (empty($username) || empty($email) || empty($password)) {

    http_response_code(400);

    echo json_encode([
        'status' => 'error',
        'message' => 'All fields are required'
    ]);

    exit();
}

// 8. Validate Email

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

    http_response_code(400);

    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid email address'
    ]);

    exit();
}

// 9. Hash Password

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// 10. Insert User Into Database

$query = "INSERT INTO test (NAME, EMAIL, PASSWORD)
          VALUES (?, ?, ?)";

$stmt = $conn->prepare($query);

if (!$stmt) {

    http_response_code(500);

    echo json_encode([
        'status' => 'error',
        'message' => 'Database query preparation failed'
    ]);

    exit();
}

$stmt->bind_param(
    "sss",
    $username,
    $email,
    $hashedPassword
);

// 11. Execute Query

if ($stmt->execute()) {

    // Get Auto Increment ID
    $userId = $conn->insert_id;

    // 12. Create Session
    session_regenerate_id(true);

    $_SESSION['id'] = $userId;
    $_SESSION['email'] = $email;
    $_SESSION['username'] = $username;

    // 13. Send Success Response

    echo json_encode([
        'status' => 'success',
        'message' => 'Account created successfully',
        'user' => $username,
        'id' => $userId,
        'email' => $email
    ]);

} else {

    // 14. Handle Duplicate Email

    if ($conn->errno == 1062) {

        http_response_code(409);

        echo json_encode([
            'status' => 'error',
            'message' => 'Email already exists'
        ]);

    } else {

        http_response_code(500);

        echo json_encode([
            'status' => 'error',
            'message' => 'Error creating account'
        ]);

    }

}

$stmt->close();
$conn->close();

exit();

?>
