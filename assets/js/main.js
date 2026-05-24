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
