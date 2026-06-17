/* =========================================================================
   js/navbar.js
   -------------------------------------------------------------------------
   PURPOSE: ALL behavior tied to the navigation bar lives in this file:
     1. Toggle the mobile hamburger menu open/closed
     2. Close the mobile menu automatically when a link is clicked
        or when the user clicks outside of it
     3. Add a "scrolled" style to the navbar once the page scrolls down
     4. Highlight whichever nav link matches the page currently open

   This file is loaded on every page (see the <script> tag near the
   bottom of index.html, about.html, and contact.html) and only ever
   touches elements inside <nav class="navbar">. Keeping it separate
   from main.js means you can find "everything about the nav" instantly,
   instead of searching through general page scripts.
   ========================================================================= */

document.addEventListener('DOMContentLoaded', function () {
  var navbar = document.querySelector('.navbar');
  var toggleButton = document.querySelector('.navbar-toggle');
  var navLinksList = document.querySelector('.navbar-links');

  if (!navbar) {
    // No navbar on this page for some reason - nothing else to do.
    return;
  }

  /* -----------------------------------------------------------------
     1. MOBILE MENU TOGGLE
     Clicking the hamburger button adds/removes ".is-open" on both the
     button (to animate it into an "X") and the link list (to slide it
     down into view). All the actual animation is handled in navbar.css.
     ----------------------------------------------------------------- */
  function openMobileMenu() {
    toggleButton.classList.add('is-open');
    navLinksList.classList.add('is-open');
    toggleButton.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    toggleButton.classList.remove('is-open');
    navLinksList.classList.remove('is-open');
    toggleButton.setAttribute('aria-expanded', 'false');
  }

  function isMobileMenuOpen() {
    return navLinksList.classList.contains('is-open');
  }

  if (toggleButton && navLinksList) {
    toggleButton.addEventListener('click', function () {
      if (isMobileMenuOpen()) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    /* -------------------------------------------------------------
       2a. Close the menu automatically after a link is tapped.
       Without this, the menu would stay open after navigating,
       which feels broken on mobile.
       ------------------------------------------------------------- */
    var allNavLinks = navLinksList.querySelectorAll('a');
    allNavLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMobileMenu();
      });
    });

    /* -------------------------------------------------------------
       2b. Close the menu if the user clicks/taps anywhere outside
       of the navbar while it's open.
       ------------------------------------------------------------- */
    document.addEventListener('click', function (event) {
      var clickWasInsideNavbar = navbar.contains(event.target);
      if (!clickWasInsideNavbar && isMobileMenuOpen()) {
        closeMobileMenu();
      }
    });
  }

  /* -----------------------------------------------------------------
     3. SCROLLED NAVBAR STATE
     Once the user scrolls past 40px, add ".is-scrolled" so the navbar
     gets a solid background (defined in navbar.css). This keeps nav
     links readable once page content scrolls underneath the bar.
     ----------------------------------------------------------------- */
  var SCROLL_THRESHOLD = 40;

  function updateNavbarBackground() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }

  // Run once immediately in case the page loads already scrolled down
  // (e.g. the user refreshed mid-page), then keep listening.
  updateNavbarBackground();
  window.addEventListener('scroll', updateNavbarBackground);

  /* -----------------------------------------------------------------
     4. ACTIVE LINK HIGHLIGHTING
     Compares each link's href against the current page's filename
     and adds ".is-active" to the one that matches, so visitors always
     know which page they're on.
     ----------------------------------------------------------------- */
  function highlightActiveLink() {
    var currentPage = window.location.pathname.split('/').pop();
    if (currentPage === '') {
      currentPage = 'index.html';
    }

    var links = navbar.querySelectorAll('.navbar-links a[href]');
    links.forEach(function (link) {
      var linkPage = link.getAttribute('href');
      if (linkPage === currentPage) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
  }

  highlightActiveLink();
});
