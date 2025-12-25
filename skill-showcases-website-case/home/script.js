// Custom Cursor
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
    const distX = mouseX - cursorX;
    const distY = mouseY - cursorY;

    cursorX += distX * 0.3;
    cursorY += distY * 0.3;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    // Follower with delay
    const followerDistX = mouseX - followerX;
    const followerDistY = mouseY - followerY;

    followerX += followerDistX * 0.1;
    followerY += followerDistY * 0.1;

    cursorFollower.style.left = followerX - 20 + 'px';
    cursorFollower.style.top = followerY - 20 + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor interactions
const interactiveElements = document.querySelectorAll('button, a, .issue-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursorFollower.style.transform = 'scale(1.5)';
        cursorFollower.style.opacity = '0.8';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
        cursorFollower.style.opacity = '0.5';
    });
});

// Smooth Scroll Function
function scrollToIssues() {
    const issuesSection = document.getElementById('issues');
    issuesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 3D Card Tilt Effect
const cards = document.querySelectorAll('.issue-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `
            translateY(-10px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.02)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
    });
});

// Featured Image 3D Effect
const featuredImage = document.querySelector('.featured-image');

if (featuredImage) {
    featuredImage.addEventListener('mousemove', (e) => {
        const rect = featuredImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        featuredImage.style.transform = `
            scale(1.02)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;
    });

    featuredImage.addEventListener('mouseleave', () => {
        featuredImage.style.transform = 'scale(1) rotateX(0) rotateY(0)';
    });
}

// Scroll-triggered Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    observer.observe(card);
});

// Newsletter Form Handler
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = newsletterForm.querySelector('.newsletter-input');
        const submitButton = newsletterForm.querySelector('.newsletter-submit');
        const originalText = submitButton.innerHTML;

        // Validate email
        const email = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            // Show error state
            emailInput.style.borderColor = '#ff4444';
            emailInput.focus();

            setTimeout(() => {
                emailInput.style.borderColor = '';
            }, 2000);

            return;
        }

        // Show success state
        submitButton.innerHTML = `
            <span>已订阅!</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10L8 14L16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `;

        submitButton.style.background = '#4ade80';
        emailInput.value = '';

        // Reset after 3 seconds
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.style.background = '';
        }, 3000);
    });
}

// Parallax Effect for Gradient Orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');

    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        orb.style.transform = `translateY(${yPos}px)`;
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.borderBottom = '1px solid rgba(42, 42, 42, 0.5)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';
        navbar.style.borderBottom = 'none';
    }

    lastScroll = currentScroll;
});

// Skill tags hover effect with random colors
const skillTags = document.querySelectorAll('.skill-tag');
const accentColors = ['#ff6b4a', '#ffa94d', '#4a9eff', '#a94dff', '#4dffdf'];

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        const randomColor = accentColors[Math.floor(Math.random() * accentColors.length)];
        tag.style.borderColor = randomColor;
        tag.style.color = randomColor;
    });

    tag.addEventListener('mouseleave', () => {
        tag.style.borderColor = '';
        tag.style.color = '';
    });
});

// Add reading time estimator
cards.forEach(card => {
    const readingTime = Math.floor(Math.random() * 5) + 8; // 8-12 min
    const cardMeta = card.querySelector('.card-meta');

    if (cardMeta) {
        const timeSpan = document.createElement('span');
        timeSpan.className = 'card-category';
        timeSpan.textContent = `${readingTime} 分钟阅读`;
        cardMeta.appendChild(timeSpan);
    }
});

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K+';
    }
    return num.toString();
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            const targets = [24, 156, 12000];

            statNumbers.forEach((stat, index) => {
                animateCounter(stat, targets[index]);
            });

            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Add subtle particle effect to hero
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = '#ff6b4a';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0';

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    particle.style.left = x + 'px';
    particle.style.top = y + 'px';

    document.querySelector('.hero-background').appendChild(particle);

    // Animate
    const duration = 2000 + Math.random() * 2000;
    const targetY = y - 100 - Math.random() * 100;

    particle.animate([
        { opacity: 0, transform: 'translateY(0)' },
        { opacity: 0.6, transform: 'translateY(-20px)' },
        { opacity: 0, transform: `translateY(-${y - targetY}px)` }
    ], {
        duration: duration,
        easing: 'ease-out'
    }).onfinish = () => {
        particle.remove();
    };
}

// Create particles periodically
setInterval(createParticle, 500);

// Button click effects
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.pointerEvents = 'none';
        ripple.style.transform = 'scale(0)';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        ripple.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(2)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).onfinish = () => {
            ripple.remove();
        };
    });
});

// Add glitch effect to issue numbers on hover
const issueNumbers = document.querySelectorAll('.issue-number, .card-number');

issueNumbers.forEach(num => {
    const parent = num.closest('.featured-image, .card-image');

    if (parent) {
        parent.addEventListener('mouseenter', () => {
            const original = num.textContent;
            let glitchCount = 0;

            const glitchInterval = setInterval(() => {
                if (glitchCount > 3) {
                    num.textContent = original;
                    clearInterval(glitchInterval);
                    return;
                }

                num.textContent = Math.floor(Math.random() * 99);
                glitchCount++;

                setTimeout(() => {
                    num.textContent = original;
                }, 50);
            }, 100);
        });
    }
});

// Smooth reveal for sections
const sections = document.querySelectorAll('.featured-issue, .issues-grid, .newsletter');

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
});

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Console easter egg
console.log('%c✨ Skill Showcases ✨', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #ff6b4a, #ffa94d); -webkit-background-clip: text; color: transparent;');
console.log('%c探索技能的无限可能', 'font-size: 14px; color: #a0a0a0;');
console.log('%c如果你在看这个，你可能对我们的技术栈感兴趣！', 'font-size: 12px; color: #606060;');
console.log('%c我们正在招聘优秀的开发者 → https://careers.skillshowcases.com', 'font-size: 12px; color: #ff6b4a; font-weight: bold;');
