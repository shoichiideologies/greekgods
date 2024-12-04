<?php
session_start();
header('Content-Type: application/json');

$userId = $_SESSION['user_id'];
if (!$userId) {
    echo json_encode(['success' => false, 'message' => 'User not logged in.']);
    exit();
}

// Database connection
$servername = "sql205.infinityfree.com"; // Replace with your database server
$username = "if0_37850282"; // Replace with your database username
$password = "4oxm7N4BFghQI9U"; // Replace with your database password
$dbname = "if0_37850282_register"; // Replace with your database name

$conn = new mysqli($localhost, $username, $dbPassword, $dbname);
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
    exit();
}

// Fetch user data
$stmt = $conn->prepare("SELECT email, password, firstName, lastName, birthdate, height, weight, activity FROM users WHERE user_id = ?");
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