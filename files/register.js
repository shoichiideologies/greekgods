const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const registerAccountForm = document.getElementById('registerAccount');
const registerInfoForm = document.getElementById('registerInfo');

function displayErrorMessage(containerClass, message) {
    // Find the relevant error-message-container dynamically
    const errorMessageContainer = document.querySelector(`#${containerClass} .error-message-container`);
    if (!errorMessageContainer) {
        console.error(`Error container not found for ${containerClass}!`);
        return;
    }

    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;

    errorMessageContainer.appendChild(errorMessage);
}

// Password validation
function validatePassword(password) {
    const minLength = 8;
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasDigit = /[0-9]/;
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const commonPasswords = ["123456", "password", "12345678", "qwerty", "abc123", "111111", "123123"];
    
    if (password.length < minLength) return "*Password must be at least 8 characters long.";
    if (!hasUppercase.test(password)) return "*Password must contain at least one uppercase letter.";
    if (!hasLowercase.test(password)) return "*Password must contain at least one lowercase letter.";
    if (!hasDigit.test(password)) return "*Password must contain at least one digit.";
    if (!hasSpecialChar.test(password)) return "*Password must contain at least one special character.";
    if (commonPasswords.includes(password.toLowerCase())) return "*Password is too common. Please choose a stronger password.";
    
    return "Password is valid.";
}

// Password match validation
function validatePasswordMatch(password, confirmPassword) {
    if (password !== confirmPassword) return "*Passwords do not match.";
    return "Passwords match.";
}

// Form validation
function validateForm1() {
    let isValid = true;

    // Clear previous error messages in this form
    document.querySelectorAll('#registerAccount .error-message').forEach(msg => msg.remove());

    // Validate password
    const passwordValidationMessage = validatePassword(password.value);
    if (passwordValidationMessage !== "Password is valid.") {
        displayErrorMessage('registerAccount', passwordValidationMessage);
        isValid = false;
    }

    // Validate password match
    const passwordMatchMessage = validatePasswordMatch(password.value, confirmPassword.value);
    if (passwordMatchMessage !== "Passwords match.") {
        displayErrorMessage('registerAccount', passwordMatchMessage);
        isValid = false;
    }

    // Checkbox validation
    const termsCheckbox = document.getElementById('check');
    if (!termsCheckbox.checked) {
        displayErrorMessage('registerAccount', "*You must agree to the terms and conditions.");
        isValid = false;
    }

    return isValid;
}

function validatePersonalDetails(firstName, lastName, birthdate, height, weight, activity) {
    const isMinor = 14;
    const isSenior = 80;

    if (!firstName || !lastName || !birthdate || !height || !weight || !activity) 
        return "Ensure all fields have valid inputs.";

    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < isMinor) return `*You must be at least ${isMinor} years old to register.`;
    if (age > isSenior) return `*You must be less than ${isSenior} years to proceed.`;
    if (isNaN(height) || height <= 0) return "*Height must be a positive number.";
    if (isNaN(weight) || weight <= 0) return "*Weight must be a positive number.";

    return "Personal Details are Valid"; // Explicitly return null if there are no errors
}

function validateForm2() {
    let isValid = true;

    // Clear previous error messages in this form
    document.querySelectorAll('#registerInfo .error-message').forEach(msg => msg.remove());

    // Fetch form values
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const birthdate = document.getElementById("birthdate").value;
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const activity = document.getElementById("activity").value;

    // Validate personal details
    const personalDetailsMessage = validatePersonalDetails(firstName, lastName, birthdate, height, weight, activity);
    if (personalDetailsMessage !== "Personal Details are Valid") {
        displayErrorMessage('registerInfo', personalDetailsMessage);
        isValid = false;
    }

    return isValid;
}

function convertMetric() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (isNaN(height) || isNaN(weight)) {
        return null;
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

    return { finalHeight, finalWeight };
}

// Register button click handler to navigate to registerInfo form
document.querySelector('#registerButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default button behavior

    if (!validateForm1()) {
        return; // If validation fails, stop here
    }

    registerAccountForm.style.display = 'none';
    registerInfoForm.style.display = 'block';
});

// RegisterInfo form submit handler
document.querySelector('#startJourneyNow').addEventListener('click', function(event) {
    event.preventDefault(); 

    if (!validateForm2()) {
        return;
    }

    const conversion = convertMetric();
    if (conversion) {
        const { finalHeight, finalWeight } = conversion;

        // Update the height and weight fields with converted values
        document.getElementById('height').value = finalHeight.toFixed(5); // Set height in meters
        document.getElementById('weight').value = finalWeight.toFixed(2); // Set weight in kilograms

        // Allow form submission
        document.getElementById('registrationForm').submit();
    } else {
        alert("Invalid height or weight. Please check your input.");
    }
});