/**
 * Teams Page JavaScript Module
 *
 * Features:
 * - Foldable Publications and Conferences sections
 * - Toggle functionality with smooth animations
 * - Team member card interactions
 * - Statistics display
 */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================================
    // FOLDABLE PUBLICATIONS AND CONFERENCES SECTIONS
    // ============================================================

    // Setup toggle handlers for publications
    const publicationToggles = document.querySelectorAll('.publications-toggle');
    publicationToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const foldable = toggle.closest('.foldable-publications');
            if (foldable) {
                foldable.classList.toggle('expanded');
                toggle.setAttribute('aria-expanded',
                    foldable.classList.contains('expanded'));
            }
        });
    });

    // Setup toggle handlers for conferences
    const conferenceToggles = document.querySelectorAll('.conferences-toggle');
    conferenceToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const foldable = toggle.closest('.foldable-conferences');
            if (foldable) {
                foldable.classList.toggle('expanded');
                toggle.setAttribute('aria-expanded',
                    foldable.classList.contains('expanded'));
            }
        });
    });

    // Allow clicking on the header to toggle
    const publicationHeaders = document.querySelectorAll('.publications-header');
    publicationHeaders.forEach(header => {
        header.addEventListener('click', () => {
            header.querySelector('.publications-toggle').click();
        });
    });

    const conferenceHeaders = document.querySelectorAll('.conferences-header');
    conferenceHeaders.forEach(header => {
        header.addEventListener('click', () => {
            header.querySelector('.conferences-toggle').click();
        });
    });

    // Teams page specific functionality can be added here as needed
});
