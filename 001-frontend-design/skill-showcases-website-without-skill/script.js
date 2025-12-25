// Smooth scroll for navigation links
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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animations
const observeElements = () => {
    // Section titles
    document.querySelectorAll('.section-title').forEach(el => {
        observer.observe(el);
    });

    // Featured card
    const featuredCard = document.querySelector('.featured-card');
    if (featuredCard) {
        observer.observe(featuredCard);
    }

    // Issue cards with stagger effect
    const issueCards = document.querySelectorAll('.issue-card');
    issueCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // About section elements
    const aboutText = document.querySelector('.about-text');
    const aboutStats = document.querySelector('.about-stats');
    if (aboutText) observer.observe(aboutText);
    if (aboutStats) observer.observe(aboutStats);
};

// Parallax effect for hero section
const handleParallax = () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-background');
    const heroContent = document.querySelector('.hero-content');

    if (hero && heroContent) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
};

// Navbar background on scroll
const handleNavbar = () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;

    if (navbar) {
        if (scrolled > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    }
};

// Mouse movement parallax effect for cards
const handleMouseMove = (e) => {
    const cards = document.querySelectorAll('.issue-card');

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const xRotation = ((y - rect.height / 2) / rect.height) * 5;
            const yRotation = ((x - rect.width / 2) / rect.width) * 5;

            const cardInner = card.querySelector('.card-inner');
            if (cardInner && !card.classList.contains('flipped')) {
                cardInner.style.transform = `perspective(1000px) rotateX(${-xRotation}deg) rotateY(${yRotation}deg)`;
            }
        }
    });
};

// Reset card rotation on mouse leave
const resetCardRotation = () => {
    const cards = document.querySelectorAll('.issue-card');

    cards.forEach(card => {
        const cardInner = card.querySelector('.card-inner');
        if (cardInner && !card.classList.contains('flipped')) {
            cardInner.style.transform = '';
        }
    });
};

// Add click event to flip cards on mobile
const handleCardClick = () => {
    const cards = document.querySelectorAll('.issue-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
};

// Animated counter for stats
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const statNumbers = entry.target.querySelectorAll('.stat-number');

            statNumbers.forEach(stat => {
                const text = stat.textContent.trim();
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/\d/g, '');

                if (!isNaN(number)) {
                    stat.textContent = '0' + suffix;
                    setTimeout(() => {
                        animateCounter(stat, number, 2000);
                        setTimeout(() => {
                            stat.textContent = text; // Restore original text with suffix
                        }, 2000);
                    }, 300);
                }
            });
        }
    });
}, { threshold: 0.5 });

// Add hover effects to featured card
const enhanceFeaturedCard = () => {
    const featuredCard = document.querySelector('.featured-card');

    if (featuredCard) {
        featuredCard.addEventListener('mousemove', (e) => {
            const rect = featuredCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;

            featuredCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        featuredCard.addEventListener('mouseleave', () => {
            featuredCard.style.transform = '';
        });
    }
};

// Cursor trail effect
let cursorTrail = [];
const maxTrailLength = 20;

const createCursorTrail = (e) => {
    if (window.innerWidth < 768) return; // Disable on mobile

    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';

    document.body.appendChild(trail);
    cursorTrail.push(trail);

    if (cursorTrail.length > maxTrailLength) {
        const oldTrail = cursorTrail.shift();
        oldTrail.remove();
    }

    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0)';
    }, 10);

    setTimeout(() => {
        trail.remove();
        cursorTrail = cursorTrail.filter(t => t !== trail);
    }, 500);
};

// Add cursor trail styles dynamically
const addCursorTrailStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .cursor-trail {
            position: fixed;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.6), transparent);
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
    `;
    document.head.appendChild(style);
};

// Initialize everything
const init = () => {
    // Set up observers
    observeElements();

    // Stats observer
    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) {
        statsObserver.observe(aboutStats);
    }

    // Enhanced interactions
    enhanceFeaturedCard();
    handleCardClick();

    // Cursor trail
    addCursorTrailStyles();

    // Event listeners
    window.addEventListener('scroll', () => {
        handleParallax();
        handleNavbar();
    });

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', createCursorTrail);

    const issueCards = document.querySelectorAll('.issue-card');
    issueCards.forEach(card => {
        card.addEventListener('mouseleave', resetCardRotation);
    });

    // Add loading class to body
    document.body.classList.add('loaded');
};

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);

    if (konamiCode.join(',').includes(konamiSequence.join(','))) {
        activateEasterEgg();
        konamiCode = [];
    }
});

const activateEasterEgg = () => {
    const hero = document.querySelector('.hero-background');
    if (hero) {
        hero.style.animation = 'rainbow 2s linear infinite';

        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            hero.style.animation = '';
        }, 10000);
    }

    console.log('🎉 Easter egg activated! You found the secret!');
};

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Add performance optimization: throttle scroll events
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Replace scroll event with throttled version
window.removeEventListener('scroll', handleParallax);
window.removeEventListener('scroll', handleNavbar);
window.addEventListener('scroll', throttle(() => {
    handleParallax();
    handleNavbar();
}, 16));
