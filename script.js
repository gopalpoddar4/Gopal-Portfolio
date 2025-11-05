document.addEventListener("DOMContentLoaded", function () {
  // Menu toggle for mobile
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');
  const menuToggle = document.querySelector('.menu-toggle');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      // animate hamburger
      menuToggle.classList.toggle('is-active');
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const yOffset = -72; // adjust for fixed header
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        // Close mobile nav if open
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          if (menuToggle) menuToggle.classList.remove('is-active');
        }
      }
    });
  });

  // Instagram app deep-link fallback (tries to open app on mobile, else opens web)
  (function() {
    const instaAnchor = document.getElementById('insta-link');
    if (!instaAnchor) return;
    const username = 'gopalpoddar0';
    const webUrl = `https://www.instagram.com/${username}/`;
    const appUri = `instagram://user?username=${username}`;

    instaAnchor.addEventListener('click', function(event) {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (!isMobile) return; // allow normal behavior on desktop

      event.preventDefault();
      const now = Date.now();

      // Attempt to open app
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = appUri;
      document.body.appendChild(iframe);

      // Fallback to web after short timeout
      setTimeout(function() {
        try { document.body.removeChild(iframe); } catch(e){ }
        window.location.href = webUrl;
      }, 900);
    });
  })();
});
