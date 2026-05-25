/* ─── THEME ─── */
const themeToggles = document.querySelectorAll('.theme-toggle');
document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'dark');
themeToggles.forEach(t => t.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}));

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

/* ─── PREVIEW MODAL (dedicated-page bottom nav) ─── */
const overlay = document.getElementById('previewModal');
if (overlay) {
  const previews = {
    workshops: {
      eyebrow: 'What I Teach',
      title: 'Workshops & Certifications',
      desc: 'Eight workshops across SAFe® certification, Agile & Scrum, AI for project managers, and career transitions — each run like a stand-up set, not a slide deck.',
      chips: ['SAFe®', 'Agile', 'AI for PMs', 'Career'],
      href: 'workshops.html'
    },
    books: {
      eyebrow: 'The Library',
      title: 'Books',
      desc: 'Business books written like fiction. The When Sally Met… series teaches Scrum, Kanban and Agile through a story you will actually finish.',
      chips: ['Author', 'When Sally Met…', '5 titles'],
      href: 'books.html'
    },
    comedy: {
      eyebrow: 'On Stage',
      title: 'Stand-Up Comedy',
      desc: 'Corporate stand-up and event sets that make tech, agile and office life genuinely funny — keynotes, team offsites and club shows.',
      chips: ['Corporate', 'Offsites', 'Clubs'],
      href: 'comedy.html'
    },
    contact: {
      eyebrow: 'Ready when you are',
      title: 'Get in Touch',
      desc: 'Tell me what is broken in your team — Agile, AI, or Monday mornings — and how I can help. Workshops, talks, books or a comedy set.',
      chips: ['Book a workshop', 'Book a set', 'Say hi'],
      href: 'contact.html'
    }
  };

  const elEyebrow = overlay.querySelector('.modal-eyebrow');
  const elTitle = overlay.querySelector('.modal-title');
  const elDesc = overlay.querySelector('.modal-desc');
  const elChips = overlay.querySelector('.modal-chips');
  const elExplore = overlay.querySelector('.modal-explore');

  function openModal(key) {
    const p = previews[key];
    if (!p) return;
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

  document.querySelectorAll('.bn-item[data-target]').forEach(btn =>
    btn.addEventListener('click', () => openModal(btn.dataset.target)));
  overlay.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}
