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
    <link rel="stylesheet" href="../index.css">
    <link rel="stylesheet" href="./program.css">
    <script type="text/javascript">
        const userId = <?php echo json_encode($userId); ?>;
    </script>
    <title>GreekGods | Program</title>
</head>
<body>
    <nav>
        <button class="nav-menu-button" id="nav-menu-button">
            <img src="../graphics/svg/menu-black.svg" alt="Menu" title="Menu">
        </button>
        <div class="nav-logo">
            <img src="../graphics/logo/greekgodslogo.png" alt="GreekGods" title="GreekGods" onclick="window.location.href='../index.php'">
        </div>
        <button class="nav-menu-profile" id="nav-menu-profile" onclick="window.location.href='./register.html'">
            <img src="../graphics/svg/profile.svg" alt="Profile" title="Profile">
        </button>
        <ul class="nav-links" id="nav-links">
            <li><a href="../index.php">HOME</a></li>
            <li><a href="./program.php" onclick="location.reload(); return false;">PROGRAM</a></li>
            <li><a href="./blog.php">BLOG</a></li>
            <li><a href="./calculator.php">CALCULATOR</a></li>
            <li><a href="./about.php">ABOUT</a></li>
        </ul>
        <div class="nav-button">
            <button id="register-button" onclick="window.location.href='./register.html'">GET STARTED</button>
            <button id="profile-button" onclick="window.location.href='./profile.php'"><img src="../graphics/svg/profile.svg" alt="Profile" title="Profile"></button>
            <span id="profile-name"><?php echo htmlspecialchars($firstName . " " . $lastName); ?></span>
        </div>
    </nav>
    <header>
        <div class="header-container">
            <div class="header-sections">
                <h1 id="header-welcome-message">HI, <?php echo htmlspecialchars($firstName); ?>!</h1>
                <p>Let's start to plan your weekly workouts.</p>
            </div>
        </div>
    </header>
    <section>
        <div class="section-container">
            <div class="section-select-container">
                <div class="section-select">
                    <label for="workout-splits">Workout Splits</label>
                    <select name="header-workout-splits" id="workout-splits">
                        <option value="" disabled selected>Select Workout Split</option>
                        <option value="full-body">Full Body</option>
                        <option value="upper-lower">Upper Lower Split</option>
                        <option value="push-pull-legs">Push Pull Legs Split</option>
                        <option value="push-pull">Push Pull Split</option>
                        <option value="bro-split">Body Part Workout Split (Bro Split)</option>
                    </select>
                </div>
                <div class="section-select">
                    <label for="workout-splits-options">Days</label>
                    <select name="header-workout-splits-options" id="workout-splits-options">
                        <option value="" disabled selected>Select Days</option>
                    </select>
                </div>
            </div>
            <div class="section-save">
                <button id="save-program">SAVE PROGRAM</button>
            </div>
        </div>
    </section>
    <main>
        <div class="main-container">                
            <div class="main-days" id="monday">
                <h4>Monday</h4>
                <div class="split">
                    <h5 class="split-name"></h5>
                    <div class="workouts"></div>
                    <button class="add"></button>
                </div>
            </div>
            <div class="main-days" id="tuesday">
                <h4>Tuesday</h4>
                <div class="split">
                    <h5 class="split-name"></h5>
                    <div class="workouts"></div>
                    <button class="add"></button>
                </div>
            </div>
            <div class="main-days" id="wednesday">
                <h4>Wednesday</h4>
                <div class="split">
                    <h5 class="split-name"></h5>
                    <div class="workouts"></div>
                    <button class="add"></button>
                </div>
            </div>
            <div class="main-days" id="thursday">
                <h4>Thursday</h4>
                <div class="split">
                    <h5 class="split-name"></h5>
                    <div class="workouts"></div>
                    <button class="add"></button>
                </div>
            </div>
            <div class="main-days" id="friday">
                <h4>Friday</h4>
                <div class="split">
                    <h5 class="split-name"></h5>
                    <div class="workouts"></div>
                    <button class="add"></button>
                </div>
            </div>
            <div class="main-days" id="saturday">
                <h4>Saturday</h4>
                <div class="split">
                    <h5 class="split-name"></h5>
                    <div class="workouts"></div>
                    <button class="add"></button>
                </div>
            </div>
            <div class="main-days" id="sunday">
                <h4>Sunday</h4>
                <div class="split">
                    <h5 class="split-name"></h5>
                    <div class="workouts"></div>
                    <button class="add"></button>
                </div>
            </div>
        </div>
    </main>

    <!-- DISPLAY:NONE -->
    <form action="" class="add-workout">
        <label for="form-workout">Workout</label>
        <input type="text" id="workout-name">
        <div class="autocomplete-suggestions"></div>
        <label for="form-sets">Sets</label>
        <input type="number" min="1" max="50" id="workout-sets">
        <label for="form-reps">Reps</label>
        <input type="number" min="1" max="50" id="workout-reps">
        <button id="form-add">Add</button>
    </form>
    
    <form class="workouts-div">
        <input type="text" class="workout-name" readonly>
        <div class="number">
            <input type="number" min="1" max="50" class="workout-sets" readonly>
            <input type="number" min="1" max="50" class="workout-reps" readonly>
        </div>
        <button class="delete"></button>
    </form>
    <footer>
        <div class="footer-container">
            <ul class="footer-links">
                <li><a href="../index.php">HOME</a></li>
                <li><a href="./blog.php">BLOG</a></li>
                <li><a href="./about.php">ABOUT</a></li>
                <li><a href="./laws.html">DISCLAIMER</a></li>
                <li><a href="./about.php">CONTACT</a></li>
                <li><a href="./laws.html">PRIVACY POLICY</a></li>
                <li><a href="./laws.html">TERMS OF USE</a></li>
            </ul>
            <div class="footer-socials">
                <a href="https://www.facebook.com" target="_blank">
                    <img src="../graphics/socials/facebook.png" alt="Facebook" title="Facebook">
                </a>
                <a href="https://www.instagram.com" target="_blank">
                    <img src="../graphics/socials/instagram.png" alt="Instagram" title="Instagram">
                </a>
                <a href="https://www.twitter.com" target="_blank">
                    <img src="../graphics/socials/twitter.png" alt="Twitter" title="Twitter">
                </a>
            </div>
            <div class="footer-copyright">
                <p>&copy; 2024 GreekGods. All rights reserved.</p>
            </div>
        </div>
    </footer>
    <script src="../index.js"></script>
    <script src="program.js"></script>
</body>
</html>