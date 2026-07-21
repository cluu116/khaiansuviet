/* ============================================================
   KHAI ẤN SỬ VIỆT — Atmosphere Effects
   Gold Dust / Embers floating in the air
   Optimized: viewport-aware, 30fps on mobile, paused when hidden
   ============================================================ */

(function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches) return;

  // Create canvas for atmospheric effect
  const canvas = document.createElement('canvas');
  canvas.id = 'ambient-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '1'; // Behind most elements but above base background
  canvas.style.pointerEvents = 'none';
  canvas.style.opacity = '0.8'; // Tăng opacity nhẹ để dễ nhìn hơn trên nền sáng

  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let bgGradient = null; // Cache gradient — chỉ tạo lại khi resize
  let animationId = null;
  let isPageVisible = true;
  let isInViewport = true; // Track viewport visibility
  let isMobile = false;
  let lastFrameTime = 0;
  let frameInterval = 1000 / 60; // Default 60fps

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Detect mobile and set target FPS
    isMobile = width < 768;
    frameInterval = isMobile ? 1000 / 30 : 1000 / 60; // 30fps mobile, 60fps desktop

    // Tạo lại gradient khi kích thước thay đổi
    bgGradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width / 2);
    bgGradient.addColorStop(0, 'rgba(184, 134, 11, 0.03)');
    bgGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    // Re-init particles on resize (handles orientation change)
    initParticles();
  }

  // Debounce resize to avoid excessive re-init
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 200);
  });

  class Particle {
    constructor() {
      this.reset();
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 100;
      this.size = Math.random() * 2 + 0.5;
      this.speedY = -(Math.random() * 0.5 + 0.2); // float up slowly
      this.speedX = (Math.random() - 0.5) * 0.4; // drift horizontally
      this.opacity = Math.random() * 0.5 + 0.2;
      // Gold and Ember colors
      this.color = Math.random() > 0.5 ? '218, 165, 32' : '255, 140, 0';
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;

      // Twinkle effect
      this.opacity += (Math.random() - 0.5) * 0.05;
      if (this.opacity < 0.1) this.opacity = 0.1;
      if (this.opacity > 0.8) this.opacity = 0.8;

      if (this.y < -10) {
        this.reset();
      }
    }

    draw() {
      // Draw glow (larger, transparent circle) — replaces expensive shadowBlur
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity * 0.15})`;
      ctx.fill();

      // Draw core particle
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    // Reduce particle count on mobile for performance
    const divisor = isMobile ? 55 : 32;
    const particleCount = Math.min(Math.floor(width / divisor), isMobile ? 28 : 60);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function shouldAnimate() {
    return isPageVisible && isInViewport;
  }

  function startAnimation() {
    if (!animationId && shouldAnimate()) {
      lastFrameTime = 0;
      animationId = requestAnimationFrame(animate);
    }
  }

  function stopAnimation() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  function animate(timestamp) {
    if (!shouldAnimate()) {
      animationId = null;
      return;
    }

    // Throttle framerate: 30fps on mobile, 60fps on desktop
    if (lastFrameTime > 0) {
      const elapsed = timestamp - lastFrameTime;
      if (elapsed < frameInterval) {
        animationId = requestAnimationFrame(animate);
        return;
      }
    }
    lastFrameTime = timestamp;

    ctx.clearRect(0, 0, width, height);

    // Initialize bgGradient if it hasn't been created yet
    if (!bgGradient) {
      resize();
    }

    // Sử dụng gradient đã cache (tạo lại khi resize)
    if (bgGradient) {
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);
    }

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    animationId = requestAnimationFrame(animate);
  }

  // Page Visibility API — pause animation when tab is hidden
  document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
    if (isPageVisible) {
      startAnimation();
    } else {
      stopAnimation();
    }
  });

  function start() {
    resize();
    startAnimation();
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(start, { timeout: 1200 });
  } else {
    setTimeout(start, 300);
  }
})();
