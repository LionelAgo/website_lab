/**
 * Common JavaScript Module - Shared across all pages
 *
 * Features:
 * - Mobile navigation toggle
 * - Header scroll effects
 * - Smooth scrolling for anchor links
 * - Back-to-top button functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================================
    // BACK TO TOP BUTTON
    // ============================================================
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================================
    // MOBILE NAVIGATION TOGGLE
    // ============================================================
    const hamburger = document.querySelector('.hamburger');

    // Try both possible nav link selectors (for different page templates)
    let navLinks = document.querySelector('#nav-links-mobile');
    if (!navLinks) {
        navLinks = document.querySelector('.nav-links');
    }
    if (!navLinks) {
        navLinks = document.querySelector('#nav-links-resume');
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks && navLinks.classList.contains('active') &&
                !navLinks.contains(e.target) &&
                !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }

    // ============================================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }

                // Smooth scroll with offset for header
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================================
    // HEADER SCROLL EFFECT
    // ============================================================
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        }
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});
