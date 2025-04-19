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
});

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