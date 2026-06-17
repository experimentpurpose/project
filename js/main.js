/* =========================================================================
   js/main.js
   -------------------------------------------------------------------------
   PURPOSE: General, site-wide behavior that doesn't belong to one single
   component. This file handles:
     1. Scroll-reveal animations (fading/sliding sections into view)
     2. The animated number counters in the statistics section
     3. Automatically writing the current year into the footer

   Page-specific or component-specific logic lives elsewhere:
     - Everything about the nav bar           -> js/navbar.js
     - Everything about the contact form      -> js/contact.js
   This keeps each script focused and easy to navigate, instead of one
   giant file mixing unrelated features together.
   ========================================================================= */

document.addEventListener('DOMContentLoaded', function () {
  initScrollReveal();
  initStatsCounters();
  initFooterYear();
});

/* ---------------------------------------------------------------------
   1. SCROLL REVEAL
   Any element with the class "reveal" starts hidden (see animations.css).
   We use IntersectionObserver to watch for when each one enters the
   viewport, then add "is-visible" to trigger its CSS transition.
   This is more efficient than listening to the "scroll" event directly,
   since the browser only notifies us when something actually changes.
   --------------------------------------------------------------------- */
function initScrollReveal() {
  var revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length === 0) {
    return;
  }

  // Fallback for very old browsers without IntersectionObserver support:
  // just show everything immediately instead of leaving it invisible.
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Once revealed, we don't need to keep watching this element.
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15, // trigger once 15% of the element is visible
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach(function (el) {
    observer.observe(el);
  });
}

/* ---------------------------------------------------------------------
   2. ANIMATED STATS COUNTERS
   Elements like <span class="stat-number" data-count-to="10000"
   data-suffix="+"></span> start at 0 and animate up to their target
   number once they scroll into view, giving the statistics section a
   sense of motion instead of just appearing as static text.
   --------------------------------------------------------------------- */
function initStatsCounters() {
  var counters = document.querySelectorAll('[data-count-to]');

  if (counters.length === 0) {
    return;
  }

  var ANIMATION_DURATION_MS = 1400;

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count-to'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var startTime = null;

    function step(timestamp) {
      if (startTime === null) {
        startTime = timestamp;
      }
      var elapsed = timestamp - startTime;
      var progress = Math.min(elapsed / ANIMATION_DURATION_MS, 1);

      // Ease-out so the count starts fast and settles gently at the end.
      var eased = 1 - Math.pow(1 - progress, 3);
      var currentValue = Math.floor(eased * target);

      el.textContent = currentValue.toLocaleString() + suffix;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString() + suffix;
      }
    }

    window.requestAnimationFrame(step);
  }

  // Only animate a counter once it's actually visible on screen.
  var counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(function (counter) {
    counterObserver.observe(counter);
  });
}

/* ---------------------------------------------------------------------
   3. FOOTER YEAR
   Finds <span id="current-year"></span> in the footer and fills it in
   with the real current year, so the copyright notice never goes stale.
   --------------------------------------------------------------------- */
function initFooterYear() {
  var yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
