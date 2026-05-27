// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Form Submission Handling via FormSubmit
const form = document.getElementById('enquiry-form');
const formStatus = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    formStatus.textContent = 'Sending enquiry...';
    formStatus.style.color = '#F59E0B'; // yellow

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        formStatus.textContent = 'Enquiry sent successfully!';
        formStatus.style.color = '#10B981'; // green
        form.reset();
      } else {
        formStatus.textContent = 'Failed to send enquiry. Please try again.';
        formStatus.style.color = '#EF4444'; // red
      }
    } catch (error) {
      formStatus.textContent = 'Network error. Please try again later.';
      formStatus.style.color = '#EF4444';
    }
  });
}