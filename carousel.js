document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevButton = carousel.querySelector('.carousel-prev');
        const nextButton = carousel.querySelector('.carousel-next');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        let currentIndex = 0;
        let slideInterval;

        function createDots() {
            if (!dotsContainer) return;
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                dot.addEventListener('click', () => {
                    goToSlide(index);
                });
                dotsContainer.appendChild(dot);
            });
        }

        function updateDots() {
            if (!dotsContainer) return;
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            slides[currentIndex].classList.remove('active');
            slides[currentIndex].setAttribute('aria-hidden', 'true');
            currentIndex = (index + slides.length) % slides.length;
            slides[currentIndex].classList.add('active');
            slides[currentIndex].setAttribute('aria-hidden', 'false');
            updateDots();
            resetInterval();
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        function startInterval() {
            slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        if (prevButton) {
            prevButton.addEventListener('click', prevSlide);
        }
        if (nextButton) {
            nextButton.addEventListener('click', nextSlide);
        }

        // Keyboard navigation
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });

        // Initialize
        if (slides.length > 0) {
            slides[0].classList.add('active');
            slides[0].setAttribute('aria-hidden', 'false');
            slides.forEach((slide, index) => {
                if (index !== 0) slide.setAttribute('aria-hidden', 'true');
            });
            createDots();
            startInterval(); // Start automatic sliding
        }
    });
});