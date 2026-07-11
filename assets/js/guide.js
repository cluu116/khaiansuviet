/* ============================================================
   KHAI ẤN SỬ VIỆT — Guide Page JavaScript
   Royal Scroll & AR Timeline Animations
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     AR TIMELINE PROGRESS & ACTIVATION
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

  /* ============================================================
     3. GUIDE PROGRESS DOTS NAVIGATION
     ============================================================ */
  const progressContainer = document.getElementById('guideProgress');
  const progressDots = document.querySelectorAll('.guide__progress-dot');
  
  if (progressContainer && progressDots.length > 0) {
    // Show/hide progress bar based on scroll position
    function handleProgressVisibility() {
      if (window.scrollY > 200) {
        progressContainer.classList.add('visible');
      } else {
        progressContainer.classList.remove('visible');
      }
    }
    
    window.addEventListener('scroll', handleProgressVisibility, { passive: true });
    handleProgressVisibility();

    // Click to scroll
    progressDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const targetId = dot.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          const navHeight = 70; // Approximate navbar height
          const targetPos = targetSection.getBoundingClientRect().top + window.scrollY - navHeight - 20;
          window.scrollTo({
            top: targetPos,
            behavior: 'smooth'
          });
        }
      });
    });

    // Update active dot using Intersection Observer
    const sections = Array.from(progressDots).map(dot => document.getElementById(dot.getAttribute('data-target'))).filter(Boolean);
    
    if (sections.length > 0) {
      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      };

      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            progressDots.forEach(dot => {
              dot.classList.remove('active');
              if (dot.getAttribute('data-target') === id) {
                dot.classList.add('active');
              }
            });
          }
        });
      }, observerOptions);

      sections.forEach(section => {
        sectionObserver.observe(section);
      });
    }
  }

})();