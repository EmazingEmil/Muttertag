// Adds flower interactivity, typewriter effect for Muttertag message, and particle effects
window.addEventListener('DOMContentLoaded', () => {
  // Start overlay logic
  const overlay = document.getElementById('start-overlay');
  const btn = document.getElementById('start-btn');
  if (overlay && btn) {
    // Hide everything except background until button is clicked
    document.body.classList.add('not-loaded');
    document.querySelector('.muttertag-message').style.display = 'none';
    document.querySelector('.flowers').style.display = 'none';
    document.querySelector('.night').style.display = '';
    // Remove any previous typewriter effect
    let typewriterStarted = false;
    btn.addEventListener('click', () => {
      overlay.classList.add('hide');
      setTimeout(() => {
        overlay.style.display = 'none';
        document.body.classList.remove('not-loaded');
        document.querySelector('.muttertag-message').style.display = '';
        document.querySelector('.flowers').style.display = '';
        // Start typewriter effect only after overlay is fully hidden
        if (!typewriterStarted) {
          typewriterStarted = true;
          const msg = 'Alles gute zum Muttertag! 🌷';
          const msgElem = document.getElementById('muttertag-text');
          if(msgElem) {
            msgElem.innerHTML = '<span class="typed"></span>';
            const typed = msgElem.querySelector('.typed');
            let i = 0;
            function type() {
              if(i <= msg.length) {
                typed.textContent = msg.slice(0,i);
                i++;
                setTimeout(type, 70);
              } else {
                typed.style.borderRight = 'none';
              }
            }
            setTimeout(type, 2000); // small delay for smoothness
            // After typewriter animation, add effects
            function afterTypewriterEffects() {
              // 1. Glow/Neon effect
              typed.classList.add('muttertag-glow');
              // 2. Scale/Bounce
              typed.classList.add('muttertag-bounce');
              // 3. Color Gradient Animation
              typed.classList.add('muttertag-gradient');
              // 4. Letter Spacing Animation
              typed.classList.add('muttertag-spacing');
              // 5. Sparkle/Particle Burst
              for(let i=0;i<18;i++) {
                setTimeout(()=>{
                  const rect = typed.getBoundingClientRect();
                  const cx = rect.left + rect.width/2;
                  const cy = rect.top + rect.height/2;
                  createParticle(cx, cy, `hsl(${Math.floor(Math.random()*60+160)},80%,85%)`);
                }, i*40);
              }
            }
            // Wait for typewriter to finish, then trigger effects
            const totalTypeTime = msg.length * 70 + 200; // ms
            setTimeout(afterTypewriterEffects, totalTypeTime);
          }
        }
      }, 3000); // Wait for overlay hide animation to finish
    });
  }

  // Particle system for flower click
  function createParticle(x, y, color) {
    const p = document.createElement('div');
    p.className = 'flower-particle';
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.background = color;
    p.style.width = p.style.height = (Math.random() * 8 + 8) + 'px';
    p.style.opacity = 0.7;
    p.style.position = 'fixed';
    p.style.borderRadius = '50%';
    p.style.pointerEvents = 'none';
    p.style.zIndex = 1200;
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 80 + 40;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    p.animate([
      { transform: 'translate(0,0)', opacity: 1 },
      { transform: `translate(${dx}px,${dy}px) scale(0.7)`, opacity: 0 }
    ], {
      duration: 900 + Math.random()*400,
      easing: 'cubic-bezier(.5,0,.5,1)'
    });
    setTimeout(() => p.remove(), 1200);
    document.body.appendChild(p);
  }

  // --- Hover floating particles ---
  function createFloatingParticle(x, y, color) {
    const p = document.createElement('div');
    p.className = 'flower-hover-particle';
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.background = color;
    const size = Math.random() * 10 + 10;
    p.style.width = p.style.height = size + 'px';
    p.style.opacity = 0.8;
    p.style.position = 'fixed';
    p.style.zIndex = 1200;
    p.style.pointerEvents = 'none';
    p.style.borderRadius = '50%';
    // Float up and fade
    const dx = (Math.random() - 0.5) * 40;
    const dy = -Math.random() * 80 - 40;
    p.animate([
      { transform: 'translate(0,0)', opacity: 1 },
      { transform: `translate(${dx}px,${dy}px) scale(0.7)`, opacity: 0 }
    ], {
      duration: 1800 + Math.random()*600,
      easing: 'cubic-bezier(.5,0,.5,1)'
    });
    setTimeout(() => p.remove(), 2200);
    document.body.appendChild(p);
  }

  document.querySelectorAll('.flower').forEach(flower => {
    flower.addEventListener('click', function(e) {
      flower.classList.add('bloomed');
      setTimeout(() => flower.classList.remove('bloomed'), 700);
      // Particle burst
      const rect = flower.getBoundingClientRect();
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2;
      for(let i=0;i<18;i++) {
        createParticle(cx, cy, `hsl(${Math.floor(Math.random()*60+160)},80%,70%)`);
      }
    });

    // --- Hover logic ---
    let hoverInterval = null;
    let hoverActive = false;
    flower.addEventListener('mouseenter', function(e) {
      flower.classList.add('glow');
      hoverActive = true;
      const rect = flower.getBoundingClientRect();
      function spawnHoverParticle() {
        if (!hoverActive) return;
        const cx = rect.left + rect.width/2 + (Math.random()-0.5)*rect.width*0.5;
        const cy = rect.top + rect.height/2 + (Math.random()-0.5)*rect.height*0.5;
        createFloatingParticle(cx, cy, `hsl(${Math.floor(Math.random()*60+160)},80%,85%)`);
        hoverInterval = setTimeout(spawnHoverParticle, 120 + Math.random()*80);
      }
      spawnHoverParticle();
    });
    flower.addEventListener('mouseleave', function() {
      flower.classList.remove('glow');
      hoverActive = false;
      if (hoverInterval) clearTimeout(hoverInterval);
    });
  });

  // Remove emoji/petal floating code if present
  document.querySelectorAll('.floating-petal, .floating-sparkle').forEach(e=>e.remove());
});

// Particle CSS
const style = document.createElement('style');
style.textContent = `
.flower-particle {
  position: fixed;
  pointer-events: none;
  z-index: 1200;
  will-change: transform, opacity;
  box-shadow: 0 0 8px 2px #fffbe7, 0 0 2px #fffbe7;
  transition: opacity 0.2s;
}
`;
document.head.appendChild(style);
