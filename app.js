/* ─── COLOR THEME (shared across sidebar + mobile toggles) ─── */
const themeToggles = document.querySelectorAll('.theme-toggle');
document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'dark');
themeToggles.forEach(t => t.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}));

/* ─── VIEW ROUTER (app-shell: swap views in place, no reload) ─── */
const views = document.querySelectorAll('.view');
if (views.length) {
  const navLinks = document.querySelectorAll('.sb-link[href^="#"], .bb-link[href^="#"]');
  function showView(id) {
    if (!document.getElementById(id)) id = 'home';
    views.forEach(v => v.classList.toggle('active', v.id === id));
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
    window.scrollTo({ top: 0 });
  }
  window.addEventListener('hashchange', () => showView((location.hash || '#home').slice(1)));
  showView((location.hash || '#home').slice(1));
}

/* ─── KEYWORD CAROUSEL (Level 1 hero hook) ─── */
const targetSpan = document.getElementById('scramble-word');
if (targetSpan) {
  const words = ['devs', 'PMs', 'leads', 'teams', 'orgs', 'VPs', 'POs'];
  let i = 0;
  setInterval(() => {
    targetSpan.classList.add('fade-out');
    setTimeout(() => {
      i = (i + 1) % words.length;
      targetSpan.textContent = words[i];
      targetSpan.classList.remove('fade-out');
      targetSpan.classList.add('fade-in');
      setTimeout(() => targetSpan.classList.remove('fade-in'), 300);
    }, 300);
  }, 2400);
}

/* ─── WORKSHOP FILTER (dedicated page; supports #category deep-link) ─── */
const tabs = document.querySelectorAll('.filter-tab');
const workshopsGrid = document.getElementById('workshopsGrid');
if (tabs.length && workshopsGrid) {
  const cards = document.querySelectorAll('.workshop-card');

  function applyFilter(filter) {
    workshopsGrid.style.opacity = '0';
    workshopsGrid.style.transform = 'translateY(10px)';
    setTimeout(() => {
      cards.forEach(card => { card.style.display = card.dataset.category === filter ? 'flex' : 'none'; });
      workshopsGrid.classList.add('active');
      workshopsGrid.style.opacity = '1';
      workshopsGrid.style.transform = 'translateY(0)';
    }, 200);
  }

  function activate(tab) {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    applyFilter(tab.dataset.filter);
  }

  tabs.forEach(tab => tab.addEventListener('click', () => activate(tab)));

  // Deep-link: workshops.html#safe opens that category directly.
  const fromHash = [...tabs].find(t => t.dataset.filter === location.hash.slice(1));
  if (fromHash) activate(fromHash);
  else if (workshopsGrid.dataset.autoOpen === 'true') activate(tabs[0]);
  else cards.forEach(card => { card.style.display = 'none'; });
}
