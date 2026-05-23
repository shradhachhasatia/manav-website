/* ─── DYNAMIC COLOR THEME CONTROLLER ─── */
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const targetTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
  });
}

/* ─── NAV SCROLL TRIGGER ─── */
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ─── MOBILE DRAWER NAVIGATION ─── */
const mobileMenu = document.getElementById('mobileMenu');
function openMobile() { if (mobileMenu) mobileMenu.classList.add('open'); }
function closeMobile() { if (mobileMenu) mobileMenu.classList.remove('open'); }
const menuClose = document.getElementById('menuClose');
if (menuClose) menuClose.onclick = closeMobile;

/* ─── SMOOTH DYNAMIC TEXT INLINE CAROUSEL (ZERO CLIPPING ENGINE) ─── */
const targetSpan = document.getElementById('scramble-word');
if (targetSpan) {
  const carouselWords = ['devs', 'PMs', 'leads', 'teams', 'orgs', 'VPs', 'POs'];
  let activeWordIndex = 0;
  setInterval(() => {
    targetSpan.classList.add('fade-out');
    setTimeout(() => {
      activeWordIndex = (activeWordIndex + 1) % carouselWords.length;
      targetSpan.textContent = carouselWords[activeWordIndex];
      targetSpan.classList.remove('fade-out');
      targetSpan.classList.add('fade-in');
      setTimeout(() => targetSpan.classList.remove('fade-in'), 300);
    }, 300);
  }, 2400);
}

/* ─── AUDIENCE MARQUEE CAROUSEL ─── */
const track = document.getElementById('tickerTrack');
if (track) {
  const audiences = [
    'Freshers & Career Switchers', 'Engineers → Management', 'Scrum Masters', 'Product Owners',
    'Mid-level Managers', 'Executives & VPs', 'AI-Anxious Teams', 'HR & L&D Buyers',
    'Startup Founders', 'Burned-Out Overachievers', 'New to PM', 'Senior Leaders'
  ];
  [...audiences, ...audiences].forEach(a => {
    const item = document.createElement('div');
    item.className = 'ticker-item';
    item.innerHTML = `<span class="dot"></span>${a}`;
    track.appendChild(item);
  });
}

/* ─── METRIC COUNT-UP CONTROLLER ─── */
function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
function animateCount(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const val = Math.floor(easeOut(progress) * target);
    el.textContent = val + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(step);
}

const counters = document.querySelectorAll('.count-up');
if (counters.length) {
  const metricObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target);
        metricObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => metricObs.observe(c));
}

/* ─── WORKSHOP FILTER REVEAL CONTROLLER ─── */
const tabs = document.querySelectorAll('.filter-tab');
const workshopsGrid = document.getElementById('workshopsGrid');
if (tabs.length && workshopsGrid) {
  const cards = document.querySelectorAll('.workshop-card');

  function applyFilter(filter) {
    workshopsGrid.style.opacity = '0';
    workshopsGrid.style.transform = 'translateY(10px)';
    setTimeout(() => {
      cards.forEach(card => {
        const match = card.dataset.category === filter;
        card.style.display = match ? 'flex' : 'none';
      });
      workshopsGrid.classList.add('active');
      workshopsGrid.style.opacity = '1';
      workshopsGrid.style.transform = 'translateY(0)';
    }, 200);
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      applyFilter(tab.dataset.filter);
    });
  });

  // On the dedicated workshops page, open the first category by default
  // so visitors immediately see content (they've already self-selected).
  if (workshopsGrid.dataset.autoOpen === 'true') {
    tabs[0].classList.add('active');
    applyFilter(tabs[0].dataset.filter);
  } else {
    cards.forEach(card => { card.style.display = 'none'; });
  }
}

/* ─── SCROLL REVEAL TRIGGERS ─── */
const fadeEls = document.querySelectorAll('.metric-item, .book-card, .do-card, .comedy-card, .book-detail-row');
if (fadeEls.length) {
  const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        fadeObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${(i % 4) * 0.08}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${(i % 4) * 0.08}s`;
    fadeObs.observe(el);
  });
}
