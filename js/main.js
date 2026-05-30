/**
 * Woody House — Main JavaScript
 * Navigation, scroll animations, testimonials slider, and form handling.
 */

(function () {
  'use strict';

  /* ---------- Navigation ---------- */
  var header = document.getElementById('header');
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.querySelectorAll('.nav__link');

  function handleScroll() {
    if (header) {
      header.classList.toggle('is-scrolled', window.scrollY > 50);
    }
  }

  function toggleNav() {
    var isOpen = nav.classList.toggle('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeNav() {
    nav.classList.remove('is-open');
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', toggleNav);
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeNav();
      navLinks.forEach(function (l) { l.classList.remove('active'); });
      link.classList.add('active');
    });
  });

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---------- Scroll Animations ---------- */
  var animatedElements = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.dataset.delay || 0;
          setTimeout(function () {
            entry.target.classList.add('is-visible');
          }, parseInt(delay, 10));
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animatedElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Active Nav on Scroll ---------- */
  var sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    var scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ---------- Testimonials Slider ---------- */
  var track = document.getElementById('testimonialTrack');
  var prevBtn = document.getElementById('testimonialPrev');
  var nextBtn = document.getElementById('testimonialNext');
  var dotsContainer = document.getElementById('testimonialDots');

  if (track && prevBtn && nextBtn && dotsContainer) {
    var slides = track.querySelectorAll('.testimonial-card');
    var currentIndex = 0;
    var autoplayInterval;

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.classList.add('testimonials__dot');
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', function () {
        goToSlide(i);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    });

    var dots = dotsContainer.querySelectorAll('.testimonials__dot');

    function goToSlide(index) {
      currentIndex = (index + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      autoplayInterval = setInterval(function () {
        goToSlide(currentIndex + 1);
      }, 6000);
    }

    prevBtn.addEventListener('click', function () {
      goToSlide(currentIndex - 1);
      resetAutoplay();
    });

    nextBtn.addEventListener('click', function () {
      goToSlide(currentIndex + 1);
      resetAutoplay();
    });

    resetAutoplay();

    track.addEventListener('mouseenter', function () {
      clearInterval(autoplayInterval);
    });

    track.addEventListener('mouseleave', resetAutoplay);
  }

  /* ---------- Form Validation Helper ---------- */
  function validateForm(form, fields) {
    var valid = true;

    fields.forEach(function (field) {
      field.classList.remove('is-error');
      if (!field.value.trim()) {
        field.classList.add('is-error');
        valid = false;
      }
    });

    var emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      emailField.classList.add('is-error');
      valid = false;
    }

    return valid;
  }

  function handleFormSubmit(form, successMessage) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var requiredFields = form.querySelectorAll('[required]');
      if (!validateForm(form, requiredFields)) return;

      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = successMessage;
      btn.disabled = true;
      form.reset();

      setTimeout(function () {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 3500);
    });
  }

  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    handleFormSubmit(contactForm, 'Message Sent!');
  }

  var bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    handleFormSubmit(bookingForm, 'Enquiry Submitted!');
  }

  /* ---------- Smooth anchor offset for fixed header ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'), 10) || 80;
        var top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
