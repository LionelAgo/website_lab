document.addEventListener('DOMContentLoaded', function() {
    // Toggle mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('nav-open'); // Prevents background scrolling when menu is open
        });
    }
    
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
    
    // Smooth scrolling for navigation links
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
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    if (header) {
        // Check initially
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        }
        
        // Listen for scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Hero background slider
    const backgroundSlides = document.querySelectorAll('.background-slide');
    
    if (backgroundSlides.length > 1) {
        let currentSlide = 0;
        
        // Initial setup
        backgroundSlides.forEach((slide, index) => {
            if (index === 0) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Automatic slider
        setInterval(() => {
            backgroundSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % backgroundSlides.length;
            backgroundSlides[currentSlide].classList.add('active');
        }, 5000); // Change every 5 seconds
    }
    
    // Carousel functionality for research cards
    document.querySelectorAll('.carousel-container').forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const indicators = carousel.querySelectorAll('.carousel-indicator');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        
        let currentSlide = 0;
        
        function updateSlides() {
            slides.forEach((slide, index) => {
                slide.classList.remove('active');
                if (index === currentSlide) {
                    slide.classList.add('active');
                }
            });
            
            indicators.forEach((indicator, index) => {
                indicator.classList.remove('active');
                if (index === currentSlide) {
                    indicator.classList.add('active');
                }
            });
        }
        
        // Initial setup
        updateSlides();
        
        // Next button click
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateSlides();
            });
        }
        
        // Previous button click
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateSlides();
            });
        }
        
        // Indicator clicks
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                updateSlides();
            });
        });
        
        // Automatic rotation
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlides();
        }, 5000); // Change every 5 seconds
    });
    
    // Publication filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const publicationItems = document.querySelectorAll('.publication-item');
    
    if (filterBtns.length > 0 && publicationItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Get selected category
                const selectedCategory = btn.getAttribute('data-category');
                
                // Filter publications
                publicationItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        const categories = item.dataset.categories ? item.dataset.categories.split(' ') : [];
                        
                        if (selectedCategory === 'all' || categories.includes(selectedCategory)) {
                            item.style.display = 'block';
                            
                            // Add fade-in animation
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 50);
                        } else {
                            item.style.display = 'none';
                        }
                    }, 300);
                });
            });
        });
    }
    
    // Button hover effects for hero buttons
    const heroButtons = document.querySelectorAll('.hero-btns .btn');
    
    heroButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-5px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
    
    // Publication abstract toggle
    const abstractToggles = document.querySelectorAll('.show-abstract');
    
    if (abstractToggles.length > 0) {
        abstractToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                this.classList.toggle('active');
                const abstractContent = this.nextElementSibling;
                
                if (abstractContent.style.maxHeight) {
                    abstractContent.style.maxHeight = null;
                    setTimeout(() => {
                        abstractContent.style.display = 'none';
                    }, 300);
                } else {
                    abstractContent.style.display = 'block';
                    abstractContent.style.maxHeight = abstractContent.scrollHeight + 'px';
                }
            });
        });
    }
    
    // Scroll animations
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkScroll() {
        const windowHeight = window.innerHeight;
        const windowTop = window.scrollY;
        const windowBottom = windowTop + windowHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + windowTop;
            const elementBottom = elementTop + element.offsetHeight;
            
            // Check if element is in viewport
            if (elementBottom > windowTop && elementTop < windowBottom) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Tab navigation
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => {
                    content.style.opacity = '0';
                    setTimeout(() => {
                        content.classList.remove('active');
                    }, 300);
                });
                
                // Add active class to current button
                button.classList.add('active');
                
                // Show corresponding content
                const targetId = button.getAttribute('data-tab');
                const targetContent = document.getElementById(targetId);
                
                if (targetContent) {
                    setTimeout(() => {
                        targetContent.classList.add('active');
                        setTimeout(() => {
                            targetContent.style.opacity = '1';
                        }, 50);
                    }, 300);
                }
            });
        });
        
        // Activate first tab by default
        if (tabButtons.length > 0) {
            tabButtons[0].click();
        }
    }
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                const translateY = scrollPosition * 0.3;
                heroSection.querySelector('.hero-background').style.transform = `translateY(${translateY}px)`;
            }
        });
    }
    
    // Counter animation for key numbers
    const keyNumbers = document.querySelectorAll('.key-number-value');
    
    if (keyNumbers.length > 0) {
        // Function to check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Function to animate counter
        function animateCounter(counter, target) {
            let current = 0;
            const duration = 2000; // ms
            const increment = target / (duration / 16); // Update every 16ms (60fps)
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                counter.textContent = Math.round(current);
            }, 16);
        }
        
        // Initialize counters when they come into view
        function checkCounters() {
            keyNumbers.forEach(counter => {
                if (isInViewport(counter) && !counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                }
            });
        }
        
        // Check on load and scroll
        checkCounters();
        window.addEventListener('scroll', checkCounters);
    }
    
    // Initialize any videos at reduced speed
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (video) {
            video.playbackRate = 0.5; // Half speed
        }
    });
});