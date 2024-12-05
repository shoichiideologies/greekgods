<?php
session_start();

$userId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

$servername = "sql205.infinityfree.com"; // Replace with your database server
$username = "if0_37850282"; // Replace with your database username
$password = "4oxm7N4BFghQI9U"; // Replace with your database password
$dbname = "if0_37850282_register"; // Replace with your database name

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
    <title>GreekGods | Advance Workout Splits</title>
    <link rel="icon" type="image/x-icon" href="../graphics/logo/logo.png">
    <link rel="stylesheet" href="../index.css">
    <link rel="stylesheet" href="./article.css">
    <script type="text/javascript">
        const userId = <?php echo json_encode($userId); ?>;
    </script>
</head>
<body>
    <nav>
        <button class="nav-menu-button" id="nav-menu-button">
            <img src="../graphics/svg/menu-black.svg" alt="Menu" title="Menu">
        </button>
        <div class="nav-logo">
            <img src="../graphics/logo/greekgodslogo.png" alt="GreekGods" title="GreekGods" onclick="window.location.href='../index.php'">
        </div>
        <button class="nav-menu-profile" id="nav-menu-profile" onclick="window.location.href='../files/register.html'">
            <img src="../graphics/svg/profile.svg" alt="Profile" title="Profile">
        </button>
        <ul class="nav-links" id="nav-links">
            <li><a href="../index.php">HOME</a></li>
            <li><a href="../files/program.php">PROGRAM</a></li>
            <li><a href="../files/blog.php">BLOG</a></li>
            <li><a href="../files/calculator.php">CALCULATOR</a></li>
            <li><a href="../files/about.php">ABOUT</a></li>
        </ul>
        <div class="nav-button">
            <button id="register-button" onclick="window.location.href='../files/register.html'">GET STARTED</button>
            <button id="profile-button" onclick="window.location.href='../files/profile.php'"><img src="../graphics/svg/profile.svg" alt="Profile" title="Profile"></button>
            <span id="profile-name"><?php echo htmlspecialchars($firstName . " " . $lastName); ?></span>
        </div>
    </nav>
    <header>
        <div class="header-container">
            <h2>The Best Workout Splits for Your Fitness Goals</h2>
            <p>The right workout split can help you target specific muscle groups, optimize recovery, and achieve your fitness goals more efficiently.</p>
        </div>
    </header>
    <main>
        <div class="main-container">
            <div class="main-info">
                <h3>What Is a Workout Split?</h3>
                <p>A <strong>workout split</strong> is a way of organizing your training schedule so that different muscle groups are worked on different days. It allows for more focused training and ample recovery time between sessions, which can help maximize muscle growth and strength gains.</p>
            </div>
            <div class="main-info">
                <h3>Benefits of a Workout Split</h3>
                <ul>
                    <li><strong>Enhancing Recovery:</strong> Targets different muscle groups, reducing the risk of overtraining.</li>
                    <li><strong>Focusing on Weak Points:</strong> Allows for more time on underdeveloped areas.</li>
                    <li><strong>Increasing Training Volume:</strong> Helps you perform more sets and reps for muscle growth.</li>
                    <li><strong>Better Time Efficiency:</strong> Allows for more focused training, making gym sessions more productive.</li>
                </ul>
            </div>
            <div class="main-info">
                <h3>Most Common Workout Splits</h3>
                <h3>1. Full-Body Workout (2-3 days per week)</h3>
                <p><strong>Who it's for:</strong> Beginners or those with limited gym time.</p>
                <p><strong>How it works:</strong> Every workout targets all the major muscle groups.</p>
                <ul>
                    <li>Day 1: Full body (squats, push-ups, deadlifts, rows, planks)</li>
                    <li>Day 2: Full body (lunges, bench press, lat pulldowns, shoulder press, leg curls)</li>
                    <li>Day 3: Full body (deadlifts, chest press, lunges, pull-ups, core exercises)</li>
                </ul>

                <h3>2. Upper/Lower Split (4 days per week)</h3>
                <p><strong>Who it's for:</strong> Beginners to intermediate lifters.</p>
                <p><strong>How it works:</strong> Alternates between upper body and lower body training.</p>
                <ul>
                    <li>Day 1: Upper body (chest, back, shoulders, arms)</li>
                    <li>Day 2: Lower body (quads, hamstrings, glutes, calves)</li>
                    <li>Day 3: Upper body (chest, back, shoulders, arms)</li>
                    <li>Day 4: Lower body (quads, hamstrings, glutes, calves)</li>
                </ul>

                <h3>3. Push/Pull/Legs Split (3-6 days per week)</h3>
                <p><strong>Who it's for:</strong> Intermediate to advanced lifters.</p>
                <p><strong>How it works:</strong> Divides workouts into pushing movements, pulling movements, and legs.</p>
                <ul>
                    <li>Day 1: Push (chest, shoulders, triceps)</li>
                    <li>Day 2: Pull (back, biceps)</li>
                    <li>Day 3: Legs (quads, hamstrings, glutes, calves)</li>
                    <li>Day 4: Push (chest, shoulders, triceps)</li>
                    <li>Day 5: Pull (back, biceps)</li>
                    <li>Day 6: Legs (quads, hamstrings, glutes, calves)</li>
                </ul>

                <h3>4. Body Part Split (5-6 days per week)</h3>
                <p><strong>Who it's for:</strong> Advanced lifters or bodybuilders.</p>
                <p><strong>How it works:</strong> Each workout targets one or two muscle groups per session.</p>
                <ul>
                    <li>Day 1: Chest</li>
                    <li>Day 2: Back</li>
                    <li>Day 3: Legs</li>
                    <li>Day 4: Shoulders</li>
                    <li>Day 5: Arms (biceps and triceps)</li>
                    <li>Day 6: Core/Abs (optional)</li>
                </ul>

                <h3>5. Upper Body/Lower Body (2-Day Split)</h3>
                <p><strong>Who it's for:</strong> Those looking for a simple routine.</p>
                <p><strong>How it works:</strong> Alternates upper body and lower body workouts.</p>
                <ul>
                    <li>Day 1: Upper body (chest, back, shoulders, arms)</li>
                    <li>Day 2: Lower body (legs, glutes, calves)</li>
                </ul>
            </div>
            <div class="main-info">
                <h3>Which Split Is Best for You?</h3>
                <ul>
                    <li><strong>Beginners:</strong> Start with a full-body workout or upper/lower split.</li>
                    <li><strong>Intermediate lifters:</strong> Try the push/pull/legs split for greater frequency.</li>
                    <li><strong>Advanced lifters:</strong> Use the body part split to focus on specific muscle groups.</li>
                </ul>
            </div>
        </div>
    </main>
    <footer>
        <div class="footer-container">
            <ul class="footer-links">
                <li><a href="../index.php">HOME</a></li>
                <li><a href="../files/blog.php">BLOG</a></li>
                <li><a href="../files/about.php">ABOUT</a></li>
                <li><a href="../files/laws.html">DISCLAIMER</a></li>
                <li><a href="../files/about.php">CONTACT</a></li>
                <li><a href="../files/laws.html">PRIVACY POLICY</a></li>
                <li><a href="../files/laws.html">TERMS OF USE</a></li>
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
</body>
</html>