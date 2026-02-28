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

// download button click counter
const downloadButton = document.getElementById('download-button');
const countDisplay = document.getElementById('download-count');

function getDownloadCount() {
  return parseInt(localStorage.getItem('downloadCount') || '0', 10);
}

function setDownloadCount(n) {
  localStorage.setItem('downloadCount', n);
  if (countDisplay) countDisplay.textContent = n;
}

// initialise display on load
setDownloadCount(getDownloadCount());

if (downloadButton) {
  downloadButton.addEventListener('click', () => {
    const current = getDownloadCount() + 1;
    setDownloadCount(current);
  });
}
