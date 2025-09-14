// Dynamic Quote System
// Easily add more quotes to each page's pool as needed

const quoteData = {
    home: [
        {
            text: "I influence anybody who is able to get through the chaos of my first impression.",
            author: "Gary Vaynerchuk",
            cite: '"Interview with Fast Company, July 6, 2010"',
            source: "brainyquote.com/quotes/gary_vaynerchuk_503132"
        }
        // Add more home quotes here when ready
    ],

    about: [
        {
            text: "It's not that I'm so smart. It's that I stay with problems longer.",
            author: "Albert Einstein",
            cite: '"Bite-Size Einstein: Quotations on Just About Everything from the Greatest Mind of the Twentieth Century"',
            source: "https://quoteinvestigator.com/2024/10/03/smart-stay/"
        }
        // Add more about quotes here when ready
    ],

    portfolio: [
        {
            text: "It's not all about talent. It's about dependability, consistency, and being able to improve. If you work hard and you're coachable, and you understand what you need to do, you can improve.",
            author: "Bill Belichick",
            cite: '"Interview with CNBC, April 13, 2017"',
            source: "https://brainyquote.com/quotes/bill_belichick_975072"
        }
        // Add more portfolio quotes here when ready
    ],

    contact: [
        {
            text: "We dance, we kiss, we schmooze, we carry on, we go home happy. What do you say? Come on.",
            author: "Hades",
            cite: 'Disney\'s "Hercules"',
            source: "https://title/tt0119282/quotes/?ref_#tt_dyk_qu"
        }
        // Add more contact quotes here when ready
    ]
};

class QuoteManager {
    constructor() {
        this.currentPage = this.detectPage();
        this.quoteElement = document.querySelector('.quote blockquote');
        this.authorElement = document.querySelector('.quote p');
    }

    detectPage() {
        // Detect current page based on body class or URL
        const bodyClass = document.body.className;
        if (bodyClass.includes('home')) return 'home';
        if (bodyClass.includes('about')) return 'about';
        if (bodyClass.includes('portfolio')) return 'portfolio';
        if (bodyClass.includes('contact')) return 'contact';

        // Fallback to URL detection
        const path = window.location.pathname;
        if (path.includes('about')) return 'about';
        if (path.includes('portfolio')) return 'portfolio';
        if (path.includes('contact')) return 'contact';
        return 'home';
    }

    getRandomQuote() {
        const quotes = quoteData[this.currentPage];
        if (!quotes || quotes.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    }

    isFirstVisit() {
        const visitKey = `${this.currentPage}_visited`;
        const hasVisited = localStorage.getItem(visitKey);
        if (!hasVisited) {
            localStorage.setItem(visitKey, 'true');
            return true;
        }
        return false;
    }

    displayQuote(quote) {
        if (!quote || !this.quoteElement || !this.authorElement) return;

        // Update the quote text
        this.quoteElement.textContent = quote.text;
        this.quoteElement.setAttribute('cite', quote.source);

        // Update the author attribution
        this.authorElement.innerHTML = `- ${quote.author}, <cite>${quote.cite}</cite>`;
    }

    init() {
        // Only run if we have quote elements on the page
        if (!this.quoteElement || !this.authorElement) return;

        const quotes = quoteData[this.currentPage];
        if (!quotes || quotes.length === 0) return;

        let selectedQuote;

        if (this.isFirstVisit() || quotes.length === 1) {
            // Show default (first) quote on first visit or if only one quote exists
            selectedQuote = quotes[0];
        } else {
            // Show random quote on subsequent visits
            selectedQuote = this.getRandomQuote();
        }

        this.displayQuote(selectedQuote);
    }

    // Utility method to add quotes dynamically (for future use)
    addQuote(page, quote) {
        if (!quoteData[page]) quoteData[page] = [];
        quoteData[page].push(quote);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const quoteManager = new QuoteManager();
    quoteManager.init();
});

// Export for potential future use
window.QuoteManager = QuoteManager;