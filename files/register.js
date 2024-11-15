const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

function displayErrorMessage(inputId, message) {
    let errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;

    const existingError = document.querySelector(`#${inputId} + .error-message`);
    if (existingError) {
        existingError.remove();
    }

    const inputElement = document.getElementById(inputId);
    inputElement.parentNode.appendChild(errorMessage);
}

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

function validatePasswordMatch(password, confirmPassword) {
    if (password !== confirmPassword) return "*Passwords do not match.";
    return "Passwords match.";
}

function validateForm(event) {
    let isValid = true;

    const passwordValidationMessage = validatePassword(password.value);
    if (passwordValidationMessage !== "Password is valid.") {
        displayErrorMessage('password', passwordValidationMessage);
        isValid = false;
    }

    const passwordMatchMessage = validatePasswordMatch(password.value, confirmPassword.value);
    if (passwordMatchMessage !== "Passwords match.") {
        displayErrorMessage('confirm-password', passwordMatchMessage);
        isValid = false;
    }

    return isValid;
}

document.querySelector('form').addEventListener('submit', function(event) {
    document.querySelectorAll('.error-message').forEach((msg) => msg.remove());

    if (!validateForm(event)) {
        event.preventDefault();
    }
});
