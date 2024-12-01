<?php
session_start();

$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$dbname = "register"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Initialize error message variable
$error_message = "";

// Step 2: Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Step 3: Retrieve form inputs
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Step 4: Sanitize inputs to prevent SQL Injection
    $email = mysqli_real_escape_string($conn, $email);
    $password = mysqli_real_escape_string($conn, $password);

    // Step 5: Query the database to check if the email and password exist
    $sql = "SELECT user_id FROM users WHERE email='$email' AND password='$password'";
    $result = $conn->query($sql);

    // Step 6: Check if a matching record is found
    if ($result->num_rows > 0) {
        // Fetch the user_id
        $row = $result->fetch_assoc();
        $userId = $row['user_id'];
        $_SESSION['user_id'] = $userId;

        // Redirect to the profile page with user_id as a query parameter
        header("Location: ./profile.php");
        exit();
    } else {
        // No matching user found, set error message
        $error_message = "Invalid email or password.";
    }
}

// Step 7: Close the connection
$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="login.css">
    <title>GreekGods | Login</title>
</head>
<body>
    <div class="container">
        <form id="login-form" action="login.php" method="POST">
            <img src="/Github/greekgods/graphics/logo/logo.png" onclick="location.href='/index.html'" alt="Logo" title="Click here to redirect to home">
            <p>Login</p>
            <p id="description">Ready to power up your fitness journey? We're excited to see you back—let’s keep reaching those goals together!</p>
        
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="e.g. ada.lovelace@icloud.com" required>
        
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>
        
            <!-- Error message container, display error from PHP -->
            <div class="error-message-container">
                <?php
                // Display the error message if it exists
                if (!empty($error_message)) {
                    echo '<p class="error-message">' . htmlspecialchars($error_message) . '</p>';
                }
                ?>
            </div>
        
            <button type="submit">Login</button>
            <hr>
            <p>New to GreekGods? Create an account to start your fitness journey with us! <a href="register.html">Register</a></p>
        </form>        
    </div>
    <script src="login.js"></script>
</body>
</html>