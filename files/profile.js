document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout");

    if (logoutButton) {
        logoutButton.addEventListener("click", (event) => {
            // Prompt the user with a confirmation message
            const userConfirmed = confirm("Are you sure you want to log out?");
            
            if (userConfirmed) {
                // If the user confirms, redirect to the logout PHP script
                window.location.href = "../includes/logout.php"; // Update with actual logout path
            }
            // If the user cancels, no action is taken
        });
    }
});