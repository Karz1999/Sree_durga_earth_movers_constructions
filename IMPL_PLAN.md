## Plan: Webapp for Sree Durga Earth Movers

TL;DR - Build a light, responsive static website (HTML/CSS/JS) that showcases services, a gallery, contact channels (Instagram, WhatsApp), and an enquiry form that sends email to the preconfigured owner. Use the provided images in resource/ and resource/gallery1/. Prefer gentle, light color palette, subtle scroll animations, and an accessible UX. Recommend using Formspree or EmailJS for GitHub Pages; for Vercel optionally use a serverless email endpoint.

**Steps**
1. Project setup
   1. Initialize a static site scaffold (plain HTML/CSS/JS) or a Vite React template if preferred.
   2. Create an assets/ folder and copy images from resource/ and resource/gallery1/.
2. Design & layout
   1. Top navigation with 5 tabs: Home, About, Services, Gallery, Contact (sticky header, mobile hamburger).
   2. Hero section with logo, short tagline, call-to-action buttons (Enquiry, WhatsApp).
   3. About section with company description and visiting-card image.
   4. Services section with card list for main services (earth moving, excavation, site prep).
   5. Gallery section using a marquee-like carousel or CSS marquee + pause-on-hover; include lightbox for viewing images.
   6. Contact section with contact buttons (Instagram, WhatsApp), embedded map (from reference_urls.txt iframe), and an Enquiry button that opens a modal form.
3. Enquiry form & email
   1. For GitHub Pages: integrate Formspree or EmailJS to POST form data and send email to owner's address.
   2. For Vercel: optionally implement a serverless function using SendGrid or Nodemailer to send emails from an API route.
   3. Form fields: name, phone, email, message, service interest and hidden source field.
   4. Add client-side validation and success/error UI states.
4. UX & animations
   1. Use AOS (Animate On Scroll) or IntersectionObserver to add subtle fade/slide animations while scrolling.
   2. Use smooth scroll for anchor navigation and micro-interactions for buttons (hover, focus states).
   3. Make the gallery marquee subtle—auto-scroll on desktop, swipeable on mobile, and pause on hover/focus.
5. Image optimization & accessibility
   1. Optimize images (resize, compress) for web; generate responsive srcset where needed.
   2. Provide alt text for all images (use filenames as default; refine later).
6. Theming & palette
   1. Light palette suggestion: soft sky blue #E8F6FF (background), warm beige #FFF7EE (cards), charcoal text #333333, accent coral #FF7A59 for CTAs.
   2. Avoid heavy dark themes; ensure 4.5:1 contrast for body text.
7. Deployment
   1. For GitHub Pages: push site to a gh-pages branch or use main with docs/ folder.
   2. For Vercel: push to repo and configure a project — allows serverless email endpoint if needed.
8. Testing & verification
   1. Test responsive behavior across breakpoints (mobile, tablet, desktop).
   2. Verify enquiry form sends email and shows correct success/failure states.
   3. Check Instagram and WhatsApp links open correctly; test embedded map.
   4. Accessibility and basic Lighthouse audit (performance and best practices).
9. Optional enhancements
   1. Add testimonials carousel, service pricing cards, or downloadable brochure PDF.
   2. Add analytics (privacy-aware) and an SEO-friendly metadata setup.

Relevant files to create
- index.html — main site structure and navigation
- assets/css/styles.css — global styling and theme variables
- assets/js/main.js — interactivity (menu, modal, form submission, animations)
- assets/images/ — copy of provided images (logo1.jpeg, logo2.jpeg, Site1.jpeg, visiting card.jpeg, gallery images)
- assets/js/email-handler.js — wrapper for Formspree/EmailJS or API calls
- README.md — deployment and owner configuration (owner email, WhatsApp number, Instagram handle, preferred deployment)

Verification
1. Manual test: submit enquiry form (happy path) and confirm email received by owner.
2. Responsive test: verify layout at 360px, 768px, 1024px.
3. Lighthouse: run audits for performance, accessibility, best practices.
4. Visual review: confirm images load, marquee pauses on hover, animations smooth.

Decisions / Assumptions
- Use static hosting friendly stack by default (plain HTML/CSS/JS). If you prefer React, switch to Vite+React.
- Enquiry emails: user will provide owner's email and phone for WhatsApp link. If not provided, placeholders are used.
- Use Formspree/EmailJS for quick setup on GitHub Pages; Vercel serverless for advanced email sending.

Further Considerations / Questions
1. Please confirm the owner's email address for the preconfigured enquiry recipient.
2. Please provide the WhatsApp number (international format) and Instagram handle to link directly.
3. Which deployment do you prefer: GitHub Pages or Vercel?
4. Do you want a plain static site or a React (Vite) app?
'@

Set-Content -Path "Sree_durga_earth_movers_constructions/IMPLEMENTATION_PLAN.md" -Value $plan -Encoding UTF8
```