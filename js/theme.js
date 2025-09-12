// Check for saved user preference, if any, on load of the website
const userPreference = localStorage.getItem('theme') || 'auto';
const toggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
    if (theme === 'auto') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'auto');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
    // Keep aria-label consistent regardless of theme
    toggle.setAttribute('aria-label', 'Switch display mode');
}

// Set initial theme
setTheme(userPreference);

// Add event listener for theme toggle button
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.theme-toggle');

    toggle.addEventListener('click', () => {
        let theme = 'light';

        // Check if we're currently using system preference
        if (!document.documentElement.hasAttribute('data-theme')) {
            theme = prefersDarkScheme.matches ? 'light' : 'dark';
        } else {
            // If we have a manual theme set, cycle through options
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                theme = 'dark';
            } else if (currentTheme === 'dark') {
                theme = 'auto';
            }
        }

        setTheme(theme);
    });
});
