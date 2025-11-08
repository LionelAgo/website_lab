/**
 * Carousel JavaScript Module - Image slider functionality
 *
 * Features:
 * - Multiple independent carousels
 * - Previous/Next navigation
 * - Dot indicators
 * - Broken image handling
 * - Auto-play support (optional)
 */

document.addEventListener('DOMContentLoaded', function() {
    setupCarousels();
});

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

        /**
         * Update carousel state - change active slide and indicator
         */
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

        // Previous button click handler
        prevBtn.addEventListener('click', () => {
            updateCarouselState(currentIndex - 1);
        });

        // Next button click handler
        nextBtn.addEventListener('click', () => {
            updateCarouselState(currentIndex + 1);
        });

        // Indicator click handlers
        if (indicators.length > 0) {
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    updateCarouselState(index);
                });
            });
        }

        /**
         * Update button states (disabled/opacity based on current position)
         */
        function updateButtons() {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === totalSlides - 1;

            prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
            nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
        }

        // Initialize: Set first slide as active
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === 0) slide.classList.add('active');
        });

        if (indicators.length > 0) {
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === 0);
            });
        }

        updateButtons(); // Set initial button state

        // ============================================================
        // HANDLE BROKEN IMAGES IN CAROUSEL SLIDES
        // ============================================================
        slides.forEach(slide => {
            const imagesInSlide = slide.querySelectorAll('img');
            imagesInSlide.forEach(img => {
                const originalSrc = img.getAttribute('src');

                // Handle images that fail to load
                img.onerror = function() {
                    const placeholder = document.createElement('div');
                    placeholder.className = 'placeholder-image';

                    if (this.parentNode && this.parentNode.contains(this)) {
                        this.parentNode.replaceChild(placeholder, this);
                    }
                };

                // Handle images already broken when script runs
                if (img.complete && img.naturalWidth === 0 && originalSrc) {
                    if (img.tagName === 'IMG' && img.parentNode && img.parentNode.contains(img)) {
                        const placeholder = document.createElement('div');
                        placeholder.className = 'placeholder-image';
                        img.parentNode.replaceChild(placeholder, img);
                    }
                }
            });
        });
    });
}
