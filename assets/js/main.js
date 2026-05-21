const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const modalButtons = document.querySelectorAll('[data-open-modal]');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');
const modal = document.getElementById('enquiry-modal');
const form = document.getElementById('enquiry-form');
const formStatus = document.getElementById('form-status');
const lightbox = document.getElementById('image-lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');
const galleryCards = document.querySelectorAll('.gallery-card');

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  siteNav.classList.toggle('open');
});

modalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-open-modal');
    const target = document.getElementById(targetId);
    if (target) {
      openModal(target);
    }
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.closest('.modal');
    if (target) closeModal(target);
  });
});

function openModal(target) {
  target.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal(target) {
  target.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (modal && modal.getAttribute('aria-hidden') === 'false') closeModal(modal);
    if (lightbox && lightbox.getAttribute('aria-hidden') === 'false') closeLightbox();
  }
});

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  formStatus.textContent = 'Sending message...';
  const formData = new FormData(form);

  const required = [...form.querySelectorAll('[required]')];
  const valid = required.every((field) => field.value.trim() !== '');
  if (!valid) {
    formStatus.textContent = 'Please complete all required fields.';
    return;
  }

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      formStatus.textContent = 'Thanks! Your enquiry has been sent.';
      form.reset();
    } else {
      formStatus.textContent = 'Submission failed. Please try again or contact us directly.';
    }
  } catch (error) {
    formStatus.textContent = 'Network error. Please check your connection and try again.';
  }
});

galleryCards.forEach((card) => {
  card.addEventListener('click', () => {
    const src = card.getAttribute('data-image');
    const alt = card.getAttribute('data-alt');
    openLightbox(src, alt);
  });
});

function openLightbox(src, alt) {
  if (!src) return;
  lightboxImage.src = src;
  lightboxImage.alt = alt || 'Gallery image';
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lightboxImage.src = '';
}

lightboxClose?.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

const revealElements = document.querySelectorAll('.section, .hero, .service-card, .about-card, .map-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach((el) => observer.observe(el));
