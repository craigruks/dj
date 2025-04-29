document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const siteTitle = document.querySelector('.site-title');
    let lastScrollTop = 0;
    let ticking = false;

    // Show title on load
    setTimeout(() => {
        siteTitle.classList.add('visible');
    }, 500);

    // Parallax effect
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollDiff = scrollTop - lastScrollTop;
                
                // Subtle parallax effect
                if (scrollDiff > 0) {
                    hero.style.transform = `translateY(${scrollTop * 0.1}px)`;
                } else {
                    hero.style.transform = `translateY(${scrollTop * 0.1}px)`;
                }
                
                lastScrollTop = scrollTop;
                ticking = false;
            });
            ticking = true;
        }
    });

    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}); 