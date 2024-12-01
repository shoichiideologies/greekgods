const navLinks = document.getElementById('nav-links');
const navMenuButton = document.getElementById('nav-menu-button');
const header = document.querySelector('header');
const nav = document.querySelector('nav');

// Check if the userId variable is available
if (typeof userId !== 'undefined') {
    console.log("User ID:", userId); // Log the user_id for debugging

    // Add user_id to links dynamically
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        const url = new URL(link.href);
        url.searchParams.set('user_id', userId); // Append user_id
        link.href = url.toString();
    });
}

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