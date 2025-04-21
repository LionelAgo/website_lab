// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('nav-open');
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

    // Hero background slider
    const backgroundSlides = document.querySelectorAll('.background-slide');
    if (backgroundSlides.length > 1) {
        let currentSlide = 0;
        backgroundSlides.forEach((slide, index) => {
            if (index === 0) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        setInterval(() => {
            backgroundSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % backgroundSlides.length;
            backgroundSlides[currentSlide].classList.add('active');
        }, 5000);
    }

    // Publication filtering functionality
    const publicationItems = document.querySelectorAll('.publication-item');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('publication-search');
    const clearSearchBtn = document.getElementById('clear-search');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                filterPublications();
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterPublications);
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', function() {
            searchInput.value = '';
            filterPublications();
        });
    }

    function filterPublications() {
        const activeCategory = document.querySelector('.filter-btn[data-category].active')?.dataset.category || 'all';
        const activeFilter = document.querySelector('.filter-btn[data-filter].active')?.dataset.filter || 'all';
        const searchTerm = searchInput?.value.toLowerCase() || '';

        publicationItems.forEach(item => {
            const categories = item.dataset.categories || '';
            const keywords = item.dataset.keywords || '';
            const title = item.querySelector('.publication-title')?.textContent.toLowerCase() || '';
            const authors = item.querySelector('.publication-authors')?.textContent.toLowerCase() || '';
            const journal = item.querySelector('.publication-journal')?.textContent.toLowerCase() || '';

            const categoryMatch = activeCategory === 'all' || categories.includes(activeCategory);
            const filterMatch = activeFilter === 'all' || keywords.includes(activeFilter);
            const searchMatch = searchTerm === '' || 
                title.includes(searchTerm) || 
                authors.includes(searchTerm) || 
                journal.includes(searchTerm) ||
                keywords.includes(searchTerm);

            if (categoryMatch && filterMatch && searchMatch) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Initialize - show all publications
    filterPublications();
    
    // Initialize publication charts
    initPublicationCharts();
    
    // Initialize carousels
    setupCarousels();
});

// Carousel Functionality - UPDATED
function setupCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(container => {
        const slides = container.querySelectorAll('.carousel-slide');
        const prevBtn = container.querySelector('.carousel-prev');
        const nextBtn = container.querySelector('.carousel-next');
        const indicators = container.querySelectorAll('.carousel-indicator');
        
        if (!slides.length || !prevBtn || !nextBtn) {
            console.error("Missing critical carousel elements:", container);
            return; // Skip setup for this carousel
        }
        
        let currentIndex = 0;
        const totalSlides = slides.length;

        // Function to update slides and indicators
        function updateCarouselState(newIndex) {
            if (newIndex < 0 || newIndex >= totalSlides) return; // Boundary check

            // Update slides
            slides[currentIndex].classList.remove('active');
            slides[newIndex].classList.add('active');
            
            // Update indicators if they exist
            if (indicators.length > 0) {
                indicators[currentIndex].classList.remove('active');
                indicators[newIndex].classList.add('active');
            }
            
            currentIndex = newIndex;
            updateButtons();
        }

        // Previous button click
        prevBtn.addEventListener('click', () => {
            console.log("Previous clicked"); // For debugging
            updateCarouselState(currentIndex - 1);
        });
        
        // Next button click
        nextBtn.addEventListener('click', () => {
            console.log("Next clicked"); // For debugging
            updateCarouselState(currentIndex + 1);
        });

        // Indicator click listeners
        if (indicators.length > 0) {
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    updateCarouselState(index);
                });
            });
        }
        
        // Function to update button states (disabled/opacity)
        function updateButtons() {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === totalSlides - 1;
            
            prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
            nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
        }
        
        // Initialize: Ensure first slide and indicator are active
        slides.forEach((slide, index) => {
            // Start with all slides hidden
            slide.classList.remove('active');
            // Make only the first slide active
            if (index === 0) slide.classList.add('active');
        });
        
        if (indicators.length > 0) {
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === 0);
            });
        }
        
        updateButtons(); // Set initial button state
    });
    
    // Preload images to prevent display issues
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    carouselImages.forEach(img => {
        const imgSrc = img.getAttribute('src');
        if (imgSrc) {
            const preloadImg = new Image();
            preloadImg.src = imgSrc;
        }
    });
}

// Publication Statistics Charts
function initPublicationCharts() {
    const yearChartCanvas = document.getElementById('publicationsByYearChart');
    const typeChartCanvas = document.getElementById('publicationsByTypeChart');
    
    if (yearChartCanvas && typeChartCanvas) {
        // Publications by Year Chart
        new Chart(yearChartCanvas, {
            type: 'bar',
            data: {
                labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                datasets: [{
                    label: 'Publications',
                    data: [3, 5, 4, 6, 7, 8, 9],
                    backgroundColor: '#25256F',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Publications by Year',
                        font: { size: 16 }
                    }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
        
        // Publications by Type Chart
        new Chart(typeChartCanvas, {
            type: 'doughnut',
            data: {
                labels: ['Journal Articles', 'Conference Papers', 'Book Chapters', 'Theses'],
                datasets: [{
                    data: [23, 30, 2, 2],
                    backgroundColor: [
                        '#25256F',
                        '#FFD700',
                        '#87CEEB',
                        '#5BC0BE'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'right' },
                    title: {
                        display: true,
                        text: 'Publications by Type',
                        font: { size: 16 }
                    }
                },
                cutout: '70%'
            }
        });
    }
}
// Foldable Sections Functionality
document.addEventListener('DOMContentLoaded', function() {
    const foldableSections = document.querySelectorAll('.foldable-section');

    foldableSections.forEach(section => {
        const header = section.querySelector('.section-header');
        const button = section.querySelector('.section-toggle-button');
        const content = section.querySelector('.section-content');
        const icon = button?.querySelector('i'); // Get the icon element

        if (header && button && content && icon) {
            header.addEventListener('click', (e) => {
                // Prevent toggling if clicking on a link inside the header
                if (e.target.tagName === 'A') {
                    return;
                }

                const isExpanded = section.classList.contains('expanded');

                // Toggle the expanded class on the section
                section.classList.toggle('expanded');
                button.setAttribute('aria-expanded', !isExpanded);

                // Toggle the icon class
                if (!isExpanded) {
                    // If it was collapsed, now expanding: change plus to minus
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                    // Ensure correct rotation is applied immediately if needed by CSS
                    button.style.transform = 'rotate(180deg)';
                } else {
                    // If it was expanded, now collapsing: change minus to plus
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                     // Ensure correct rotation is applied immediately if needed by CSS
                    button.style.transform = 'rotate(0deg)';
                }
            });

            // Set initial icon based on default state
            const initiallyExpanded = section.classList.contains('expanded');
            if (initiallyExpanded) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
                button.style.transform = 'rotate(180deg)'; // Set initial rotation if expanded
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
                button.style.transform = 'rotate(0deg)'; // Set initial rotation if collapsed
            }
        }
    });
});