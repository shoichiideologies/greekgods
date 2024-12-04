<?php
session_start();
header('Content-Type: application/json');

$userId = $_SESSION['user_id'];
if (!$userId) {
    echo json_encode(['success' => false, 'message' => 'User not logged in.']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    echo json_encode(['success' => false, 'message' => 'No data provided.']);
    exit();
}

// Database connection
$localhost = "localhost";
$username = "root";
$dbPassword = "";
$dbname = "register";

$conn = new mysqli($localhost, $username, $dbPassword, $dbname);
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
    exit();
}

// Update user data
$stmt = $conn->prepare("
    UPDATE users
    SET email = ?, password = ?, firstName = ?, lastName = ?, birthdate = ?, height = ?, weight = ?, activity = ?
    WHERE user_id = ?
");
$stmt->bind_param(
    "ssssssssi",
    $data['email'],
    $data['password'],
    $data['firstName'],
    $data['lastName'],
    $data['birthdate'],
    $data['height'],
    $data['weight'],
    $data['activity'],
    $userId
);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to update data.']);
}

$stmt->close();
$conn->close();
?>