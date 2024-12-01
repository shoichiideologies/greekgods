<?php
session_start();
$userId = $_SESSION['user_id'];

// Check if user_id is provided
if (!$userId) {
    die("Error: User ID not provided.");
}

// echo "<script>const userId = $userId;</script>";
// Database connection details
$localhost = "localhost";
$username = "root";
$dbPassword = "";
$dbname = "register";

// Establish a connection to the database
$conn = new mysqli($localhost, $username, $dbPassword, $dbname);

// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare SQL statement to fetch user data
$stmt = $conn->prepare("SELECT firstName, lastName, birthdate, height, weight, activity FROM users WHERE user_id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();


// Fetch user data
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Pass user data to the front end
    echo "<script>const userData = " . json_encode($user) . ";</script>";
} else {
    echo "Error: User not found.";
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="../graphics/logo/logo.png">
    <link rel="stylesheet" href="profile.css">
    <script type="text/javascript">
        const userId = <?php echo json_encode($userId); ?>;
    </script>
    <title>GreekGods | Profile</title>
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
            <li><a href="./program.php">PROGRAM</a></li>
            <li><a href="./blog.php">BLOG</a></li>
            <li><a href="./calculator.php">CALCULATOR</a></li>
            <li><a href="./about.php">ABOUT</a></li>
        </ul>
        <div class="nav-button">
            <button id="register-button" onclick="window.location.href='./register.html'">GET STARTED</button>
            <!-- <button id="profile-button" onclick="location.reload(); return false;"><img src="../graphics/svg/profile.svg" alt="Profile" title="Profile"></button> -->
            <!-- <span id="profile-name"><?php echo htmlspecialchars($user['firstName'] . ' ' . $user['lastName']); ?></span> -->
            <button id="logout">LOGOUT</button>
        </div>
    </nav>
    <header>
            <div id="header-welcome" style="box-sizing:border-box;width:100%;padding:10px 30px 0px 30px;display:inline-block;background-color:white;border-top:1px solid lightgray">
                <h3 style="font-size: 3em;text-transform:uppercase;color:black;padding:0px;margin-top:20px;">WELCOME, <?php echo htmlspecialchars($user['firstName']); ?>!</h3>
                <p style="font:500 0.945em/1em 'Trebuchet MS';color:#555;text-align:center">Welcome to GreekGods! Let's start you fitness journey by embracing your body numbers!. Navigate to <a href="./blog.php">Blog</a> for step by step comprehensive fitness instructions.</p>
            </div> 

        <div class="header-container">
            <div class="header-info" id="header-personal-info">
                <h3>Personal Information</h3>
                <p>Name: <span id="name"></span></p>
                <p>Birthday: <span id="birthdate"></span></p>
                <p>Age: <span id="age"></span></p>
                <p>Height: <span id="height"></span></p>
                <p>Weight: <span id="weight"></span></p>
                <p>Body Mass Index (BMI): <span id="bmi"></span></p>
                <p>Classification: <span id="classification"></span></p>
            </div>

            <div class="header-info" id="header-statistics">
                <h3>Body Numbers</h3>
                <p>Basal Metabolic Rate: <span id="bmr"></span></p>
                <p>Total Daily Energy Expenditure: <span id="tdee"></span> </p>
                <p>Maintain Weight: <span id="maintain"></span></p>
                <p>Mid Weight Loss: <span id="mid"></span></p>
                <p>Weight Loss: <span id="weight-loss"></span></p>
                <p>Extreme Weight Loss: <span id="extreme"></span></p>
                <p>Protein Intake: <span id="protein"></span></p>
            </div>

            <div class="header-info" id="header-program">
                <h3>Program</h3>
                <div id="program">
                </div>
            </div>
        </div>
    </header>
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
    <script>
        function calculateDerivedData(data) {
            const fullName = `${data.firstName} ${data.lastName}`;
            const birthdate = new Date(data.birthdate);
            const today = new Date();

            // Calculate Age
            let age = today.getFullYear() - birthdate.getFullYear();
            if (
                today.getMonth() < birthdate.getMonth() || 
                (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate())
            ) {
                age--;
            }

            // BMI Calculation
            const heightInMeters = data.height;
            const bmi = (data.weight / (heightInMeters * heightInMeters)).toFixed(2);
            let classification = "";
            if (bmi < 18.5) classification = "Underweight";
            else if (bmi < 25) classification = "Normal weight";
            else if (bmi < 30) classification = "Overweight";
            else classification = "Obese";

            // BMR Calculation (Mifflin-St Jeor formula)
            const bmr = 10 * data.weight + 6.25 * (data.height * 100) - 5 * age + (data.gender === "male" ? 5 : -161);

            // Activity Factor
            const activityFactors = {
                sedentary: 1.2,
                light: 1.375,
                moderate: 1.55,
                active: 1.725,
                very_active: 1.9,
            };
            const activityFactor = activityFactors[data.activity] || 1.2;

            // TDEE Calculation
            const tdee = bmr * activityFactor;

            // Caloric Needs
            const maintain = tdee;
            const midWeightLoss = tdee - 250;
            const weightLoss = tdee - 500;
            const extremeWeightLoss = tdee - 1000;

            // Protein Intake
            const protein = (data.weight * 1.6).toFixed(0);

            // Update HTML Elements
            document.getElementById("name").textContent = fullName;
            document.getElementById("birthdate").textContent = data.birthdate;
            document.getElementById("age").textContent = age;
            document.getElementById("height").textContent = `${heightInMeters.toFixed(2)} m`;
            document.getElementById("weight").textContent = `${data.weight.toFixed(2)} kg`;
            document.getElementById("bmi").textContent = bmi;
            document.getElementById("classification").textContent = classification;

            document.getElementById("bmr").textContent = `${bmr.toFixed(2)} kcal/day`;
            document.getElementById("tdee").textContent = `${tdee.toFixed(2)} kcal/day`;
            document.getElementById("maintain").textContent = `${maintain.toFixed(2)} kcal/day`;
            document.getElementById("mid").textContent = `${midWeightLoss.toFixed(2)} kcal/day`;
            document.getElementById("weight-loss").textContent = `${weightLoss.toFixed(2)} kcal/day`;
            document.getElementById("extreme").textContent = `${extremeWeightLoss.toFixed(2)} kcal/day`;
            document.getElementById("protein").textContent = `${protein} g/day`;
        }

        // Initialize user data and calculate derived values
        calculateDerivedData(userData);

        // document.addEventListener("DOMContentLoaded", () => {
        //     const userId = document.body.getAttribute('data-user-id');
        //     console.log("User ID from body:", userId);
        //     alert("User ID from body: " + userId);
        //     if (userId) {
        //         const links = document.querySelectorAll('#nav-links a');
        //         links.forEach(link => {
        //             const url = new URL(link.href);
        //             url.searchParams.set('user_id', userId);
        //             link.href = url.toString();
        //         });
        //     }
        // });
    </script>
    <script src="../index.js" defer></script>
    <script src="./profile.js"></script>
</body>
</html>