/* ---------- PAGE NAVIGATION ---------- */

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(id);
  if (page) page.classList.add('active');
}

document.addEventListener('click', e => {
  const target = e.target.closest('[data-target]');
  if (!target) return;
  e.preventDefault();
  showPage(target.dataset.target);
  window.scrollTo({ top: 0, behavior: 'instant' });

});

/* ---------- VIDEO DATA ---------- */

const films = [
  {
    platform: '',  
    id: '',
    thumb: 'img/films-page/mus-ad.png',
    title: 'Minds Under Storm',
    description: 'Director: Andrés Daniel | Berlin, 2026'
  },
  {
    platform: '',  
    id: '',
    thumb: 'img/films-page/aoa-ab.jpg',
    title: 'Anatomy of Attraction',
    description: 'Director: Abhiroop Banerjee | Berlin, 2025'
  }
];

const music = [
  {
    platform: 'youtube',
    id: 'UE4gv4_11Ps',
    thumb: 'img/music-page/pl-ec.png',
    title: 'Primer Lugar',
    description: 'Artist: Eladio Carrión ft. Omar Courtz | Sevilla, 2025'
  },
  {
    platform: 'youtube',  
    id: 'eh6lKYIUQwI',  
    thumb: 'img/music-page/p-em.png',
    title: 'pasarella',
    description: 'Artist: Emilia Mernes | Madrid, 2025'
  },
  {
    platform: 'youtube',  
    id: 'yo9HKduc5ks',  
    thumb: 'img/music-page/psntvav-m.png',
    title: 'Por Si No Te Vuelvo A Ver',
    description: 'Artist: Morat | Cádiz, 2024'
  }
];

const commercials = [
  {
    platform: '',
    id: '',
    thumb: 'img/commercials-page/ct-sa.jpg',
    title: 'Changing Times',
    description: 'Type: Spec Advert | Berlin, 2025'
  },
  {
    platform: '',  
    id: '',
    thumb: 'img/commercials-page/mxa-n.png',
    title: 'MICRA x Aitana',
    description: 'Brand: NISSAN | Barcelona, 2025'
  },
  {
    platform: 'youtube',
    id: 'FNm4HgRbuW4',
    thumb: 'img/commercials-page/fwm-i.png',
    title: 'Fusion Water Magic',
    description: 'Brand: ISDIN | Barcelona, 2025'
  }
];

const other = [
  {
    platform: 'instagram',
    id: 'DQCoE1cgrJ4',
    thumb: 'img/other-page/mbm-i.jpg',
    title: '+ Más by Messi x TV Boy',
    description: 'Type: Instagram Reels | Barcelona, 2025'
  },
  {
    platform: '',
    id: '',
    thumb: 'img/other-page/rmp-mm.jpeg',
    title: 'Real Madrid Players',
    description: 'Type: Stadium Media | Madrid, 2024'
  }
];

/* ---------- GRID BUILDER ---------- */

function populateGrid(gridId, videos) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  videos.forEach(() => {
    const skel = document.createElement('div');
    skel.className = 'skeleton';
    grid.appendChild(skel);
  });

  videos.forEach((video, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="video-thumb" data-platform="${video.platform}" data-video-id="${video.id}">
        <img src="${video.thumb}" alt="${video.title}">
        <div class="video-info">
          <div class="video-title">${video.title}</div>
          <div class="video-description">${video.description}</div>
        </div>
      </div>
    `;

    const img = card.querySelector('img');
    img.onload = () => {
      grid.children[index].replaceWith(card);
    };
  });
}

populateGrid('filmGrid', films);
populateGrid('musicGrid', music);
populateGrid('commercialGrid', commercials);
populateGrid('otherGrid', other);


/* ---------- VIDEO MODAL WITH MULTI-PLATFORM SUPPORT ---------- */

function getEmbedUrl(platform, videoId) {
  switch(platform) {
    case 'youtube':
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    
    case 'vimeo':
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    
    case 'instagram':
      return `https://www.instagram.com/reel/${videoId}/embed`;
    
    default:
      return '';
  }
}

document.addEventListener('click', e => {
  const thumb = e.target.closest('.video-thumb');
  if (!thumb) return;

  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('modalVideo');
  
  const platform = thumb.dataset.platform;
  const videoId = thumb.dataset.videoId;
  
  iframe.src = getEmbedUrl(platform, videoId);
  modal.classList.add('open');
  modal.style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', () => {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('modalVideo');
  iframe.src = '';
  modal.style.display = 'none';
  modal.classList.remove('open');
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('modalVideo');
    iframe.src = '';
    modal.style.display = 'none';
    modal.classList.remove('open');
  }
});

/* ---------- CARD ANIMATIONS ---------- */

const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));

/* ---------- CONTACT FORM ---------- */

const form = document.querySelector('.contact-form');
const status = document.querySelector('.form-status');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        status.textContent = 'Message sent successfully.';
        status.className = 'form-status success';
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      status.textContent = 'Something went wrong. Please try again.';
      status.className = 'form-status error';
    }
  });
}
