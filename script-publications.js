/**
 * Publications Page JavaScript Module
 *
 * Features:
 * - Publication filtering (by type and research area)
 * - Search functionality
 * - Chart visualization (Chart.js)
 * - Active filters display
 */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================================
    // PUBLICATION FILTERING
    // ============================================================
    const publicationItems = document.querySelectorAll('.publication-item');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('publication-search');
    const clearSearchBtn = document.getElementById('clear-search');

    // Filter button click handlers
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons with same data attribute
                const dataAttr = this.dataset.category ? 'category' : 'filter';
                document.querySelectorAll(`.filter-btn[data-${dataAttr}]`).forEach(b => {
                    b.classList.remove('active');
                });
                this.classList.add('active');
                filterPublications();
            });
        });
    }

    // Search input handler
    if (searchInput) {
        searchInput.addEventListener('input', filterPublications);
    }

    // Clear search button handler
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', function() {
            if (searchInput) {
                searchInput.value = '';
                filterPublications();
            }
        });
    }

    /**
     * Filter publications based on active filters and search term
     */
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

            // Check if item matches all active filters
            const categoryMatch = activeCategory === 'all' || categories.includes(activeCategory);
            const filterMatch = activeFilter === 'all' || keywords.includes(activeFilter);
            const searchMatch = searchTerm === '' ||
                title.includes(searchTerm) ||
                authors.includes(searchTerm) ||
                journal.includes(searchTerm) ||
                keywords.includes(searchTerm);

            // Show or hide item based on matches
            if (categoryMatch && filterMatch && searchMatch) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        // Update active filters display
        updateActiveFiltersDisplay();
    }

    /**
     * Display active filters for user feedback
     */
    function updateActiveFiltersDisplay() {
        const activeFiltersContainer = document.getElementById('active-filters');
        if (!activeFiltersContainer) return;

        const activeFilters = [];
        const activeCategory = document.querySelector('.filter-btn[data-category].active');
        const activeFilter = document.querySelector('.filter-btn[data-filter].active');
        const searchTerm = searchInput?.value.toLowerCase() || '';

        if (activeCategory && activeCategory.dataset.category !== 'all') {
            activeFilters.push(activeCategory.textContent.trim());
        }
        if (activeFilter && activeFilter.dataset.filter !== 'all') {
            activeFilters.push(activeFilter.textContent.trim());
        }
        if (searchTerm) {
            activeFilters.push(`Search: "${searchTerm}"`);
        }

        if (activeFilters.length > 0) {
            activeFiltersContainer.innerHTML = '<strong>Active Filters:</strong> ' + activeFilters.join(', ');
            activeFiltersContainer.style.display = 'block';
        } else {
            activeFiltersContainer.style.display = 'none';
        }
    }

    // Initialize - show all publications and update active filters
    filterPublications();

    // ============================================================
    // PUBLICATION STATISTICS CHARTS
    // ============================================================
    initPublicationCharts();
});

/**
 * Initialize Chart.js visualizations for publication statistics
 */
function initPublicationCharts() {
    const yearChartCanvas = document.getElementById('publicationsByYearChart');
    const typeChartCanvas = document.getElementById('publicationsByTypeChart');

    if (yearChartCanvas && typeChartCanvas) {
        // Publications by Year - Bar Chart
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

        // Publications by Type - Doughnut Chart
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
