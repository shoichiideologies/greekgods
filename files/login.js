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

function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        return "*Please enter a valid email address.";
    }
    return "Email is valid.";
}

function validatePassword(password) {
    if (password.trim() === "") {
        return "*Password cannot be empty.";
    }
    return "Password is valid.";
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
    event.preventDefault();  

    if (!validateForm(event)) {
        return; 
    }
    this.submit();
});
