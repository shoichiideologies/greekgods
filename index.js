const navLinks = document.getElementById('nav-links');
const navMenuButton = document.getElementById('nav-menu-button');
const header = document.querySelector('header');
const nav = document.querySelector('nav');

document.addEventListener("DOMContentLoaded", () => {
    const userId = document.body.getAttribute('data-user-id');
    console.log("User ID from body:", userId);
    if (userId) {
        const links = document.querySelectorAll('#nav-links a');
        links.forEach(link => {
            const url = new URL(link.href);
            url.searchParams.set('user_id', userId);
            link.href = url.toString();
        });
    }
});

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