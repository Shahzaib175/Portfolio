/* ============================================================
   SHAHZAIB MEHMOOD – Portfolio JavaScript
   Features:
   1. Navbar scroll effect + active section highlight
   2. Mobile hamburger menu
   3. Scroll reveal (IntersectionObserver)
   4. Back-to-top button
   5. Contact form with mailto fallback
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. NAVBAR — add .scrolled class on scroll + highlight active section
     ============================================================ */
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  const backTop  = document.getElementById('backToTop');

  function onScroll() {
    // Navbar background on scroll
    navbar.classList.toggle('scrolled', window.scrollY > 30);

    // Back-to-top button visibility
    backTop.classList.toggle('visible', window.scrollY > 400);

    // Active nav link based on current section
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 90) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ============================================================
     2. MOBILE HAMBURGER MENU
     ============================================================ */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Close menu when a nav link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  /* ============================================================
     3. SCROLL REVEAL — fade-in cards and items as they enter view
     ============================================================ */
  const revealElements = document.querySelectorAll(
    '.skill-group, .project-card, .cert-item, .stat-item, ' +
    '.timeline-item, .edu-card, .contact-row, .contact-form'
  );

  // Add the base class
  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => observer.observe(el));

  /* ============================================================
     4. BACK TO TOP
     ============================================================ */
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

}); // end DOMContentLoaded


/* ============================================================
   5. CONTACT FORM
   Uses mailto: as a fallback — no backend needed.
   To connect a real backend, see the Formspree option below.
   ============================================================ */
function handleFormSubmit(event) {
  event.preventDefault();

  const form    = document.getElementById('contact-form');
  const note    = document.getElementById('form-note');
  const btn     = form.querySelector('button[type="submit"]');

  const name    = form['f-name'].value.trim();
  const email   = form['f-email'].value.trim();
  const subject = form['f-subject'].value.trim() || 'Portfolio Enquiry';
  const message = form['f-message'].value.trim();

  if (!name || !email || !message) {
    note.style.color = '#f87171';
    note.textContent = 'Please fill in all required fields.';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Sending…';

  /* --- Option A: mailto fallback (no backend required) --- */
  const body = `Hi Shahzaib,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
  const mailto = `mailto:shahzaib0mehmood@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

  setTimeout(() => {
    window.location.href = mailto;
    note.style.color = '#60a5fa';
    note.textContent = 'Your email client should have opened. Thank you!';
    btn.disabled = false;
    btn.textContent = 'Send Message';
    form.reset();
  }, 500);

  /* --- Option B: Formspree (uncomment and replace ID) ---
  fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body:    JSON.stringify({ name, email, subject, message })
  })
  .then(res => res.json())
  .then(data => {
    if (data.ok) {
      note.style.color = '#60a5fa';
      note.textContent = 'Message sent successfully. I will be in touch shortly.';
      form.reset();
    } else {
      throw new Error('submission failed');
    }
  })
  .catch(() => {
    note.style.color = '#f87171';
    note.textContent = 'Something went wrong. Please email me directly.';
  })
  .finally(() => {
    btn.disabled = false;
    btn.textContent = 'Send Message';
  });
  --- end Option B --- */
}
