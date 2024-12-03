<?php
session_start();
header('Content-Type: application/json');

$userId = $_SESSION['user_id'];
if (!$userId) {
    echo json_encode(['success' => false, 'message' => 'User not logged in.']);
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

// Fetch user data
$stmt = $conn->prepare("SELECT email, firstName, lastName, birthdate, height, weight, activity FROM users WHERE user_id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode(['success' => true, 'user' => $user]);
} else {
    echo json_encode(['success' => false, 'message' => 'User not found.']);
}

$stmt->close();
$conn->close();
?>