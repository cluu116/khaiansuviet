/* ============================================================
   KHAI ẤN SỬ VIỆT — Guide Page JavaScript
   Royal Scroll & AR Timeline Animations
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================


  /* ============================================================
     2. AR TIMELINE PROGRESS & ACTIVATION
     ============================================================ */
  const arContainer = document.querySelector('.ar-timeline-container');
  const arProgress = document.getElementById('arProgress');
  const arGlow = document.querySelector('.ar-timeline-glow');
  const arSteps = document.querySelectorAll('.ar-step');

  if (arContainer && arProgress && arSteps.length > 0) {
    let timelineRafId = null;

    function updateTimeline() {
      const rect = arContainer.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.6; // Trigger point
      
      let progressRaw = (viewportCenter - rect.top) / rect.height;
      
      if (progressRaw < 0) progressRaw = 0;
      if (progressRaw > 1) progressRaw = 1;

      // Update progress bar height
      arProgress.style.height = `${progressRaw * 100}%`;
      
      // Update glow dot opacity & position
      if (progressRaw > 0 && progressRaw < 1) {
        arGlow.style.opacity = '1';
        arGlow.style.bottom = `calc(${100 - (progressRaw * 100)}% - 10px)`;
      } else {
        arGlow.style.opacity = '0';
      }

      // Check step activation
      arSteps.forEach(step => {
        const stepRect = step.getBoundingClientRect();
        if (stepRect.top < viewportCenter) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });

      timelineRafId = null;
    }

    function onScrollTimeline() {
      if (!timelineRafId) {
        timelineRafId = requestAnimationFrame(updateTimeline);
      }
    }

    window.addEventListener('scroll', onScrollTimeline, { passive: true });
    window.addEventListener('resize', onScrollTimeline, { passive: true });
    updateTimeline();
  }

})();
