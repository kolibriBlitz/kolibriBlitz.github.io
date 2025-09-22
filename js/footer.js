document.addEventListener('DOMContentLoaded', () => {
    // Update current year
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Update last modified date
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        const lastModified = new Date(document.lastModified);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        const formattedDate = lastModified.toLocaleDateString('en-US', options);
        const isoDate = lastModified.toISOString().split('T')[0];

        lastUpdatedElement.textContent = formattedDate;
        lastUpdatedElement.setAttribute('datetime', isoDate);
    }
});