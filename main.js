/* =============================================
   SMART TRADE AFRICA — Landing v2 JavaScript
   Scroll reveals, animated counters, flow demo,
   cursor glow, and nav scroll behavior
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  // === CUSTOM BRANDED CURSOR ===
  const customCursor = document.getElementById('customCursor');
  const cursorGlow = document.getElementById('cursorGlow');
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    // Cursor follows mouse with slight lag
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    customCursor.style.left = cursorX + 'px';
    customCursor.style.top = cursorY + 'px';

    // Glow follows with more lag
    glowX += (mouseX - glowX) * 0.06;
    glowY += (mouseY - glowY) * 0.06;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor hover state on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .pillar-card, .problem-card, .country-dot');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => customCursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => customCursor.classList.remove('hovering'));
  });

  // === MAGNETIC BUTTONS ===
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  // === KINETIC TEXT (scroll-driven) ===
  const kineticText = document.getElementById('kineticText');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      kineticText.classList.add('scrolled');
    } else {
      kineticText.classList.remove('scrolled');
    }
  });

  // === NAV SCROLL BEHAVIOR ===
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // === MOBILE NAV TOGGLE ===
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'rgba(10, 10, 10, 0.98)';
      navLinks.style.padding = '24px';
      navLinks.style.gap = '16px';
      navLinks.style.borderBottom = '1px solid rgba(212, 175, 55, 0.15)';
    });
  }

  // === SCROLL REVEAL (IntersectionObserver) ===
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100); // Stagger
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // === ANIMATED COUNTERS ===
  function animateCounter(element) {
    const target = parseFloat(element.dataset.target);
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    const isDecimal = target % 1 !== 0;
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      if (isDecimal) {
        element.textContent = prefix + current.toFixed(1) + suffix;
      } else {
        element.textContent = prefix + Math.floor(current) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // Observe stat numbers
  const statNumbers = document.querySelectorAll('[data-target]');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statObserver.observe(el));

  // === FLOW DEMO ANIMATION ===
  const flowSteps = document.querySelectorAll('.flow-step');
  let currentFlowStep = 0;

  function animateFlow() {
    flowSteps.forEach(step => step.classList.remove('active'));
    flowSteps[currentFlowStep].classList.add('active');
    currentFlowStep = (currentFlowStep + 1) % flowSteps.length;
  }

  // Start flow animation when visible
  const flowDemo = document.querySelector('.flow-demo');
  const flowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setInterval(animateFlow, 1500);
        flowObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  if (flowDemo) flowObserver.observe(flowDemo);

  // === HERO PARTICLES (subtle floating dots) ===
  const particlesContainer = document.getElementById('heroParticles');
  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: rgba(212, 175, 55, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: particleFloat ${Math.random() * 10 + 10}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      particlesContainer.appendChild(particle);
    }

    // Add particle animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes particleFloat {
        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
        25% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.2); opacity: 0.8; }
        50% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) scale(0.8); opacity: 0.3; }
        75% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.1); opacity: 0.6; }
      }
    `;
    document.head.appendChild(style);
  }

  // === MAP ARC ANIMATION RESTART ON SCROLL ===
  const africaSvg = document.getElementById('africaSvg');
  if (africaSvg) {
    const mapObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const arcs = africaSvg.querySelectorAll('.trade-arc');
          arcs.forEach(arc => {
            arc.style.animation = 'none';
            arc.offsetHeight; // force reflow
            arc.style.animation = '';
          });
        }
      });
    }, { threshold: 0.2 });
    mapObserver.observe(africaSvg);
  }

  // === SMOOTH SCROLL FOR ANCHOR LINKS ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  console.log('✨ Smart Trade Africa Landing v2 loaded');
});
