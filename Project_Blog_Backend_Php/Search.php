
<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// Handle CORS preflight request.
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "message" => "Method not allowed"
    ]);
    exit;
}

include 'connection.php';

// Read JSON request.
$data = json_decode(file_get_contents("php://input"), true);

$title = trim($data['TitleForSearch'] ?? '');
$IncrementNumber = $data['IncrementNumber'] ?? 0;

// Validate search title.
if ($title === '') {
    echo json_encode([]);
    exit;
}

// Validate pagination number.
if (
    !is_numeric($IncrementNumber) ||
    (int)$IncrementNumber < 0
) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Invalid pagination number"
    ]);
    exit;
}

$IncrementNumber = (int)$IncrementNumber;

$Limit = 5;
$Offset = $IncrementNumber * $Limit;

// Partial title search.
$SearchPattern = "%" . $title . "%";

$query = "
    SELECT *
    FROM blogdetails
    WHERE TITLE LIKE ?
    ORDER BY ID DESC
    LIMIT ? OFFSET ?
";

$stmt = $conn->prepare($query);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Unable to prepare search query"
    ]);
    exit;
}

$stmt->bind_param(
    "sii",
    $SearchPattern,
    $Limit,
    $Offset
);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Search query failed"
    ]);
    $stmt->close();
    $conn->close();
    exit;
}

$result = $stmt->get_result();

$posts = [];

while ($row = $result->fetch_assoc()) {
    $posts[] = $row;
}

// Always return an array, even when no posts are found.
echo json_encode($posts);

$stmt->close();
$conn->close();

?>
