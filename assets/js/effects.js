/* ============================================================
   KHAI ẤN SỬ VIỆT — Atmosphere Effects
   Gold Dust / Embers floating in the air
   ============================================================ */

(function () {
  'use strict';

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
  canvas.style.opacity = '0.6';
  canvas.style.mixBlendMode = 'screen';
  
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let bgGradient = null; // Cache gradient — chỉ tạo lại khi resize

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Tạo lại gradient khi kích thước thay đổi
    bgGradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width / 2);
    bgGradient.addColorStop(0, 'rgba(184, 134, 11, 0.03)');
    bgGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  }

  window.addEventListener('resize', resize);
  resize();

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
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.shadowBlur = this.size * 3;
      ctx.shadowColor = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
      ctx.shadowBlur = 0; // Reset để tránh shadow tích lũy giữa các particle
    }
  }

  function initParticles() {
    particles = [];
    // Adjust number of particles based on screen width for performance
    const particleCount = Math.floor(width / 20);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  
  initParticles();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Sử dụng gradient đã cache (tạo lại khi resize)
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
})();
