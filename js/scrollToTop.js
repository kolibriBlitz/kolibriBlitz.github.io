document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Return to top');
    scrollBtn.innerHTML = `
        <svg class="scroll-top-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            
            <path class="scroll-top-arrow" d="M11 18V4" stroke="var(--blue-light)" stroke-width="2" stroke-linecap="round"/>
            <path class="scroll-top-arrow" d="M5 12L11 5L17 12" stroke="var(--green-lightest)" stroke-width="2" stroke-linecap="round"/>
        </svg>
    `;
    scrollBtn.style.display = 'none';
    document.body.appendChild(scrollBtn);

    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    // Smooth scroll to top
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
