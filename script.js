// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });
}

// Close mobile nav when clicking outside or on a link
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active')) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '☰';
        }
    }
});

navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (hamburger) hamburger.innerHTML = '☰';
    });
});

// Floating Header State Transition
const header = document.querySelector('header');
if (header) {
    const handleScroll = () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run on initial load
    handleScroll();
}

// High Performance Scroll Animations using Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach(el => observer.observe(el));

// setActive Nav Link based on current page
const currentPath = window.location.pathname;
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath.split('/').pop() || (currentPath === '/' && href === 'index.html')) {
        link.classList.add('active');
    }
});

// Create and Animate Cursor Glow Follower
const createCursorGlow = () => {
    // Avoid creating on mobile devices as hover isn't applicable
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const glow = document.createElement('div');
    glow.classList.add('mouse-glow');
    document.body.appendChild(glow);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateGlow = () => {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(animateGlow);
    };
    requestAnimationFrame(animateGlow);
};

// Initialize cursor glow after page load
window.addEventListener('load', createCursorGlow);

// Card Interactive Spotlight Spotlight Coordinates Tracker
const initCardSpotlights = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
};

initCardSpotlights();
// Expose for dynamic content loading (e.g. React rendered sections)
window.initCardSpotlights = initCardSpotlights;
