<?php
// Step 1: Establish database connection
$servername = "localhost"; // Change this to your DB host
$username = "root"; // Your database username
$password = ""; // Your database password
$dbname = "register"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Step 2: Retrieve form inputs
$email = $_POST['email'];
$password = $_POST['password'];

// Step 3: Sanitize inputs to prevent SQL Injection
$email = mysqli_real_escape_string($conn, $email);
$password = mysqli_real_escape_string($conn, $password);

// Step 4: Query the database to check if the email and password exist
$sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
$result = $conn->query($sql);

// Step 5: Check if a matching record is found
if ($result->num_rows > 0) {
    // Successfully logged in
    // Redirect to the user dashboard or home page
    header("Location: ./profile.php"); // Change this to the page after successful login
    exit();
} else {
    // No matching user found, redirect with error message
    header("Location: login.html?error=Invalid email or password");
    exit();
}

// Step 6: Close the connection
$conn->close();
?>