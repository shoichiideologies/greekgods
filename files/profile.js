// Assuming the user data is passed as a JSON object
const userData = {
    firstName: "John",
    lastName: "Doe",
    birthdate: "1990-05-15", // YYYY-MM-DD format
    height: 1.75, // in meters
    weight: 70, // in kilograms
    activity: "moderate", // Activity level
    gender: "male", // Gender
    formula: "mifflin_st_jeor" // BMR formula preference
};

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