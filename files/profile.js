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

document.addEventListener("DOMContentLoaded", () => {
    const editButton = document.getElementById("edit-informations"); // Button to open the modal
    const sectionElement = document.querySelector("section"); // The section element to display
    const updateButton = document.getElementById("updateButton"); // Update button in the form

    // Show the section and fetch user data when edit-informations is clicked
    editButton.addEventListener("click", () => {
        sectionElement.style.display = "flex"; // Make the section visible
        sectionElement.style.zIndex = "999"; // Bring it to the front

        // Fetch the user data from the server
        fetch("../includes/users/fetch_user_data.php")
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Populate the form fields with fetched data
                    document.getElementById("email").value = data.user.email || '';
                    document.getElementById("password").value = '**********'; 
                    document.getElementById("first-name").value = data.user.firstName || '';
                    document.getElementById("last-name").value = data.user.lastName || '';
                    document.getElementById("birthdate").value = data.user.birthdate.slice(0, 10); // Trims time if present
                    document.getElementById("height").value = parseFloat(data.user.height) || '';
                    document.getElementById("weight").value = parseFloat(data.user.weight) || '';
                    document.getElementById("activity").value = data.user.activity || '';
                } else {
                    alert("Failed to fetch user data: " + data.message);
                }
            })
            .catch(error => {
                alert("Error fetching user data:", error);
            });
    });

    // Hide the section when updateButton is clicked
    updateButton.addEventListener("click", () => {
        const updatedData = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value, // Send password if changed
            firstName: document.getElementById("first-name").value,
            lastName: document.getElementById("last-name").value,
            birthdate: document.getElementById("birthdate").value,
            height: document.getElementById("height").value,
            weight: document.getElementById("weight").value,
            activity: document.getElementById("activity").value,
        };

        fetch("../includes/users/update_user.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Information updated successfully!");
                    sectionElement.style.display = "none"; // Hide the section
                    location.reload(); // Refresh to show updated data
                } else {
                    alert("Error updating information: " + data.message);
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    });
});