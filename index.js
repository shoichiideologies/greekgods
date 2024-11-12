const navLinks = document.getElementById('nav-links');
const navMenuButton = document.getElementById('nav-menu-button');

navMenuButton.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 980) {
        navLinks.classList.remove('show');
    }
});
