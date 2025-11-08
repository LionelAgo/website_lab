/**
 * Resume Page JavaScript Module
 *
 * Features:
 * - Current year update in footer
 * - (Shared functionality from script-common.js)
 */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================================
    // UPDATE CURRENT YEAR IN FOOTER
    // ============================================================
    const yearElements = document.querySelectorAll('.current-year');
    if (yearElements.length > 0) {
        const currentYear = new Date().getFullYear();
        yearElements.forEach(element => {
            element.textContent = currentYear;
        });
    }
});
