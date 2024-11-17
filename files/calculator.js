document.querySelector('.header-calculator').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    convertMetric(); // Call the conversion function
});

function calculateBMI(height, weight) {
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        alert("Please enter valid height and weight values.");
        return;
    }

    const bmi = weight / (height * height);
    let category = "";
    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = "Normal";
    } else if (bmi >= 25 && bmi < 29.9) {
        category = "Overweight";
    } else {
        category = "Obese";
    }
    alert(`BMI: ${bmi.toFixed(2)}, Category: ${category}`);
}

function convertMetric() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (isNaN(height) || isNaN(weight)) {
        alert("Please enter valid height and weight values.");
        return;
    }

    const heightMetric = document.getElementById('heightMetric').value;
    const weightMetric = document.getElementById('weightMetric').value;

    let finalHeight;
    let finalWeight;

    if (heightMetric === "cm") {
        finalHeight = height / 100;
    } else if (heightMetric === "m") { 
        finalHeight = height;
    } else if (heightMetric === "in") {
        finalHeight = height * 0.0254;
    } else if (heightMetric === "ft") {
        finalHeight = height * 0.3048;
    } else {
        finalHeight = height;
    }

    if (weightMetric === "kg") {
        finalWeight = weight;
    } else if (weightMetric === "lb") {
        finalWeight = weight * 0.453592;
    } else {
        finalWeight = weight;
    }

    calculateBMI(finalHeight, finalWeight);
}
