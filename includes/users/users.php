<?php
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

// Database connection details
$localhost = "localhost";
$username = "root";
$dbPassword = ""; // Database password (leave empty if no password is set)
$dbname = "register"; // Database name

// Establish a connection to the database
$conn = new mysqli($localhost, $username, $dbPassword, $dbname);

// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare SQL statement to insert data into the 'users' table
$stmt = $conn->prepare("INSERT INTO users (email, password, firstName, lastName, birthdate, height, weight, activity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssssss", $email, $password, $firstName, $lastName, $birthdate, $height, $weight, $activity);

// Execute the query to insert the data
if ($stmt->execute()) {
    echo "New record created successfully"; // Success message
    header("Location: /Github/greekgods/index.html"); // Redirect to home page
    exit;
} else {
    echo "Error: " . $stmt->error;
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>