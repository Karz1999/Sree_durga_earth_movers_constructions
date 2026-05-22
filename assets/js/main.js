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
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else if (!siteNav.classList.contains('open')) {
    header.classList.remove('scrolled');
  }
});

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  siteNav.classList.toggle('open');
  
  if (!expanded) {
    header.classList.add('scrolled');
  } else if (window.scrollY <= 50) {
    header.classList.remove('scrolled');
  }
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

// Counter animation for stats
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = +entry.target.getAttribute('data-target');
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          entry.target.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          entry.target.textContent = target + (target > 50 ? "+" : "");
        }
      };
      
      updateCounter();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
statNumbers.forEach(stat => statsObserver.observe(stat));

const revealElements = document.querySelectorAll('.hero-content, .section-heading, .service-card, .about-card, .map-card, .stat-item, .split-grid > div, .gallery-marquee');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach((el) => observer.observe(el));
