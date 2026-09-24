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
const copyButton = document.querySelector('#copyBrief');
const submitButton = form?.querySelector('button[type="submit"]');
const contactState = { name: '', email: '', message: '' };
const touched = { name: false, email: false, message: false };
const errors = { name: '', email: '', message: '' };

const validateField = (field, value) => {
  const trimmed = value.trim();
  if (!trimmed) return field === 'message' ? 'Tell me a little more about the project.' : `${field === 'name' ? 'Name' : 'Email'} is required.`;
  if (field === 'name' && trimmed.length < 2) return 'Please enter at least 2 characters.';
  if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Please enter a valid email address.';
  if (field === 'message' && trimmed.length < 12) return 'Add a little more detail so I can understand the brief.';
  return '';
};

const renderField = (field) => {
  const input = form?.querySelector(`[name="${field}"]`);
  const label = input?.closest('label');
  const error = label?.querySelector('.contact-form__error');
  const message = touched[field] ? errors[field] : '';
  label?.classList.toggle('has-error', Boolean(message));
  input?.setAttribute('aria-invalid', String(Boolean(message)));
  if (error) error.textContent = message;
};

const updateField = (field, value) => {
  contactState[field] = value;
  if (touched[field]) {
    errors[field] = validateField(field, value);
    renderField(field);
  }
};

form?.querySelectorAll('input, textarea').forEach((input) => {
  input.addEventListener('input', () => updateField(input.name, input.value));
  input.addEventListener('blur', () => {
    touched[input.name] = true;
    errors[input.name] = validateField(input.name, input.value);
    renderField(input.name);
  });
});

const setSubmitting = (submitting) => {
  if (!submitButton) return;
  submitButton.disabled = submitting;
  submitButton.classList.toggle('is-submitting', submitting);
  submitButton.querySelector('.submit-icon').innerHTML = submitting ? '<span class="contact-form__spinner" aria-hidden="true"></span>' : '↗';
  submitButton.querySelector('.submit-label').textContent = submitting ? 'Sending brief...' : 'Send project brief';
  form?.classList.toggle('is-submitting', submitting);
};

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  ['name', 'email', 'message'].forEach((field) => {
    touched[field] = true;
    errors[field] = validateField(field, form.elements[field].value);
    renderField(field);
  });
  if (Object.values(errors).some(Boolean)) return;
  setSubmitting(true);
  await new Promise((resolve) => window.setTimeout(resolve, 900));
  setSubmitting(false);
  form.innerHTML = `<div class="contact-success"><div class="contact-success__mark">✓</div><h3>Brief received.</h3><p>Thanks, ${contactState.name || 'there'}. Your project details are captured in this session. Connect the form to your inbox or CRM when you’re ready to receive real submissions.</p><button class="copy-brief" id="copySubmittedBrief" type="button"><span>□</span> Copy submitted brief</button><button class="contact-reset" id="sendAnotherBrief" type="button">Send another brief</button></div>`;
  document.querySelector('#copySubmittedBrief')?.addEventListener('click', async () => {
    const brief = `Name: ${contactState.name || 'Not provided'}\nEmail: ${contactState.email || 'Not provided'}\n\nProject details:\n${contactState.message || 'Not provided'}`;
    try { await navigator.clipboard.writeText(brief); } catch (_) {}
    const button = document.querySelector('#copySubmittedBrief');
    if (button) button.textContent = '✓ Brief copied';
  });
  document.querySelector('#sendAnotherBrief')?.addEventListener('click', () => window.location.reload());
});

copyButton?.addEventListener('click', async () => {
  const brief = `Name: ${contactState.name || 'Not provided'}\nEmail: ${contactState.email || 'Not provided'}\n\nProject details:\n${contactState.message || 'Not provided'}`;
  try {
    await navigator.clipboard.writeText(brief);
    copyButton.querySelector('.copy-label').textContent = 'Copied';
    window.setTimeout(() => { copyButton.querySelector('.copy-label').textContent = 'Copy instead'; }, 2400);
  } catch (_) {
    if (status) status.textContent = 'Copy was unavailable. You can submit the brief instead.';
  }
});

const contactOptions = document.querySelectorAll('.contact-option');
contactOptions.forEach(option => option.addEventListener('click', () => {
  document.querySelector('#contactForm')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  window.setTimeout(() => document.querySelector('#contactForm input[name="name"]')?.focus(), 450);
}));
