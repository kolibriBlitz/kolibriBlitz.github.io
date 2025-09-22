// Enhanced flip card functionality for touch devices and accessibility
document.addEventListener('DOMContentLoaded', function () {
    const flipCards = document.querySelectorAll('.flip-card');

    flipCards.forEach(card => {
        // Add touch support for mobile devices
        card.addEventListener('click', function () {
            if (window.matchMedia('(hover: none)').matches) {
                // Touch device - toggle flipped state
                card.classList.toggle('flipped');
            }
        });

        // Add keyboard support for accessibility
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('flipped');
            }
        });

        // Make card focusable for keyboard navigation
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'Flip card to reveal description');

        // Add focus outline for keyboard users
        card.addEventListener('focus', function () {
            card.style.outline = '2px solid var(--green-lightest)';
            card.style.outlineOffset = '2px';
        });

        card.addEventListener('blur', function () {
            card.style.outline = 'none';
        });
    });
});