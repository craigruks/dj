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
            handleTimelineScroll();
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

// Press Kit Scroller Animation
const pressKitScroller = document.querySelector('.press-kit-scroller');
let scrollPosition = 0;
let animationFrameId = null;

function animatePressKit() {
    scrollPosition -= 1;
    if (scrollPosition <= -pressKitScroller.scrollWidth / 2) {
        scrollPosition = 0;
    }
    pressKitScroller.style.transform = `translateX(${scrollPosition}px)`;
    animationFrameId = requestAnimationFrame(animatePressKit);
}

// Start animation when the page loads
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

    // Start press kit animation
    animatePressKit();

    // Observe section titles
    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });

    // Observe gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        observer.observe(item);
    });

    // Set initial states based on scroll position
    const currentScrollY = window.scrollY;
    const scrollIndicatorLeft = document.getElementById('scroll-indicator-left');
    const scrollIndicatorRight = document.getElementById('scroll-indicator-right');
    
    // Start fading out after scrolling 40px
    const fadeStart = 40;
    const fadeEnd = 80; // Complete fade out at 80px
    
    if (currentScrollY > fadeStart) {
        const opacity = Math.max(0, 1 - (currentScrollY - fadeStart) / (fadeEnd - fadeStart));
        scrollIndicatorLeft.style.opacity = opacity;
        scrollIndicatorRight.style.opacity = opacity;
    } else {
        scrollIndicatorLeft.style.opacity = 1;
        scrollIndicatorRight.style.opacity = 1;
    }

    // Set initial parallax position
    if (parallaxHero) {
        parallaxHero.style.transform = `translate3d(0, ${currentScrollY * 0.5}px, 0)`;
    }

    createGenreMarkers();

    const timelineContainer = document.getElementById('timeline-container');
    if (timelineContainer) {
        timelineContainer.style.willChange = 'transform';
    }
});

// Clean up animation when page is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
    } else {
        animatePressKit();
    }
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
document.getElementById('copyBio').addEventListener('click', function() {
    const paragraphs = document.querySelectorAll('#bio p');
    const text = Array.from(paragraphs).map(p => p.textContent.trim()).join('\n\n');
    navigator.clipboard.writeText(text).then(() => {
        this.textContent = 'Copied!';
        setTimeout(() => {
            this.textContent = 'Copy to Clipboard';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});

// Scroll indicator fade out
const scrollIndicatorLeft = document.getElementById('scroll-indicator-left');
const scrollIndicatorRight = document.getElementById('scroll-indicator-right');
let indicatorLastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - indicatorLastScrollY;
    
    // Start fading out after scrolling 40px
    const fadeStart = 40;
    const fadeEnd = 80; // Complete fade out at 80px
    
    if (currentScrollY > fadeStart) {
        const opacity = Math.max(0, 1 - (currentScrollY - fadeStart) / (fadeEnd - fadeStart));
        scrollIndicatorLeft.style.opacity = opacity;
        scrollIndicatorRight.style.opacity = opacity;
    } else {
        scrollIndicatorLeft.style.opacity = 1;
        scrollIndicatorRight.style.opacity = 1;
    }
    
    indicatorLastScrollY = currentScrollY;
});

// Genre positioning based on BPM
const genres = [
    { 
        name: 'Deep',
        sub: ['House', 'Tech']
    },
    { name: 'Organic' },
    { name: 'Disco' },
    { name: 'House' },
    { name: 'Tech' },
    { name: 'Garage' },
    { name: 'Elektro' },
    { 
        name: 'Nu',
        sub: ['Disco', 'Trance', 'Acid']
    },
    { name: 'Progressive' },
    { name: 'Electronica' },
    { name: 'Grime' },
    { 
        name: 'Hard',
        sub: ['Groove', 'Dance', 'House']
    },
    { name: 'Techno' }
];

function createGenreMarkers() {
    const container = document.getElementById('genre-markers');
    if (!container) return;

    // Clear existing markers
    container.innerHTML = '';

    // Calculate maximum subgenre width
    let maxSubgenreWidth = 0;
    genres.forEach(genre => {
        if (genre.sub) {
            genre.sub.forEach(sub => {
                maxSubgenreWidth = Math.max(maxSubgenreWidth, sub.length);
            });
        }
    });

    // Create markers for each genre
    const subGenreElements = [];
    genres.forEach((genre, index) => {
        const marker = document.createElement('div');
        marker.className = 'absolute flex items-center transition-all duration-300';
        
        const line = document.createElement('div');
        line.className = 'bg-stone-700 transition-all h-[3px]';
        
        const labelContainer = document.createElement('div');
        labelContainer.className = 'flex items-center whitespace-nowrap';
        
        const mainLabel = document.createElement('span');
        mainLabel.className = 'text-stone-700 text-base md:text-sm font-helvetica';
        mainLabel.textContent = genre.name;
        
        if (genre.sub) {
            const subGenreContainer = document.createElement('div');
            subGenreContainer.className = 'relative ml-1 h-[1.25em] md:h-[1.125em]';
            subGenreContainer.style.width = `${maxSubgenreWidth}ch`;
            subGenreContainer.style.opacity = '0.8';
            
            genre.sub.forEach((sub, subIndex) => {
                const subLabel = document.createElement('div');
                subLabel.className = 'absolute top-0 left-0 text-stone-700 text-base md:text-sm font-helvetica transition-all duration-500 ease-in-out';
                subLabel.style.width = '100%';
                subLabel.style.textAlign = 'left';
                subLabel.style.lineHeight = '1.25';
                subLabel.textContent = sub;
                
                if (subIndex === 0) {
                    subLabel.style.opacity = '1';
                    subLabel.style.transform = 'translateY(0)';
                } else {
                    subLabel.style.opacity = '0';
                    subLabel.style.transform = 'translateY(100%)';
                }
                
                subGenreContainer.appendChild(subLabel);
            });
            
            labelContainer.appendChild(mainLabel);
            labelContainer.appendChild(subGenreContainer);
            
            // Store for animation
            const spans = subGenreContainer.querySelectorAll('div');
            if (spans.length > 1) {
                subGenreElements.push({
                    spans,
                    currentIndex: 0
                });
            }
        } else {
            labelContainer.appendChild(mainLabel);
        }
        
        // Alternate left/right positioning with proper alignment
        if (index % 2 === 0) {
            // Right-side genres
            marker.className += ' right-1/2';
            line.className += ' w-8';
            labelContainer.className += ' text-right mr-2';
            marker.appendChild(labelContainer);
            marker.appendChild(line);
        } else {
            // Left-side genres
            marker.className += ' left-1/2';
            line.className += ' w-8';
            labelContainer.className += ' ml-2';
            marker.appendChild(line);
            marker.appendChild(labelContainer);
        }
        
        container.appendChild(marker);
    });

    // Create coordinated animation
    let currentGenreIndex = 0;
    const animateNextGenre = () => {
        subGenreElements.forEach(genreData => {
            const { spans, currentIndex } = genreData;
            const nextIndex = (currentIndex + 1) % spans.length;
            
            // Current item slides up and fades out
            spans[currentIndex].style.opacity = '0';
            spans[currentIndex].style.transform = 'translateY(-100%)';

            // Next item starts below and slides up
            spans[nextIndex].style.transform = 'translateY(100%)';
            spans[nextIndex].style.opacity = '0';
            
            // Trigger reflow
            spans[nextIndex].offsetHeight;
            
            // Animate next item in with faded opacity
            spans[nextIndex].style.opacity = '0.6';
            spans[nextIndex].style.transform = 'translateY(0)';

            // Reset the previous item after animation
            setTimeout(() => {
                spans[currentIndex].style.transform = 'translateY(100%)';
            }, 500);

            // Update current index
            genreData.currentIndex = nextIndex;
        });

        // Schedule next animation
        setTimeout(animateNextGenre, 1500);
    };

    // Start the animation sequence
    setTimeout(animateNextGenre, 1500);

    // Position the markers
    positionGenres();
}

function positionGenres() {
    const container = document.getElementById('genre-markers');
    if (!container) return;
    
    const markers = document.querySelectorAll('#genre-markers > div');
    const containerHeight = container.offsetHeight;
    const totalSpacing = containerHeight * 0.9; // Use 90% of container height
    const baseSpacing = totalSpacing / (genres.length - 1);
    const startY = containerHeight * 0.05; // Start at 5% from top
    
    // Create array of randomized spacing multipliers
    const spacingMultipliers = genres.map((_, index) => {
        // Keep first and last positions fixed
        if (index === 0 || index === genres.length - 1) return 1;
        // Add random variation up to ±20% for middle positions
        return 1 + (Math.random() * 0.4 - 0.2); // Random between 0.8 and 1.2
    });
    
    // Calculate cumulative positions
    let currentY = startY;
    markers.forEach((marker, index) => {
        marker.style.top = `${currentY}px`;
        marker.style.transform = 'translateY(-50%)';
        
        // Update currentY for next marker
        if (index < markers.length - 1) {
            currentY += baseSpacing * spacingMultipliers[index];
        }
    });
}

// Add resize listener to handle layout changes
window.addEventListener('resize', positionGenres);

// BPM Ticks
const bpmTicks = document.querySelector('.bpm-ticks');

function updateBPMTicks() {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;
    const bpm = Math.round(155 - scrollDelta * 0.5);

    if (bpmTicks) {
        bpmTicks.textContent = bpm;
    }

    lastScrollY = currentScrollY;
}

window.addEventListener('scroll', updateBPMTicks);

// Timeline parallax effect
let timelineRAF = null;
let lastTimelineUpdate = 0;
const TIMELINE_UPDATE_INTERVAL = 1000 / 60; // Target 60fps

function updateTimelineParallax() {
    const now = performance.now();
    if (now - lastTimelineUpdate < TIMELINE_UPDATE_INTERVAL) {
        return;
    }
    lastTimelineUpdate = now;

    const footer = document.getElementById('footer');
    const timelineContainer = document.getElementById('timeline-container');
    
    if (!footer || !timelineContainer) return;
    
    const rect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Start when footer is 10% in view, end when it's 90% in view
    const startThreshold = windowHeight * 0.6;    // Footer 10% in view
    const endThreshold = windowHeight * 0.15;      // Footer 90% in view
    const scrollRange = startThreshold - endThreshold;
    
    // Calculate progress based on thresholds
    const progress = (startThreshold - rect.top) / scrollRange;
    const scrollProgress = Math.max(0, Math.min(1, progress));
    
    // Calculate the maximum translation needed to show the entire timeline
    const containerHeight = timelineContainer.offsetHeight;
    const viewportHeight = timelineContainer.parentElement.offsetHeight;
    const maxTranslate = containerHeight - viewportHeight;
    
    const translateY = maxTranslate * scrollProgress;

    // Use transform3d for hardware acceleration
    timelineContainer.style.transform = `translate3d(0, -${translateY}px, 0)`;
}

// Optimized scroll handler for timeline
function handleTimelineScroll() {
    if (timelineRAF) {
        cancelAnimationFrame(timelineRAF);
    }
    
    timelineRAF = requestAnimationFrame(() => {
        updateTimelineParallax();
        timelineRAF = null;
    });
} 