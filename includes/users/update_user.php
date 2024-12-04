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
$servername = "sql205.infinityfree.com"; // Replace with your database server
$username = "if0_37850282"; // Replace with your database username
$password = "4oxm7N4BFghQI9U"; // Replace with your database password
$dbname = "if0_37850282_register"; // Replace with your database name

$conn = new mysqli($servername, $username, $password, $dbname);
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