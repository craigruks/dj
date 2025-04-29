// Parallax effect for hero background
const parallaxBg = document.getElementById('parallax-bg');
let ticking = false;
let lastScrollY = window.scrollY;

// Set initial background image
parallaxBg.style.backgroundImage = 'url("src/hero.webp")';

// Parallax function using requestAnimationFrame
function updateParallax() {
    const scrolled = window.scrollY;
    parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    ticking = false;
}

// Throttle scroll events
window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateParallax();
            ticking = false;
        });
        ticking = true;
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Initial animation for hero section
    setTimeout(() => {
        document.querySelector('.site-title').classList.add('visible');
        document.querySelector('.social-links').classList.add('visible');
    }, 100);

    // Observe section titles
    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });

    // Observe gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        observer.observe(item);
    });
});

// Smooth scroll handling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}); 