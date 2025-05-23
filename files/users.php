<?php
session_start();
// Retrieve email and password from POST data
$email = $_POST['email'] ?? null;
$password = $_POST['password'] ?? null;
$firstName = $_POST['first-name'] ?? null;
$lastName = $_POST['last-name'] ?? null;
$birthdate = $_POST['birthdate'] ?? null;
$height = $_POST['height'] ?? null;
$weight = $_POST['weight'] ?? null;
$activity = $_POST['activity'] ?? null;

// Validate required fields (ensure all fields are filled)
if (!$email || !$password || !$firstName || !$lastName || !$birthdate || !$height || !$weight || !$activity) {
    die("Error: Missing required fields.");
}

$servername = "sql205.infinityfree.com"; // Replace with your database server
$username = "if0_37850282"; // Replace with your database username
$password = "4oxm7N4BFghQI9U"; // Replace with your database password
$dbname = "if0_37850282_register"; // Replace with your database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("INSERT INTO users (email, password, firstName, lastName, birthdate, height, weight, activity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssssss", $email, $password, $firstName, $lastName, $birthdate, $height, $weight, $activity);

// Execute the query to insert the data
if ($stmt->execute()) {
    // Get the user_id of the last inserted record
    $userId = $conn->insert_id;
    $_SESSION['user_id'] = $userId;

    // Redirect to profile.php with user_id in the query 'string
    header("Location: ./profile.php");
    exit;
} else {
    echo "Error: " . $stmt->error;
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>