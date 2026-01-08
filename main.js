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
});

/* ---------- VIDEO DATA ---------- */

const films = [
  {
    id: 'eh6lKYIUQwI',
    thumb: 'img/films page/aoa-ab.jpg',
    title: 'Anatomy of Attraction',
    description: 'Director: Abhiroop Banerjee | Berlin, 2025'
  }
];

const music = [
  {
    id: 'UE4gv4_11Ps',
    thumb: 'img/music page/pl-ec.png',
    title: 'Primer Lugar',
    description: 'Artist: Eladio Carrión ft. Omar Courtz | Sevilla, 2025'
  },
  {
    id: 'eh6lKYIUQwI',
    thumb: 'img/music page/p-em.png',
    title: 'pasarella',
    description: 'Artist: Emilia Mernes | Madrid, 2025'
  },
  {
    id: 'yo9HKduc5ks',
    thumb: 'img/music page/psntvav-m.png',
    title: 'Por Si No Te Vuelvo A Ver',
    description: 'Artist: Morat | Cádiz, 2024'
  }
];

const commercials = [
  {
    id: 'eh6lKYIUQwI',
    thumb: 'img/commercials page/ct-sa.jpg',
    title: 'Changing Times',
    description: 'Spec Advert | Berlin, 2025'
  },
  {
    id: 'eh6lKYIUQwI',
    thumb: 'img/commercials page/fwm-i.png',
    title: 'Fusion Water Magic',
    description: 'Brand: ISDIN | Barcelona, 2025'
  }
];

const other = [
  {
    id: 'eh6lKYIUQwI',
    thumb: 'img/other page/mbm-i.jpg',
    title: '+ Más by Messi x TV Boy',
    description: 'Type: Instagram Reels | Barcelona, 2025'
  },
  {
    id: 'eh6lKYIUQwI',
    thumb: 'img/other page/rmp-mm.jpeg',
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
      <div class="video-thumb" data-video-id="${video.id}">
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


/* ---------- VIDEO MODAL ---------- */

document.addEventListener('click', e => {
  const thumb = e.target.closest('.video-thumb');
  if (!thumb) return;

  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('modalVideo');

  iframe.src = `https://www.youtube.com/embed/${thumb.dataset.videoId}?autoplay=1&rel=0`;
  modal.classList.add('open');
});

document.querySelector('.close').addEventListener('click', () => {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('modalVideo');
  iframe.src = '';
  modal.style.display = 'none';
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('modalVideo');
    iframe.src = '';
    modal.style.display = 'none';
  }
});

/* This is the new stuff */

    function showPage(id) {
    document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    });
    
    const next = document.getElementById(id);
    if (next) next.classList.add('active');
    }
    document.querySelectorAll('[data-target]').forEach(el => {
    el.addEventListener('click', e => {
    e.preventDefault();
    showPage(el.dataset.target);
    });
    });

    document.querySelectorAll('.video-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
    const videoId = thumb.dataset.videoId;
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('modalVideo');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    modal.style.display = 'flex';
    });
    });
    
    document.querySelector('.close').addEventListener('click', () => {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('modalVideo');
    
    iframe.src = '';
    modal.style.display = 'none';
    });

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

    document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('modalVideo');
    if (modal.style.display === 'flex') {
    iframe.src = '';
    modal.style.display = 'none';
    }
    }
    });

const form = document.querySelector('.contact-form');
const status = document.querySelector('.form-status');

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
