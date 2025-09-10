// Main JS for interactivity: nav toggle, theme toggle, reveal on scroll
(function(){
  'use strict';

  // Nav toggle for small screens
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-navigation');
  if(navToggle && nav){
    navToggle.addEventListener('click', ()=>{
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  // Theme toggle with persisted preference
  const themeKey = 'site-theme';
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  function setTheme(t){
    if(t === 'dark'){
      root.setAttribute('data-theme','dark');
      themeToggle && themeToggle.setAttribute('aria-pressed','true');
      themeToggle && (themeToggle.textContent = '☀️ Light');
    } else {
      root.removeAttribute('data-theme');
      themeToggle && themeToggle.setAttribute('aria-pressed','false');
      themeToggle && (themeToggle.textContent = '🌙 Dark');
    }
  }
  const saved = localStorage.getItem(themeKey);
  if(saved) setTheme(saved);
  else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
  themeToggle && themeToggle.addEventListener('click', ()=>{
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem(themeKey, next);
  });

  // Reveal on scroll for elements with .fade-in class and new scroll-reveal
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        // Special handling for scroll-reveal elements
        if(entry.target.classList.contains('scroll-reveal')) {
          entry.target.classList.add('scroll-visible');
        }
      }
    });
  },{threshold:0.1, rootMargin: '0px 0px -50px 0px'});
  
  document.querySelectorAll('section, .hero, .section-card, .scroll-reveal').forEach(el=>observer.observe(el));

  // Enhanced scroll effects for skill items
  const skillObserver = new IntersectionObserver((entries)=>{
    entries.forEach((entry, index)=>{
      if(entry.isIntersecting) {
        const skillItems = entry.target.querySelectorAll('.skill-item');
        skillItems.forEach((item, i)=>{
          setTimeout(()=>{
            item.style.animationDelay = `${i * 100}ms`;
            item.classList.add('animate');
          }, i * 100);
        });
      }
    });
  },{threshold:0.3});
  
  document.querySelectorAll('.skills-showcase').forEach(el=>skillObserver.observe(el));

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const targetId = a.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });
})();
