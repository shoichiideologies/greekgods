<?php
// session_start();

// $user = $_SESSION['user']; // Get the user data from session

// // Calculate the age from birthdate
// $birthdate = new DateTime($user['birthdate']);
// $today = new DateTime();
// $age = $today->diff($birthdate)->y;

// // Calculate BMI
// $heightInMeters = $user['height'] / 100; // Convert height from cm to meters
// $weight = $user['weight']; // Weight in kg
// $bmi = $weight / ($heightInMeters * $heightInMeters);

// // Determine BMI Classification
// if ($bmi < 18.5) {
//     $classification = 'Underweight';
// } elseif ($bmi >= 18.5 && $bmi < 24.9) {
//     $classification = 'Normal weight';
// } elseif ($bmi >= 25 && $bmi < 29.9) {
//     $classification = 'Overweight';
// } else {
//     $classification = 'Obesity';
// }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../index.css">   
    <link rel="stylesheet" href="./profile.css">
    <title>GreekGods | Profile</title>
</head>
<body>
    <nav>
        <button class="nav-menu-button" id="nav-menu-button">
            <img src="/Github/greekgods/graphics/svg/menu-black.svg" alt="Menu" title="Menu">
        </button>
        <div class="nav-logo">
            <img src="/Github/greekgods/graphics/logo/greekgodslogo.png" alt="GreekGods" title="GreekGods" onclick="location.reload(); return false;">
        </div>
        <button class="nav-menu-profile" id="nav-menu-profile" onclick="window.location.href='/Github/greekgods/files/register.html'">
            <img src="/Github/greekgods/graphics/svg/profile.svg" alt="Profile" title="Profile">
        </button>
        <ul class="nav-links" id="nav-links">
            <li><a href="/Github/greekgods/index.html" onclick="location.reload(); return false;">HOME</a></li>
            <li><a href="/Github/greekgods/files/program.html">PROGRAM</a></li>
            <li><a href="/Github/greekgods/files/blog.html">BLOG</a></li>
            <li><a href="/Github/greekgods/files/calculator.html">CALCULATOR</a></li>
            <li><a href="/Github/greekgods/files/about.html">ABOUT</a></li>
        </ul>
        <div class="nav-button">
            <button onclick="window.location.href='/Github/greekgods/files/register.html'">GET STARTED</button>
        </div>
    </nav>
    <header>
        <div class="header-container">
            <!-- Personal Information -->
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

            <!-- Body Numbers (BMR, TDEE, etc.) -->
            <div class="header-info" id="header-statistics">
                <h3>Body Numbers</h3>
                <p>Basal Metabolic Rate (BMR): <span id="bmr"></span></p>
                <p>Total Daily Energy Expenditure (TDEE): <span id="tdee"></span> </p>
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
                <li><a href="../index.html">HOME</a></li>
                <li><a href="./blog.html">BLOG</a></li>
                <li><a href="./about.html">ABOUT</a></li>
                <li><a href="./laws.html">DISCLAIMER</a></li>
                <li><a href="./about.html">CONTACT</a></li>
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

    <!-- Injecting the user data into JavaScript -->
    <script>
        const userData = <?php echo json_encode([
            'firstName' => $user['firstName'],
            'lastName' => $user['lastName'],
            'birthdate' => $user['birthdate'],
            'height' => $user['height'],
            'weight' => $user['weight'],
            'activity' => $user['activity'],
            'gender' => 'male', // You can replace 'male' with $user['gender'] if you store gender in the database
            'formula' => 'mifflin_st_jeor'
        ]); ?>;

        // Populate personal and body information
        function displayUserInfo(data) {
            // Calculate derived data
            const fullName = `${data.firstName} ${data.lastName}`;
            const birthdate = new Date(data.birthdate);
            const today = new Date();
            let age = today.getFullYear() - birthdate.getFullYear();
            if (
                today.getMonth() < birthdate.getMonth() ||
                (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate())
            ) {
                age--;
            }

            // BMI Calculation
            const bmi = (data.weight / (data.height * data.height)).toFixed(2);
            let classification = "";
            if (bmi < 18.5) classification = "Underweight";
            else if (bmi < 25) classification = "Normal weight";
            else if (bmi < 30) classification = "Overweight";
            else classification = "Obese";

            // BMR Calculation (example: Mifflin-St Jeor formula)
            let bmr = 0;
            if (data.gender === "male") {
                bmr = 10 * data.weight + 6.25 * (data.height * 100) - 5 * age + 5;
            } else {
                bmr = 10 * data.weight + 6.25 * (data.height * 100) - 5 * age - 161;
            }

            // Activity factor
            const activityFactors = {
                sedentary: 1.2,
                light: 1.375,
                moderate: 1.55,
                active: 1.725,
                very_active: 1.9
            };
            const activityFactor = activityFactors[data.activity] || 1.2;

            // TDEE Calculation
            const tdee = bmr * activityFactor;

            // Weight loss calculations
            const maintainWeight = tdee;
            const midWeightLoss = tdee - 250;
            const weightLoss = tdee - 500;
            const extremeWeightLoss = tdee - 1000;

            // Protein intake
            const proteinIntake = (data.weight * 1.6).toFixed(0); // 1.6 grams per kg of body weight

            // Update HTML spans
            document.getElementById("name").textContent = fullName;
            document.getElementById("birthdate").textContent = data.birthdate;
            document.getElementById("age").textContent = age;
            document.getElementById("height").textContent = `${data.height.toFixed(2)} m`;
            document.getElementById("weight").textContent = `${data.weight.toFixed(2)} kg`;
            document.getElementById("bmi").textContent = bmi;
            document.getElementById("classification").textContent = classification;

            document.getElementById("bmr").textContent = `${bmr.toFixed(2)} kcal/day`;
            document.getElementById("tdee").textContent = `${tdee.toFixed(2)} kcal/day`;
            document.getElementById("maintain").textContent = `${maintainWeight.toFixed(2)} kcal/day`;
            document.getElementById("mid").textContent = `${midWeightLoss.toFixed(2)} kcal/day`;
            document.getElementById("weight-loss").textContent = `${weightLoss.toFixed(2)} kcal/day`;
            document.getElementById("extreme").textContent = `${extremeWeightLoss.toFixed(2)} kcal/day`;
            document.getElementById("protein").textContent = `${proteinIntake} g/day`;
        }

        // Call the function to populate the HTML
        displayUserInfo(userData);
    </script>

    <script src="../index.js"></script>
    <script src="./profile.js"></script>
</body>
</html>