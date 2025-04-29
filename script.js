// Parallax effect for hero background
const parallaxHero = document.getElementById('parallax-bg');
let ticking = false;
let lastScrollY = window.scrollY;

// Set initial background image for hero
parallaxHero.style.backgroundImage = 'url("src/hero.webp")';

// Update parallax effect on scroll
function updateParallax() {
    if (parallaxHero) {
        const scrolled = window.pageYOffset;
        parallaxHero.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0)`;
    }
}

// Handle scroll behavior for header
const headerMenu = document.getElementById('header-menu');

function updateScroll() {
    const currentScrollY = window.scrollY;

    // Show/hide header menu based on scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        headerMenu.classList.add('transform', '-translate-y-full', 'transition-transform', 'duration-300');
    } else {
        headerMenu.classList.remove('transform', '-translate-y-full', 'transition-transform', 'duration-300');
    }

    lastScrollY = currentScrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateParallax();
            updateScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// Initial state
updateScroll();

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
        document.querySelectorAll('.site-title').forEach(title => {
            title.classList.add('visible');
        });
        document.querySelectorAll('.social-links').forEach(links => {
            links.classList.add('visible');
        });
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

// Copy bio functionality
const copyBioButton = document.getElementById('copyBio');
if (copyBioButton) {
    copyBioButton.addEventListener('click', () => {
        const bioText = document.querySelector('#bio p').textContent;
        navigator.clipboard.writeText(bioText).then(() => {
            copyBioButton.textContent = 'Copied!';
            setTimeout(() => {
                copyBioButton.textContent = 'Copy Bio';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });
} 