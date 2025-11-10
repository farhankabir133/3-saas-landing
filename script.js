/**
 * SAAS PRODUCT LANDING PAGE - JavaScript
 * Handles mobile menu, testimonials carousel, scroll animations, video demo, and theme toggle
 */

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    });
}

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active') 
            ? 'rotate(45deg) translate(5px, 5px)' 
            : 'none';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active') 
            ? 'rotate(-45deg) translate(7px, -6px)' 
            : 'none';
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Testimonials Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

function showSlide(n) {
    // Wrap around if needed
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;
    else currentSlide = n;
    
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('active');
    }
    
    // Highlight current dot
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

// Next/Prev button handlers
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
}

// Dot click handlers
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto-advance carousel every 5 seconds
let carouselInterval = setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Reset interval on manual interaction
function resetCarouselInterval() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}

if (nextBtn) nextBtn.addEventListener('click', resetCarouselInterval);
if (prevBtn) prevBtn.addEventListener('click', resetCarouselInterval);
dots.forEach(dot => dot.addEventListener('click', resetCarouselInterval));

// Scroll reveal animation
const revealElements = document.querySelectorAll(
    '.feature-card, .benefit-item, .pricing-card'
);

revealElements.forEach(el => {
    el.classList.add('scroll-reveal');
});

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

revealElements.forEach(el => {
    scrollObserver.observe(el);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Video placeholder click handler
const videoPlaceholder = document.querySelector('.video-placeholder');
if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', () => {
        // In production, replace with actual video embed
        alert('Video demo would play here. Replace with actual video embed or lightbox.');
        console.log('Video clicked - integrate with YouTube, Vimeo, or custom video player');
    });
}

// Enhanced navbar on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.padding = '0.75rem 0';
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.07)';
    }
});

// Pricing card hover effects
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('featured')) {
            this.style.borderColor = 'var(--primary-color)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
            this.style.borderColor = 'transparent';
        }
    });
});

// Initialize hero fade-in animations on load
window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.hero .fade-in');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Parallax effect for floating cards
window.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.floating-card');
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    cards.forEach((card, index) => {
        const speed = (index + 1) * 0.02;
        const moveX = (clientX - innerWidth / 2) * speed;
        const moveY = (clientY - innerHeight / 2) * speed;
        
        card.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Add keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        showSlide(currentSlide - 1);
        resetCarouselInterval();
    } else if (e.key === 'ArrowRight') {
        showSlide(currentSlide + 1);
        resetCarouselInterval();
    }
});

// Touch/swipe support for testimonials carousel
let touchStartX = 0;
let touchEndX = 0;

const testimonialsCarousel = document.querySelector('.testimonials-carousel');
if (testimonialsCarousel) {
    testimonialsCarousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    testimonialsCarousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left - next slide
            showSlide(currentSlide + 1);
        } else {
            // Swiped right - previous slide
            showSlide(currentSlide - 1);
        }
        resetCarouselInterval();
    }
}

// CTA button tracking (for analytics)
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const buttonText = this.textContent.trim();
        const buttonHref = this.getAttribute('href');
        
        console.log('CTA clicked:', {
            text: buttonText,
            href: buttonHref,
            section: this.closest('section')?.id || 'unknown'
        });
        
        // Here you would typically send to analytics
        // Example: gtag('event', 'cta_click', { button_text: buttonText });
    });
});

console.log('SaaS Landing Page loaded successfully! ☁️');
