/**
 * Aurora Studio — Main JavaScript
 * Handles navigation, scroll animations, counters, filters, and testimonials.
 */

(function () {
  'use strict';

  /* ---------- Navigation ---------- */
  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelectorAll('.nav__link');

  function handleScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 50);
  }

  function toggleNav() {
    const isOpen = nav.classList.toggle('is-open');
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

  navToggle.addEventListener('click', toggleNav);

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
  const animatedElements = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
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
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animatedElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Counter Animation ---------- */
  function animateCounter(el) {
    var target = parseInt(el.dataset.count, 10);
    var duration = 2000;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) {
      counterObserver.observe(counter);
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

  /* ---------- Portfolio Filter ---------- */
  var filters = document.querySelectorAll('.work__filter');
  var workCards = document.querySelectorAll('.work-card');

  filters.forEach(function (filter) {
    filter.addEventListener('click', function () {
      var category = filter.dataset.filter;

      filters.forEach(function (f) { f.classList.remove('active'); });
      filter.classList.add('active');

      workCards.forEach(function (card) {
        if (category === 'all' || card.dataset.category === category) {
          card.classList.remove('is-hidden');
          card.style.animation = 'none';
          card.offsetHeight;
          card.style.animation = '';
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  /* ---------- Testimonials Slider ---------- */
  var track = document.getElementById('testimonialTrack');
  var prevBtn = document.getElementById('testimonialPrev');
  var nextBtn = document.getElementById('testimonialNext');
  var dotsContainer = document.getElementById('testimonialDots');

  if (track && prevBtn && nextBtn) {
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

  /* ---------- Contact Form ---------- */
  var contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = contactForm.querySelector('#name');
      var email = contactForm.querySelector('#email');
      var message = contactForm.querySelector('#message');
      var valid = true;

      [name, email, message].forEach(function (field) {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#e74c3c';
          valid = false;
        }
      });

      if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.style.borderColor = '#e74c3c';
        valid = false;
      }

      if (valid) {
        var btn = contactForm.querySelector('button[type="submit"]');
        var originalText = btn.textContent;
        btn.textContent = 'Message Sent!';
        btn.disabled = true;
        contactForm.reset();

        setTimeout(function () {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 3000);
      }
    });
  }

})();
