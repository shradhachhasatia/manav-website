/* ─── THEME ─── */
const themeToggles = document.querySelectorAll('.theme-toggle');
document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'dark');
themeToggles.forEach(t => t.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}));

/* ─── SCROLL REVEAL (smooth entrances) ─── */
const revealEls = document.querySelectorAll('.tl-card, .entry, .cred, .comedy-card, .book-row, .stat, .page-hero, .section-head');
if (revealEls.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => { el.classList.add('reveal'); io.observe(el); });
}

/* ─── WORKSHOP FILTER (workshops page) ─── */
const tabs = document.querySelectorAll('.filter-tab');
const workshopsGrid = document.getElementById('workshopsGrid');
if (tabs.length && workshopsGrid) {
  const cards = document.querySelectorAll('.workshop-card');
  function applyFilter(filter) {
    workshopsGrid.style.opacity = '0';
    workshopsGrid.style.transform = 'translateY(10px)';
    setTimeout(() => {
      cards.forEach(c => { c.style.display = c.dataset.category === filter ? 'flex' : 'none'; });
      workshopsGrid.classList.add('active');
      workshopsGrid.style.opacity = '1';
      workshopsGrid.style.transform = 'translateY(0)';
    }, 180);
  }
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    applyFilter(tab.dataset.filter);
  }));
  tabs[0].classList.add('active');
  applyFilter(tabs[0].dataset.filter);
}

/* ─── APPLE FOLDER DOCK (expands inline + auto-hide on scroll) ─── */
const dock = document.getElementById('dock');
const dockFolder = document.getElementById('dockFolder');
function closeDock() { if (dock) dock.classList.remove('open'); }

let dockIdle;
function showDock() {
  if (!dock) return;
  dock.classList.remove('dock-hidden');
  clearTimeout(dockIdle);
  dockIdle = setTimeout(() => {
    if (!dock.classList.contains('open')) dock.classList.add('dock-hidden');
  }, 2600);
}

if (dockFolder) {
  dockFolder.addEventListener('click', e => { e.stopPropagation(); dock.classList.toggle('open'); showDock(); });
}
document.addEventListener('click', e => {
  if (dock && dock.classList.contains('open') && !dock.contains(e.target)) closeDock();
});
if (dock) {
  ['scroll', 'touchstart', 'wheel'].forEach(ev => window.addEventListener(ev, showDock, { passive: true }));
  showDock();
}

/* ─── PREVIEW MODAL (Level-2 medium-detail) ─── */
const overlay = document.getElementById('previewModal');
if (overlay) {
  const previews = {
    workshops: {
      eyebrow: 'What I Teach',
      title: 'Workshops & Certifications',
      desc: 'Eight workshops across SAFe® certification, Agile & Scrum, AI for project managers, and career transitions — each run like a stand-up set, not a slide deck.',
      chips: ['SAFe®', 'Agile', 'AI for PMs', 'Career'],
      img: 'https://picsum.photos/seed/manav-ws-prev/640/360',
      href: 'workshops.html'
    },
    books: {
      eyebrow: 'The Library',
      title: 'Books',
      desc: 'Business books written like fiction. The When Sally Met… series teaches Scrum, Kanban and Agile through a story you will actually finish.',
      chips: ['Author', 'When Sally Met…', '5 titles'],
      img: 'https://picsum.photos/seed/manav-bk-prev/640/360',
      href: 'books.html'
    },
    comedy: {
      eyebrow: 'On Stage',
      title: 'Stand-Up Comedy',
      desc: 'Corporate stand-up and event sets that make tech, agile and office life genuinely funny — keynotes, team offsites and club shows.',
      chips: ['Corporate', 'Offsites', 'Clubs'],
      img: 'https://picsum.photos/seed/manav-cm-prev/640/360',
      href: 'comedy.html'
    },
    contact: {
      eyebrow: 'Ready when you are',
      title: 'Get in Touch',
      desc: 'Tell me what is broken in your team — Agile, AI, or Monday mornings — and how I can help. Workshops, talks, books or a comedy set.',
      chips: ['Book a workshop', 'Book a set', 'Say hi'],
      img: 'https://picsum.photos/seed/manav-ct-prev/640/360',
      href: 'contact.html'
    }
  };

  const elImg = overlay.querySelector('.modal-img');
  const elEyebrow = overlay.querySelector('.modal-eyebrow');
  const elTitle = overlay.querySelector('.modal-title');
  const elDesc = overlay.querySelector('.modal-desc');
  const elChips = overlay.querySelector('.modal-chips');
  const elExplore = overlay.querySelector('.modal-explore');

  function openModal(key) {
    const p = previews[key];
    if (!p) return;
    if (elImg) elImg.src = p.img;
    elEyebrow.textContent = p.eyebrow;
    elTitle.textContent = p.title;
    elDesc.textContent = p.desc;
    elChips.innerHTML = p.chips.map(c => `<span class="chip">${c}</span>`).join('');
    elExplore.setAttribute('href', p.href);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.dock-app[data-target]').forEach(btn =>
    btn.addEventListener('click', () => { closeDock(); openModal(btn.dataset.target); }));
  overlay.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeDock(); } });
}
