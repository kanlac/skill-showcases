// ===== Custom Cursor =====
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smooth cursor movement
    const cursorSpeed = 0.15;
    cursorX += (mouseX - cursorX) * cursorSpeed;
    cursorY += (mouseY - cursorY) * cursorSpeed;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    // Smoother follower movement
    const followerSpeed = 0.08;
    followerX += (mouseX - followerX) * followerSpeed;
    followerY += (mouseY - followerY) * followerSpeed;

    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// ===== Reading Progress Bar =====
const progressBar = document.querySelector('.reading-progress');

function updateReadingProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;

    progressBar.style.width = progress + '%';
}

window.addEventListener('scroll', updateReadingProgress);
window.addEventListener('resize', updateReadingProgress);

// ===== Smooth Scroll for Internal Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== Code Copy Functionality =====
document.querySelectorAll('.code-copy').forEach(button => {
    button.addEventListener('click', function() {
        const codeBlock = this.closest('.code-block');
        const code = codeBlock.querySelector('code').textContent;

        navigator.clipboard.writeText(code).then(() => {
            const originalText = this.textContent;
            this.textContent = '已复制!';
            this.style.color = 'var(--color-accent)';
            this.style.borderColor = 'var(--color-accent)';

            setTimeout(() => {
                this.textContent = originalText;
                this.style.color = '';
                this.style.borderColor = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    });
});

// ===== Intersection Observer for Fade-in Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.content-section').forEach(section => {
    observer.observe(section);
});

// ===== Parallax Effect for Hero Orbs =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const orbs = document.querySelectorAll('.floating-orb');

    orbs.forEach((orb, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        orb.style.transform = `translateY(${yPos}px)`;
    });
});

// ===== Enhanced Hover Effects for Interactive Elements =====
const interactiveElements = document.querySelectorAll('a, button, .comparison-item, .stack-card, .competitor-card');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.width = '32px';
        cursor.style.height = '32px';
        cursorFollower.style.width = '48px';
        cursorFollower.style.height = '48px';
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.width = '8px';
        cursor.style.height = '8px';
        cursorFollower.style.width = '32px';
        cursorFollower.style.height = '32px';
    });
});

// ===== Lazy Loading for Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Add Subtle Animation to Stats =====
const stats = document.querySelectorAll('.stat');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;

    const statsSection = document.querySelector('.hero-stats');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
        statsAnimated = true;
        stats.forEach((stat, index) => {
            setTimeout(() => {
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

stats.forEach(stat => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(20px)';
    stat.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
});

window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);

// ===== Smooth Entry Animation for Page Load =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    updateReadingProgress();
});

// ===== Handle External Links =====
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
});

// ===== Add Active State to Navigation on Scroll =====
const sections = document.querySelectorAll('.content-section');
const navIssue = document.querySelector('.nav-issue');

function updateActiveSection() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    // You can add additional logic here if you have section navigation
}

window.addEventListener('scroll', updateActiveSection);

// ===== Easter Egg: Konami Code =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        // Easter egg activated
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// ===== Performance: Debounce Scroll Events =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedUpdateProgress = debounce(updateReadingProgress, 10);
window.addEventListener('scroll', debouncedUpdateProgress);

// ===== Initialize All Features =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize reading progress
    updateReadingProgress();

    // Initialize active section
    updateActiveSection();

    // Log a message for developers
    console.log('%c🎨 Designed with frontend-design skill', 'color: #c17c4a; font-size: 16px; font-weight: bold;');
    console.log('%cExplore more at https://github.com/anthropics/claude-code', 'color: #5a5550; font-size: 12px;');
});
