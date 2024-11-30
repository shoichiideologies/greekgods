const email = document.getElementById('email');
const password = document.getElementById('password');

function displayErrorMessage(message) {
    let errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;

    const errorMessageContainer = document.querySelector('.error-message-container');
    errorMessageContainer.innerHTML = '';  
    errorMessageContainer.appendChild(errorMessage);
}

function validateForm(event) {
    let isValid = true;

    const emailValidationMessage = validateEmail(email.value);
    if (emailValidationMessage !== "Email is valid.") {
        displayErrorMessage(emailValidationMessage);
        isValid = false;
    }

    const passwordValidationMessage = validatePassword(password.value);
    if (passwordValidationMessage !== "Password is valid.") {
        displayErrorMessage(passwordValidationMessage);
        isValid = false;
    }

    return isValid;
}

document.querySelector('form').addEventListener('submit', function(event) {
    if (!validateForm(event)) {
        event.preventDefault();  
    }
});