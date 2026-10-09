const counters = document.querySelectorAll('[data-target]');

const animateCounter = (counter) => {
  const target = Number(counter.dataset.target);
  const duration = 1200;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    counter.textContent = value + (target >= 100 ? '%' : '');

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      counter.textContent = target + (target >= 100 ? '%' : '');
    }
  };

  requestAnimationFrame(tick);
};

counters.forEach((counter) => {
  animateCounter(counter);
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    nav.style.position = 'absolute';
    nav.style.top = '78px';
    nav.style.left = '16px';
    nav.style.right = '16px';
    nav.style.padding = '18px';
    nav.style.background = 'rgba(255,255,255,0.96)';
    nav.style.border = '1px solid rgba(13,110,78,0.08)';
    nav.style.borderRadius = '18px';
    nav.style.flexDirection = 'column';
    nav.style.boxShadow = '0 18px 30px rgba(15, 28, 24, 0.08)';
  });
}

document.getElementById('year').textContent = new Date().getFullYear();
