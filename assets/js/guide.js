/* ============================================================
   KHAI ẤN SỬ VIỆT — Guide Page JavaScript
   AR Guide Animation & Timeline
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     AR GUIDE ANIMATION — IntersectionObserver controlled
     Only runs rAF when section is visible in viewport
     ============================================================ */
  const arGuideCards = document.querySelectorAll('.ar-guide__card');
  const guidePath = document.getElementById('guidePath');
  const guideTraveler = document.getElementById('guideTraveler');

  if (arGuideCards.length > 0 && guidePath && guideTraveler) {
    const totalDuration = 16000; // 16s cycle
    const pathLength = guidePath.getTotalLength();
    let cardThresholds = [0, 0, 0, 0];
    let containerHeight = 0;
    let arAnimationId = null;
    let isArSectionVisible = false;
    
    function cachePositions() {
      const pathRect = guidePath.getBoundingClientRect();
      containerHeight = pathRect.height;
      cardThresholds = Array.from(arGuideCards).map(card => {
        return card.getBoundingClientRect().top - pathRect.top - 50;
      });
    }
    
    // Debounce resize for position caching
    let arResizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(arResizeTimeout);
      arResizeTimeout = setTimeout(cachePositions, 150);
    });
    // Initial cache after a short delay to ensure layout is settled
    setTimeout(cachePositions, 100);
    
    function updateArGuideHighlight(timestamp) {
      if (!isArSectionVisible) {
        arAnimationId = null;
        return;
      }

      if (!timestamp) timestamp = performance.now();
      
      const currentCycleTime = timestamp % totalDuration;
      const progress = currentCycleTime / totalDuration;
      
      // Get exact point on SVG path
      const point = guidePath.getPointAtLength(progress * pathLength);
      
      // Update HTML Traveler position (using % allows it to perfectly track the stretched SVG)
      guideTraveler.style.left = `${point.x}%`;
      guideTraveler.style.top = `${point.y}%`;
      
      // Calculate traveler Y position relative to container
      const travelerCenterY = (point.y / 100) * containerHeight;
      
      let activeIndex = 0;
      arGuideCards.forEach((card, index) => {
        // If traveler is within or past the top of the card
        if (travelerCenterY >= cardThresholds[index]) {
          activeIndex = index;
        }
      });
      
      arGuideCards.forEach((card, index) => {
        if (index === activeIndex) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
      
      arAnimationId = requestAnimationFrame(updateArGuideHighlight);
    }

    // IntersectionObserver: only animate when AR section is visible
    const arGuideSection = document.getElementById('ar-guide');
    if (arGuideSection) {
      const arObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isArSectionVisible = entry.isIntersecting;
          if (isArSectionVisible && !arAnimationId) {
            cachePositions();
            arAnimationId = requestAnimationFrame(updateArGuideHighlight);
          }
        });
      }, { rootMargin: '100px 0px', threshold: 0 });
      arObserver.observe(arGuideSection);
    } else {
      // Fallback if section not found — start immediately
      requestAnimationFrame(updateArGuideHighlight);
    }
  }

  /* ============================================================
     SCROLL UNROLL EFFECT FOR ANCIENT PAPER
     ============================================================ */
  const journeyGrid = document.querySelector('.guide-journey__grid.vertical-scroll');
  if (journeyGrid) {
    // Smooth lerp variables
    let currentProgress = 0.05;
    let targetProgress = 0.05;
    const unrollOffset = window.innerHeight * 0.25; // Trigger earlier
    let rafId = null;

    function lerp(start, end, amt) {
      return (1 - amt) * start + amt * end;
    }

    function smoothUnroll() {
      // Smoothly interpolate current progress towards target
      currentProgress = lerp(currentProgress, targetProgress, 0.06);
      
      // Stop animating if we're close enough to the target
      if (Math.abs(currentProgress - targetProgress) > 0.001) {
        journeyGrid.style.setProperty('--unroll-progress', currentProgress);
        rafId = requestAnimationFrame(smoothUnroll);
      } else {
        journeyGrid.style.setProperty('--unroll-progress', targetProgress);
        rafId = null;
      }
    }

    function updateUnroll() {
      const rect = journeyGrid.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate progress: how much of the grid SHOULD be unrolled
      let progress = (viewportHeight - unrollOffset - rect.top) / rect.height;
      
      // Clamp between 0.05 (just showing top roller) and 1 (fully unrolled)
      if (progress < 0.05) progress = 0.05; 
      if (progress > 1.05) progress = 1.05; // allow a bit extra to ensure it clears
      
      targetProgress = progress;
      
      // Start the animation loop if it's not already running
      if (!rafId) {
        rafId = requestAnimationFrame(smoothUnroll);
      }
    }

    window.addEventListener('scroll', updateUnroll, { passive: true });
    window.addEventListener('resize', updateUnroll, { passive: true });
    // Initial call
    updateUnroll();
  }

})();
