// Sticky Navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.height = '70px';
        nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    } else {
        nav.style.height = '80px';
        nav.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
    }
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Basic mobile toggle logic
    if(navLinks.classList.contains('active')) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '80px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'white';
        navLinks.style.padding = '20px';
    } else {
        navLinks.style.display = 'none';
    }
});

// Scroll Reveal Animation (Intersection Observer)
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.course-card, .featured-content, .featured-img').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
});

// Stats Counter Animation
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-item h4');
    stats.forEach(stat => {
        const target = parseInt(stat.innerText);
        let count = 0;
        const increment = target / 50;
        const updateCount = () => {
            if (count < target) {
                count += increment;
                stat.innerText = Math.ceil(count) + (stat.id === 'stat1' ? '+' : '+');
                setTimeout(updateCount, 40);
            } else {
                stat.innerText = target + '+';
            }
        };
        updateCount();
    });
};

// Trigger stats animation when visible
const statsSection = document.querySelector('.stats');
const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateStats();
        statsObserver.unobserve(statsSection);
    }
}, { threshold: 0.5 });

statsObserver.observe(statsSection);
