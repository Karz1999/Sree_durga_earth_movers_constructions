// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
});

// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  
  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// Sticky Navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Hero Carousel Rotation
const heroSlides = document.querySelectorAll('.hero-slide');
let activeHeroIndex = 0;

function setHeroSlide(index) {
  heroSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === index);
  });
}

function nextHeroSlide() {
  activeHeroIndex = (activeHeroIndex + 1) % heroSlides.length;
  setHeroSlide(activeHeroIndex);
}

if (heroSlides.length) {
  setHeroSlide(activeHeroIndex);
  setInterval(nextHeroSlide, 6000);
}

// Form Submission Handling - Send via WhatsApp
const form = document.getElementById('enquiry-form');
const formStatus = document.getElementById('form-status');
const phoneInput = document.getElementById('form-phone');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('form-name').value;
    const phone = document.getElementById('form-phone').value;
    const email = document.getElementById('form-email').value;
    const service = document.getElementById('form-service').value;
    const message = document.getElementById('form-message').value;
    
    // Validate form
    if (!name || !phone || !email || !service || !message) {
      formStatus.textContent = 'Please fill in all fields.';
      formStatus.style.color = '#EF4444'; // red
      return;
    }
    
    // Validate phone number format (10 digits, starting with 6, 7, 8, or 9)
    const phoneRegex = /^[6-9][0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      formStatus.textContent = 'Phone number must be 10 digits and start with 6, 7, 8, or 9.';
      formStatus.style.color = '#EF4444'; // red
      phoneInput.focus();
      return;
    }
    
    // Format WhatsApp message
    const whatsappMessage = `Hello Sri Durga Earth Movers,

I would like to request a quote for the following:

Name: ${name}
Phone: ${phone}
Email: ${email}
Service: ${service}
Details: ${message}

Please get back to me with availability and pricing.

Thank you!`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Company WhatsApp number (Chirag S)
    const whatsappNumber = '919481152277';
    
    // WhatsApp Web URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    formStatus.textContent = 'Opening WhatsApp...';
    formStatus.style.color = '#F59E0B'; // yellow
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    // Reset form after opening WhatsApp
    setTimeout(() => {
      form.reset();
      formStatus.textContent = 'Message sent via WhatsApp!';
      formStatus.style.color = '#10B981'; // green
      
      // Clear status message after 3 seconds
      setTimeout(() => {
        formStatus.textContent = '';
      }, 3000);
    }, 500);
  });
}

// Prevent zoom on double-tap for better mobile UX
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');
const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, revealOptions);
revealElements.forEach(el => {
  revealObserver.observe(el);
});

// Animated Counters
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = +entry.target.getAttribute('data-target');
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          entry.target.innerText = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          entry.target.innerText = target;
        }
      };
      updateCounter();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(counter => {
  counterObserver.observe(counter);
});

// Scroll To Top
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
