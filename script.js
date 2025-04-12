// Toggle mobile navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        header.style.padding = '0';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        header.style.padding = '0';
    }
});

// Publication filters
const filterBtns = document.querySelectorAll('.filter-btn');
const publicationItems = document.querySelectorAll('.publication-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Get selected category
        const selectedCategory = btn.getAttribute('data-category');

        // Filter publications
        publicationItems.forEach(item => {
            const categories = item.getAttribute('data-categories').split(' ');
            if (selectedCategory === 'all' || categories.includes(selectedCategory)) {
                item.style.display = 'block';
                // Add fade-in animation
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 50);
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Button hover effects for all hero buttons
const heroButtons = document.querySelectorAll('.hero-btns .btn, .hero-btns .btn-outline');

heroButtons.forEach(button => {
    const highlight = button.querySelector('span:last-child');

    button.addEventListener('mouseenter', () => {
        highlight.style.transform = 'translateX(0)';
    });

    button.addEventListener('mouseleave', () => {
        highlight.style.transform = 'translateX(-100%)';
    });
});

// Carousel functionality for research cards
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.hero-background video');
    if (video) {
        video.playbackRate = 0.3; // Set video speed to 0.25x (4 times slower)
    }
});