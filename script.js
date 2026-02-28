// simple scroll fade-in
const faders = document.querySelectorAll('.card, #preview p, #download .requirements, .stat, nav, header, section');
const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader => { appearOnScroll.observe(fader); });

// animated counters
const counters = document.querySelectorAll('.number');
counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / 100;
    if(count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
});

// back-to-top button
const topBtn = document.getElementById('to-top');
window.addEventListener('scroll', () => {
  if(window.scrollY > 400) {
    topBtn.classList.add('show');
  } else {
    topBtn.classList.remove('show');
  }
});
topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// mobile navigation toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', (!expanded).toString());
  document.body.classList.toggle('nav-open');
});

// close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// download counter via CounterAPI
const downloadButton = document.getElementById('download-button');
const countDisplay = document.getElementById('download-count');

// Allowed hostnames (update to your GitHub Pages domain or custom domain)
const ALLOWED_HOSTS = [
  'zstudio-lab.github.io',
  'zstudio-lab.github.io/Zerith-Studio'
];

function isAllowedOrigin() {
  try {
    if (ALLOWED_HOSTS.includes(location.hostname)) return true;
    if (document.referrer) {
      const refHost = new URL(document.referrer).hostname;
      if (ALLOWED_HOSTS.includes(refHost)) return true;
    }
  } catch (e) {
    console.error('Origin check error', e);
  }
  return false;
}

// CounterAPI configuration
const COUNTER_API_BASE = 'https://api.counterapi.dev';
const COUNTER_API_TOKEN = 'ut_TlebEqG5Q0ZHdwTssRvTRy9cV0jR6nnlrEJP9h8K';
const COUNTER_NAMESPACE = 'downloads';

// helper to build URL
function counterUrl(action) {
  // action may be 'get' or 'hit'
  return `${COUNTER_API_BASE}/${COUNTER_API_TOKEN}/${action}/${COUNTER_NAMESPACE}`;
}

// fetch current count
async function fetchDownloadCount() {
  try {
    const res = await fetch(counterUrl('get'));
    const data = await res.json();
    if (data && typeof data.value !== 'undefined' && countDisplay) {
      countDisplay.textContent = data.value;
    }
  } catch (error) {
    console.error('Error fetching counter:', error);
  }
}

// increment count
async function incrementDownloadCount() {
  try {
    const res = await fetch(counterUrl('hit'));
    const data = await res.json();
    if (data && typeof data.value !== 'undefined' && countDisplay) {
      countDisplay.textContent = data.value;
    }
  } catch (error) {
    console.error('Error incrementing counter:', error);
  }
}

// initialize
fetchDownloadCount();

if (downloadButton) {
  downloadButton.addEventListener('click', (e) => {
    if (!isAllowedOrigin()) {
      console.warn('Download increment blocked: origin not allowed');
      return;
    }
    incrementDownloadCount();
  });
}
