// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });
}

// High Performance Scroll Animations using Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Optional: Stop observing once animated if you only want it to happen once
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach(el => observer.observe(el));

// setActive Nav Link based on current page
const currentPath = window.location.pathname;
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(link => {
    if (link.getAttribute('href') === currentPath.split('/').pop() || (currentPath === '/' && link.getAttribute('href') === 'index.html')) {
        link.classList.add('active');
    }
});

// Background Logo Parallax and Hover effect
const bgLogo = document.querySelector('.interactive-bg-logo');
let timeout;

if (bgLogo) {
    document.addEventListener('mousemove', (e) => {
        // Apply class for opacity/color change
        document.body.classList.add('mouse-moving');
        
        // Clear timeout
        clearTimeout(timeout);
        
        // Set timeout to remove class if mouse stops
        timeout = setTimeout(() => {
            document.body.classList.remove('mouse-moving');
        }, 1000);

        // Calculate parallax tilt
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        // Update transform
        // Max rotation set to 25 degrees
        bgLogo.style.transform = `rotateY(${x * 25}deg) rotateX(${-y * 25}deg) scale(1.05)`;
    });
}
