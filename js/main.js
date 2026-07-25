// === Mobil menü ===
const navToggle = document.querySelector('.nav-toggle');
navToggle?.addEventListener('click', () => {
  const links = document.querySelector('.nav-links');
  const open = links.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// === Tema (açık / karanlık) ===
function currentTheme() {
  const saved = document.documentElement.dataset.theme;
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function updateThemeButton() {
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  const dark = currentTheme() === 'dark';
  btn.textContent = dark ? '☀️' : '\u{1F319}';
  btn.setAttribute('aria-label', dark ? 'Açık temaya geç' : 'Karanlık temaya geç');
}

document.querySelector('.theme-toggle')?.addEventListener('click', () => {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
  updateThemeButton();
});

// === Yardımcılar ===
function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getParams() {
  return Object.fromEntries(new URLSearchParams(window.location.search));
}

function renderCard(item, linkBase) {
  return `
    <a href="${linkBase}?id=${item.id}" class="card">
      <div class="card-date">${formatDate(item.date)}</div>
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
      ${item.tags ? item.tags.map(t => `<span class="card-tag">${t}</span>`).join(' ') : ''}
    </a>
  `;
}

function renderThoughtCard(t) {
  return `
    <div class="thought-card">
      <div class="card-date">${formatDate(t.date)}</div>
      <p>${t.text}</p>
    </div>
  `;
}

function renderGalleryItem(photo) {
  return `
    <div class="gallery-item" data-src="${photo.src}" data-caption="${photo.caption}">
      <img src="${photo.src}" alt="${photo.caption}" loading="lazy"
           onerror="(this.closest('[data-gallery-entry]') || this.closest('.gallery-item')).remove()">
    </div>
  `;
}

// === Sayfa render'ları ===

// Ana sayfa
function renderHome() {
  const blogContainer = document.getElementById('latest-blogs');
  const thoughtContainer = document.getElementById('latest-thoughts');
  const galleryContainer = document.getElementById('gallery-preview');

  if (blogContainer && typeof BLOGS !== 'undefined') {
    blogContainer.innerHTML = BLOGS.slice(0, 2).map(b => renderCard(b, 'post.html')).join('');
  }
  if (thoughtContainer && typeof THOUGHTS !== 'undefined') {
    thoughtContainer.innerHTML = THOUGHTS.slice(0, 3).map(t => renderThoughtCard(t)).join('');
  }
  if (galleryContainer && typeof GALLERY !== 'undefined') {
    galleryContainer.innerHTML = GALLERY.slice(0, 4).map(p => renderGalleryItem(p)).join('');
  }
}

// Blog listesi + etiket filtresi
function renderBlogList(activeTag) {
  const container = document.getElementById('blog-list');
  if (!container || typeof BLOGS === 'undefined') return;

  const posts = activeTag ? BLOGS.filter(b => b.tags?.includes(activeTag)) : BLOGS;
  container.innerHTML = posts.map(b => renderCard(b, 'post.html')).join('');

  const filterEl = document.getElementById('tag-filter');
  if (!filterEl) return;
  const tags = [...new Set(BLOGS.flatMap(b => b.tags || []))];
  if (tags.length < 2 && !activeTag) { filterEl.remove(); return; }
  filterEl.innerHTML = [
    `<button class="${!activeTag ? 'active' : ''}" data-tag="">Tümü</button>`,
    ...tags.map(t => `<button class="${t === activeTag ? 'active' : ''}" data-tag="${t}">${t}</button>`)
  ].join('');
  filterEl.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => renderBlogList(btn.dataset.tag || null));
  });
}

// Tek yazı
function renderPost() {
  const container = document.getElementById('post-content');
  if (!container || typeof BLOGS === 'undefined') return;
  const { id } = getParams();
  const post = BLOGS.find(b => b.id === id);
  if (!post) {
    container.innerHTML = `
      <div class="not-found">
        <h1>Yazı bulunamadı</h1>
        <p>Aradığınız yazı taşınmış ya da silinmiş olabilir.</p>
        <a href="blog.html" class="back-link">&larr; Tüm yazılara dön</a>
      </div>
    `;
    return;
  }
  document.title = post.title + ' — ' + SITE.name;
  container.innerHTML = `
    <a href="blog.html" class="back-link">&larr; Bloga dön</a>
    <h1>${post.title}</h1>
    <div class="post-meta">${formatDate(post.date)} ${post.tags ? '&middot; ' + post.tags.join(', ') : ''}</div>
    ${post.body}
  `;
}

// Düşünceler listesi
function renderThoughtsList() {
  const container = document.getElementById('thoughts-list');
  if (container && typeof THOUGHTS !== 'undefined') {
    container.innerHTML = THOUGHTS.map(t => renderThoughtCard(t)).join('');
  }
}

// Biyografi
function renderBio() {
  const container = document.getElementById('bio-content');
  if (!container || typeof BIO === 'undefined') return;
  container.innerHTML = `
    <div class="bio-layout">
      <div>
        <img class="bio-photo" src="${BIO.photo}" alt="${BIO.name}"
             onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'bio-photo'}))">
      </div>
      <div class="bio-text">
        ${BIO.sections.map(s => `<h2>${s.heading}</h2><p>${s.text}</p>`).join('')}
      </div>
    </div>
  `;
}

// Galeri
function renderGallery() {
  const container = document.getElementById('gallery-grid');
  if (container && typeof GALLERY !== 'undefined') {
    container.innerHTML = GALLERY.map(p => `
      <div data-gallery-entry>
        ${renderGalleryItem(p)}
        <div class="gallery-caption">${p.caption}</div>
      </div>
    `).join('');
  }
}

// === Lightbox ===
function initLightbox() {
  if (!document.querySelector('.gallery-item')) return;

  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <button class="lightbox-close" aria-label="Kapat">&times;</button>
    <img alt="">
    <div class="lightbox-caption"></div>
  `;
  document.body.appendChild(lb);

  const img = lb.querySelector('img');
  const caption = lb.querySelector('.lightbox-caption');

  document.addEventListener('click', e => {
    const item = e.target.closest('.gallery-item');
    if (item) {
      img.src = item.dataset.src;
      img.alt = item.dataset.caption || '';
      caption.textContent = item.dataset.caption || '';
      lb.classList.add('open');
      return;
    }
    if (e.target.closest('.lightbox')) lb.classList.remove('open');
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') lb.classList.remove('open');
  });
}

// === Aktif menü linki ===
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === page);
  });
}

// === Footer yılı ===
function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

// === Başlat ===
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  setYear();
  updateThemeButton();
  renderHome();
  renderBlogList();
  renderPost();
  renderThoughtsList();
  renderBio();
  renderGallery();
  initLightbox();
});
