const nav = document.querySelector('.nav');
const menuToggle = document.querySelector('.menu-toggle');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('mobile-open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? '×' : '☰';
  });
}

document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => nav?.classList.remove('mobile-open')));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}

const filterButtons = document.querySelectorAll('[data-filter]');
const workCards = document.querySelectorAll('[data-category]');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');
    const filter = button.dataset.filter;
    workCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.display = show ? '' : 'none';
    });
  });
});

const form = document.querySelector('#contactForm');
const status = document.querySelector('.form-status');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = `Project inquiry — ${data.get('service')}`;
    const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}\n\n${data.get('message')}`;
    if (status) status.textContent = 'Thanks — your email draft is ready to send.';
    window.location.href = `mailto:hello@alexmorgan.studio?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
