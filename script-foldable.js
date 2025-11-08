/**
 * Foldable Sections JavaScript Module
 *
 * Features:
 * - Expand/collapse sections
 * - Icon toggle (plus/minus)
 * - ARIA accessibility attributes
 */

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
                    button.style.transform = 'rotate(180deg)';
                } else {
                    // If it was expanded, now collapsing: change minus to plus
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                    button.style.transform = 'rotate(0deg)';
                }
            });

            // Set initial icon based on default state
            const initiallyExpanded = section.classList.contains('expanded');
            if (initiallyExpanded) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
                button.style.transform = 'rotate(180deg)';
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
                button.style.transform = 'rotate(0deg)';
            }
        }
    });
});
