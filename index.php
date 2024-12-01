<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: ../login.php");
    exit();
}

$userId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

$servername = "localhost"; // Replace with your database server
$username = "root"; // Replace with your database username
$password = ""; // Replace with your database password
$dbname = "register"; // Replace with your database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT firstName, lastName FROM users WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$stmt->bind_result($firstName, $lastName);
$stmt->fetch();
$stmt->close();
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="./graphics/logo/logo.png">
    <link rel="stylesheet" href="./index.css">
    <script type="text/javascript">
        const userId = <?php echo json_encode($userId); ?>;
    </script>
    <script type="text/javascript" src="/Github/greekgods/index.js" defer></script>
    <title>GreekGods | Home</title>
</head>
<body>
    <div class="container">
        <nav>
            <button class="nav-menu-button" id="nav-menu-button">
                <img src="./graphics/svg/menu-black.svg" alt="Menu" title="Menu">
            </button>
            <div class="nav-logo">
                <img src="./graphics/logo/greekgodslogo.png" alt="GreekGods" title="GreekGods" onclick="location.reload(); return false;">
            </div>
            <button class="nav-menu-profile" id="nav-menu-profile" onclick="window.location.href='/Github/greekgods/files/register.html'">
                <img src="./graphics/svg/profile.svg" alt="Profile" title="Profile">
            </button>
            <ul class="nav-links" id="nav-links">
                <li><a href="index.php" onclick="location.reload(); return false;">HOME</a></li>
                <li><a href="./files/program.html">PROGRAM</a></li>
                <li><a href="./files/blog.html">BLOG</a></li>
                <li><a href="./files/calculator.html">CALCULATOR</a></li>
                <li><a href="./files/about.html">ABOUT</a></li>
            </ul>
            <div class="nav-button">
                <button id="register-button" onclick="window.location.href='./files/register.html'">GET STARTED</button>
                <button id="profile-button" onclick="window.location.href='./files/profile.php'"><img src="./graphics/svg/profile.svg" alt="Profile" title="Profile"></button>
                <span id="profile-name"><?php echo htmlspecialchars($firstName . " " . $lastName); ?></span>
            </div>
        </nav>
        <header>
            <div class="header-container">
                <img src="/Github/greekgods/graphics/images/welcome-image.png" alt="people barbell exercise">
                <div class="header-add">
                    <span class="header-descriptions">
                        <p>Build confidence, be stronger, and transform.</p>
                        <p>START YOUR JOURNEY NOW.</p>
                    </span>
                    <button onclick="window.location.href='/Github/greekgods/files/register.html'">REGISTER</button>
                </div>
            </div>
        </header>
        <main>
            <section>
                <h2>User ID: <?php echo htmlspecialchars($userId); ?></h2>
            </section>
        </main>
        <footer>
            <div class="footer-container">
                <ul class="footer-links">
                    <li><a href="index.html" onclick="location.reload(); return false;">HOME</a></li>
                    <li><a href="./files/blog.html">BLOG</a></li>
                    <li><a href="./files/about.html">ABOUT</a></li>
                    <li><a href="./files/laws.html">DISCLAIMER</a></li>
                    <li><a href="./files/about.html">CONTACT</a></li>
                    <li><a href="./files/laws.html">PRIVACY POLICY</a></li>
                    <li><a href="./files/laws.html">TERMS OF USE</a></li>
                </ul>
                <div class="footer-socials">
                    <a href="https://www.facebook.com" target="_blank">
                        <img src="./graphics/socials/facebook.png" alt="Facebook" title="Facebook">
                    </a>
                    <a href="https://www.instagram.com" target="_blank">
                        <img src="./graphics/socials/instagram.png" alt="Instagram" title="Instagram">
                    </a>
                    <a href="https://www.twitter.com" target="_blank">
                        <img src="./graphics/socials/twitter.png" alt="Twitter" title="Twitter">
                    </a>
                </div>
                <div class="footer-copyright">
                    <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">&copy; 2024 GreekGods. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </div>
    <script src="index.js"></script>
</body>
</html>