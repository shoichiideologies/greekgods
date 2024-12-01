const navLinks = document.getElementById('nav-links');
const navMenuButton = document.getElementById('nav-menu-button');
const header = document.querySelector('header');
const nav = document.querySelector('nav');

navMenuButton.addEventListener('click', () => {
    navLinks.classList.toggle('show');

    if (navLinks.classList.contains('show')) {
        const totalNavHeight = nav.offsetHeight + navLinks.offsetHeight;
        header.style.paddingTop = `${totalNavHeight}px`;
    } else {
        header.style.paddingTop = '100px';
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 980) {
        navLinks.classList.remove('show');
        header.style.paddingTop = '100px';
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const navMenuProfile = document.getElementById("nav-menu-profile");
    const navButton = document.getElementById("register-button");
    const navProfile = document.getElementById("profile-button");
    if (userId) {
        // User is logged in
        if (navButton) {
            navButton.style.display = "none"; // Hide the "GET STARTED" button
        }
        if (navProfile) {
            navProfile.style.display = "block"; // Show the profile menu
            navProfile.addEventListener("click", () => {
            });
        }
        if (navMenuProfile) {
            navMenuProfile.addEventListener("click", () => {
                window.location.href = "/Github/greekgods/files/profile.php"; // Redirect to profile
            });
        }
    } else {
        // User is not logged in
        if (navProfile) {
            navProfile.style.display = "none"; // Hide the profile menu
        }
        if (navButton) {
            navButton.style.display = "block"; // Show the "GET STARTED" button
            navButton.addEventListener("click", () => {
            });
        }
        if (navMenuProfile) {
            navMenuProfile.addEventListener("click", () => {
                window.location.href = "/Github/greekgods/files/login.php"; // Redirect to login
            });
        }
    }
});
