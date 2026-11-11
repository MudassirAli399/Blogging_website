
<?php

// 1. CORS Configuration

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// 2. Handle Preflight Request

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {

    http_response_code(200);
    exit();

}

// 3. Allow Only POST

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

// 6. Extract Login Information

$email = strtolower(trim($data['useremail'] ?? ''));

$password = $data['password'] ?? '';

// 7. Validate Fields

if (empty($email) || empty($password)) {

    http_response_code(400);

    echo json_encode([
        'status' => 'error',
        'message' => 'Email and password are required'
    ]);

    exit();

}

// 8. Find User By Email

$query = "SELECT id, NAME, EMAIL, PASSWORD
          FROM test
          WHERE EMAIL = ?
          LIMIT 1";

$stmt = $conn->prepare($query);

if (!$stmt) {

    http_response_code(500);

    echo json_encode([
        'status' => 'error',
        'message' => 'Database query preparation failed'
    ]);

    exit();

}

$stmt->bind_param("s", $email);

$stmt->execute();

$result = $stmt->get_result();

// 9. Check User Exists

if ($result && $result->num_rows === 1) {

    $user = $result->fetch_assoc();

    // 10. Verify Hashed Password

    if (password_verify($password, $user['PASSWORD'])) {

        // 11. Regenerate Session ID

        session_regenerate_id(true);

        // 12. Create Session

        $_SESSION['id'] = $user['id'];

        $_SESSION['username'] = $user['NAME'];

        $_SESSION['email'] = $user['EMAIL'];

        // 13. Remove Password Before Sending Response

        unset($user['PASSWORD']);

        // 14. Successful Login Response

        echo json_encode([
            'status' => 'success',
            'message' => 'Login successful',
            'user' => $user
        ]);

    } else {

        // Incorrect Password

        http_response_code(401);

        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid email or password'
        ]);

    }

} else {

    // User Does Not Exist

    http_response_code(401);

    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid email or password'
    ]);

}

$stmt->close();
$conn->close();

exit();

?>
