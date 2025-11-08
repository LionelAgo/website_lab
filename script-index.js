/**
 * Index Page JavaScript Module - Homepage specific features
 *
 * Features:
 * - Hero background slider (video/image rotation)
 * - Carousel initialization
 * - Foldable sections initialization
 */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================================
    // HERO BACKGROUND SLIDER
    // ============================================================
    const backgroundSlides = document.querySelectorAll('.background-slide');
    if (backgroundSlides.length > 1) {
        let currentSlide = 0;

        // Initialize - set first slide as active
        backgroundSlides.forEach((slide, index) => {
            if (index === 0) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Auto-rotate through background slides every 5 seconds
        setInterval(() => {
            backgroundSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % backgroundSlides.length;
            backgroundSlides[currentSlide].classList.add('active');
        }, 5000);
    }
});
