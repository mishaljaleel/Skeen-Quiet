/**
 * Quiet Corners of Australia — Main JavaScript
 * Navigation, scroll animations, testimonials slider, and form handling.
 */

(function () {
  'use strict';

  /* ---------- Navigation ---------- */
  var header = document.getElementById('header');
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navBackdrop = document.getElementById('navBackdrop');
  var navLinks = document.querySelectorAll('.nav__link');
  var MOBILE_NAV_BREAKPOINT = 1100;
  var scrollPosition = 0;

  var headerInner = header ? header.querySelector('.header__inner') : null;

  function syncHeaderHeight() {
    if (!headerInner || isMobileNav()) return;
    if (nav && nav.classList.contains('is-open')) return;

    var height = Math.round(headerInner.getBoundingClientRect().height);
    height = Math.min(Math.max(height, 64), 100);

    document.documentElement.style.setProperty('--header-height', height + 'px');
  }

  function scheduleHeaderHeightSync() {
    syncHeaderHeight();
    window.requestAnimationFrame(syncHeaderHeight);
  }

  function isMobileNav() {
    return window.innerWidth <= MOBILE_NAV_BREAKPOINT;
  }

  function handleScroll() {
    if (header) {
    header.classList.toggle('is-scrolled', window.scrollY > 50);
    }
  }

  function lockBodyScroll() {
    scrollPosition = window.scrollY || window.pageYOffset;
    document.documentElement.classList.add('nav-open');
    document.body.classList.add('nav-open');
    document.body.style.top = '-' + scrollPosition + 'px';
    document.body.style.position = 'fixed';
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
  }

  function unlockBodyScroll() {
    if (!document.body.classList.contains('nav-open')) return;
    document.documentElement.classList.remove('nav-open');
    document.body.classList.remove('nav-open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, scrollPosition);
  }

  function setNavOpen(isOpen) {
    if (!nav || !navToggle) return;

    nav.classList.toggle('is-open', isOpen);
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Toggle navigation menu');

    if (header) {
      header.classList.toggle('is-nav-open', isOpen);
    }

    if (navBackdrop) {
      navBackdrop.classList.toggle('is-visible', isOpen);
      navBackdrop.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    }

    if (isOpen && isMobileNav()) {
      lockBodyScroll();
    } else {
      unlockBodyScroll();
      scheduleHeaderHeightSync();
    }
  }

  function toggleNav() {
    if (!nav) return;
    setNavOpen(!nav.classList.contains('is-open'));
  }

  function closeNav() {
    setNavOpen(false);
  }

  if (navToggle) {
    navToggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleNav();
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeNav);
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (isMobileNav()) {
      closeNav();
      }
      navLinks.forEach(function (l) { l.classList.remove('active'); });
      link.classList.add('active');
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav && nav.classList.contains('is-open')) {
      closeNav();
    }
  });

  window.addEventListener('resize', function () {
    scheduleHeaderHeightSync();
    if (!isMobileNav()) {
      closeNav();
    }
  });

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('load', scheduleHeaderHeightSync);

  if (headerInner && typeof ResizeObserver !== 'undefined') {
    var headerResizeObserver = new ResizeObserver(scheduleHeaderHeightSync);
    headerResizeObserver.observe(headerInner);
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleHeaderHeightSync).catch(function () {});
  }

  scheduleHeaderHeightSync();
  handleScroll();

  /* ---------- Scroll Animations ---------- */
  var animatedElements = document.querySelectorAll('[data-animate]');
  var animationObserver = null;

  function revealAboveFoldAnimations() {
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    animatedElements.forEach(function (el) {
      if (el.classList.contains('is-visible')) return;
      if (el.getBoundingClientRect().top < viewportHeight * 0.92) {
        el.classList.add('is-visible');
        if (animationObserver) {
          animationObserver.unobserve(el);
        }
      }
    });
  }

  if ('IntersectionObserver' in window) {
    animationObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.dataset.delay || 0;
          setTimeout(function () {
            entry.target.classList.add('is-visible');
          }, parseInt(delay, 10));
          animationObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(function (el) {
      if (!el.classList.contains('is-visible')) {
        animationObserver.observe(el);
      }
    });

    revealAboveFoldAnimations();
    window.addEventListener('load', revealAboveFoldAnimations);
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
  var bookingWhatsAppBtn = document.getElementById('bookingWhatsAppBtn');
  var bookingMessengerBtn = document.getElementById('bookingMessengerBtn');

  function resetBookingButton(btn, originalText) {
    var label = btn.querySelector('.booking__btn-label');
    setTimeout(function () {
      if (label) {
        label.textContent = originalText;
      } else {
        btn.textContent = originalText;
      }
      btn.disabled = false;
    }, 3500);
  }

  function setBookingButtonLabel(btn, text) {
    var label = btn.querySelector('.booking__btn-label');
    if (label) {
      label.textContent = text;
    } else {
      btn.textContent = text;
    }
  }

  function handleBookingChannel(form, channel, btn) {
    var message = buildBookingMessage(form);
    var label = btn.querySelector('.booking__btn-label');
    var originalText = label ? label.textContent : btn.textContent;
    btn.disabled = true;

    if (channel === 'whatsapp') {
      var whatsappNumber = (form.dataset.whatsapp || '61434629664').replace(/\D/g, '');
      var whatsappUrl = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(message);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setBookingButtonLabel(btn, 'Opening WhatsApp…');
      form.reset();
      resetBookingButton(btn, originalText);
      return;
    }

    var messengerId = (form.dataset.messenger || '61590515375020').trim().replace(/^@/, '');
    if (!messengerId) {
      btn.disabled = false;
      window.alert('Messenger is not configured yet. Please contact us via WhatsApp or email.');
      return;
    }

    var messengerUrl = 'https://m.me/' + messengerId;
    window.open(messengerUrl, '_blank', 'noopener,noreferrer');
    setBookingButtonLabel(btn, 'Opening Messenger…');
    form.reset();
    resetBookingButton(btn, originalText);
  }

  if (bookingForm && bookingWhatsAppBtn) {
    bookingWhatsAppBtn.addEventListener('click', function () {
      handleBookingChannel(bookingForm, 'whatsapp', bookingWhatsAppBtn);
    });
  }

  if (bookingForm && bookingMessengerBtn) {
    bookingMessengerBtn.addEventListener('click', function () {
      handleBookingChannel(bookingForm, 'messenger', bookingMessengerBtn);
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
    });
  }

  function getSelectedOptionText(select) {
    if (!select || select.selectedIndex < 0) return '';
    return select.options[select.selectedIndex].text.trim();
  }

  function formatDateAU(dateValue) {
    if (!dateValue) return '';
    var parts = dateValue.split('-');
    if (parts.length !== 3) return dateValue;
    return parts[2] + '-' + parts[1] + '-' + parts[0];
  }

  function buildBookingMessage(form) {
    var name = form.querySelector('[name="name"]').value.trim();
    var email = form.querySelector('[name="email"]').value.trim();
    var phone = form.querySelector('[name="phone"]').value.trim();
    var room = getSelectedOptionText(form.querySelector('[name="room"]'));
    var checkin = formatDateAU(form.querySelector('[name="checkin"]').value);
    var duration = getSelectedOptionText(form.querySelector('[name="duration"]'));
    var notes = form.querySelector('[name="notes"]').value.trim();

    var lines = [
      'Hello, I would like to submit a booking enquiry for Quiet Corners of Australia.',
      '',
      '*Full Name:* ' + name,
      '*Email:* ' + email,
      '*Phone:* ' + phone,
      '*Room Type:* ' + room,
      '*Preferred Check-in:* ' + checkin,
      '*Stay Duration:* ' + duration
    ];

    if (notes) {
      lines.push('*Additional Notes:* ' + notes);
    }

    lines.push('', 'Thank you.');

    return lines.join('\n');
  }

  /* ---------- Gallery (categories + lightbox) ---------- */
  var galleryCategoriesGrid = document.getElementById('galleryCategoriesGrid');
  var galleryCategoriesPanel = document.getElementById('galleryCategories');
  var galleryAlbum = document.getElementById('galleryAlbum');
  var galleryAlbumGrid = document.getElementById('galleryAlbumGrid');
  var galleryAlbumTitle = document.getElementById('galleryAlbumTitle');
  var galleryAlbumCount = document.getElementById('galleryAlbumCount');
  var galleryAlbumBack = document.getElementById('galleryAlbumBack');
  var galleryLightbox = document.getElementById('galleryLightbox');
  var galleryLightboxImg = document.getElementById('galleryLightboxImg');
  var galleryLightboxCaption = document.getElementById('galleryLightboxCaption');
  var galleryLightboxCategory = document.getElementById('galleryLightboxCategory');
  var galleryLightboxCounter = document.getElementById('galleryLightboxCounter');
  var galleryLightboxStage = document.getElementById('galleryLightboxStage');
  var galleryLightboxClose = document.getElementById('galleryLightboxClose');
  var galleryLightboxPrev = document.getElementById('galleryLightboxPrev');
  var galleryLightboxNext = document.getElementById('galleryLightboxNext');
  var galleryLightboxZoomIn = document.getElementById('galleryLightboxZoomIn');
  var galleryLightboxZoomOut = document.getElementById('galleryLightboxZoomOut');

  var galleryData = [
    {
      id: 'bedrooms',
      title: 'Bedrooms',
      cover: 'assets/images/qca-frontview.jpeg',
      photos: [
        {
          src: 'assets/images/qca-frontview.jpeg',
          alt: 'Comfortable furnished bedroom at Quiet Corners of Australia',
          caption: 'Furnished bedroom'
        },
        {
          src: 'assets/images/primary.jpeg',
          alt: 'Front view of Quiet Corners accommodation',
          caption: 'Property front view'
        },
        {
          src: 'assets/images/primary.jpg',
          alt: 'Quiet room with natural light',
          caption: 'Bright private room'
        }
      ]
    },
    {
      id: 'kitchen',
      title: 'Shared Kitchen',
      cover: 'assets/images/qca-frontview.jpeg',
      photos: [
        {
          src: 'assets/images/qca-frontview.jpeg',
          alt: 'Shared kitchen and dining area',
          caption: 'Shared kitchen area'
        },
        {
          src: 'assets/images/qca-lakesidebench.jpeg',
          alt: 'Dining and meal prep space',
          caption: 'Dining space'
        }
      ]
    },
    {
      id: 'lounge',
      title: 'Lounge',
      cover: 'assets/images/qca-lakesidebench.jpeg',
      photos: [
        {
          src: 'assets/images/qca-lakesidebench.jpeg',
          alt: 'Comfortable shared lounge area',
          caption: 'Shared lounge'
        },
        {
          src: 'assets/images/qca-walkarea.jpeg',
          alt: 'Relaxed seating area outdoors',
          caption: 'Outdoor lounge seating'
        }
      ]
    },
    {
      id: 'creekside',
      title: 'Creekside Area',
      cover: 'assets/images/primary.jpg',
      photos: [
        {
          src: 'assets/images/primary.jpg',
          alt: 'Peaceful creekside outdoor area at Quiet Corners of Australia',
          caption: 'Creekside outlook'
        },
        {
          src: 'assets/images/qca-walkarea.jpeg',
          alt: 'Walking path beside the creek',
          caption: 'Creekside walk'
        },
        {
          src: 'assets/images/qca-kayakin.jpeg',
          alt: 'Kayaking on the creek',
          caption: 'Kayaking on the creek'
        }
      ]
    },
    {
      id: 'pine-grove',
      title: 'Pine Grove',
      cover: 'assets/images/qca-pinetrees.jpeg',
      photos: [
        {
          src: 'assets/images/qca-pinetrees.jpeg',
          alt: 'Pine grove with garden swing',
          caption: 'Pine grove & swing'
        },
        {
          src: 'assets/images/qca-openwalk.jpeg',
          alt: 'Walk through the pine grove',
          caption: 'Pine grove walk'
        }
      ]
    },
    {
      id: 'bbq',
      title: 'BBQ Setup',
      cover: 'assets/images/qca-openwalk.jpeg',
      photos: [
        {
          src: 'assets/images/qca-openwalk.jpeg',
          alt: 'Outdoor BBQ setup',
          caption: 'BBQ area'
        },
        {
          src: 'assets/images/qca-walkarea.jpeg',
          alt: 'Outdoor cooking and dining space',
          caption: 'Outdoor dining'
        }
      ]
    },
    {
      id: 'outdoor-seating',
      title: 'Outdoor Seating',
      cover: 'assets/images/qca-lakesidebench.jpeg',
      photos: [
        {
          src: 'assets/images/qca-lakesidebench.jpeg',
          alt: 'Lakeside bench seating',
          caption: 'Lakeside bench'
        },
        {
          src: 'assets/images/qca-walkarea.jpeg',
          alt: 'Outdoor seating area',
          caption: 'Garden seating'
        }
      ]
    },
    {
      id: 'nature',
      title: 'Nature Surroundings',
      cover: 'assets/images/qca-kayakin.jpeg',
      photos: [
        {
          src: 'assets/images/qca-kayakin.jpeg',
          alt: 'Natural creek and bush surroundings',
          caption: 'Creek & bushland'
        },
        {
          src: 'assets/images/qca-pinetrees.jpeg',
          alt: 'Tall pine trees on the property',
          caption: 'Pine tree canopy'
        },
        {
          src: 'assets/images/qca-openwalk.jpeg',
          alt: 'Natural Australian bush surroundings',
          caption: 'Bush walking trails'
        }
      ]
    }
  ];

  if (galleryCategoriesGrid && galleryLightbox && galleryLightboxImg && galleryLightboxStage) {
    var activeCategory = null;
    var activePhotos = [];
    var galleryIndex = 0;
    var galleryZoom = 1;
    var galleryPanX = 0;
    var galleryPanY = 0;
    var galleryLightboxScrollY = 0;
    var isDragging = false;
    var dragStartX = 0;
    var dragStartY = 0;
    var panStartX = 0;
    var panStartY = 0;
    var MIN_ZOOM = 1;
    var MAX_ZOOM = 3;
    var ZOOM_STEP = 0.25;

    function photoLabel(count) {
      return count === 1 ? '1 photo' : count + ' photos';
    }

    function renderCategoryCards() {
      galleryCategoriesGrid.innerHTML = galleryData.map(function (category) {
        var count = category.photos.length;
        return (
          '<button type="button" class="gallery__category" data-category-id="' + category.id + '" aria-label="View ' + category.title + ' — ' + photoLabel(count) + '">' +
            '<span class="gallery__category-media">' +
              '<img src="' + category.cover + '" alt="" width="600" height="450" loading="lazy">' +
            '</span>' +
            '<span class="gallery__category-body">' +
              '<span class="gallery__category-title">' + category.title + '</span>' +
              '<span class="gallery__category-count">' + photoLabel(count) + '</span>' +
            '</span>' +
          '</button>'
        );
      }).join('');

      galleryCategoriesGrid.querySelectorAll('.gallery__category').forEach(function (button) {
        button.addEventListener('click', function () {
          openCategoryAlbum(button.getAttribute('data-category-id'));
        });
      });
    }

    function renderAlbumPhotos(category) {
      galleryAlbumGrid.innerHTML = category.photos.map(function (photo, index) {
        return (
          '<figure class="gallery__item" data-photo-index="' + index + '" tabindex="0" role="button" aria-label="View ' + photo.caption + '">' +
            '<img src="' + photo.src + '" alt="' + photo.alt + '" width="600" height="450" loading="lazy">' +
            '<figcaption class="gallery__caption">' + photo.caption + '</figcaption>' +
          '</figure>'
        );
      }).join('');

      galleryAlbumGrid.querySelectorAll('.gallery__item').forEach(function (item) {
        var index = parseInt(item.getAttribute('data-photo-index'), 10);

        item.addEventListener('click', function () {
          openGallery(index);
        });

        item.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openGallery(index);
          }
        });
      });
    }

    function openCategoryAlbum(categoryId) {
      var category = galleryData.find(function (entry) {
        return entry.id === categoryId;
      });

      if (!category) return;

      activeCategory = category;
      activePhotos = category.photos.slice();
      galleryAlbumTitle.textContent = category.title;
      galleryAlbumCount.textContent = photoLabel(category.photos.length);
      renderAlbumPhotos(category);

      galleryCategoriesPanel.hidden = true;
      galleryAlbum.hidden = false;
      galleryAlbumBack.focus();

      var headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'), 10) || 80;
      var top = galleryAlbum.getBoundingClientRect().top + window.scrollY - headerOffset - 12;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }

    function closeCategoryAlbum() {
      galleryAlbum.hidden = true;
      galleryCategoriesPanel.hidden = false;
      galleryAlbumGrid.innerHTML = '';
      activeCategory = null;
      activePhotos = [];
    }

    if (galleryAlbumBack) {
      galleryAlbumBack.addEventListener('click', closeCategoryAlbum);
    }

    function applyGalleryTransform() {
      galleryLightboxImg.style.setProperty('--zoom', galleryZoom);
      galleryLightboxImg.style.setProperty('--pan-x', galleryPanX + 'px');
      galleryLightboxImg.style.setProperty('--pan-y', galleryPanY + 'px');
    }

    function resetGalleryView() {
      galleryZoom = 1;
      galleryPanX = 0;
      galleryPanY = 0;
      applyGalleryTransform();
    }

    function updateLightboxMeta() {
      var photo = activePhotos[galleryIndex];
      if (!photo || !activeCategory) return;

      galleryLightboxCategory.textContent = activeCategory.title;
      galleryLightboxCaption.textContent = photo.caption;
      galleryLightboxCounter.textContent = 'Photo ' + (galleryIndex + 1) + ' of ' + activePhotos.length;
    }

    function showGalleryImage(index) {
      if (!activePhotos.length) return;

      galleryIndex = (index + activePhotos.length) % activePhotos.length;
      var photo = activePhotos[galleryIndex];

      galleryLightboxImg.src = photo.src;
      galleryLightboxImg.alt = photo.alt || '';
      updateLightboxMeta();
      resetGalleryView();
    }

    function openGallery(index) {
      if (!activePhotos.length) return;

      showGalleryImage(index);
      galleryLightboxScrollY = window.scrollY;
      galleryLightbox.hidden = false;
      galleryLightbox.setAttribute('aria-hidden', 'false');
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + galleryLightboxScrollY + 'px';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      galleryLightboxClose.focus();
    }

    function closeGallery() {
      galleryLightbox.hidden = true;
      galleryLightbox.setAttribute('aria-hidden', 'true');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, galleryLightboxScrollY);
      resetGalleryView();
      galleryLightboxImg.removeAttribute('src');
    }

    function setGalleryZoom(nextZoom) {
      galleryZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextZoom));
      if (galleryZoom === 1) {
        galleryPanX = 0;
        galleryPanY = 0;
      }
      applyGalleryTransform();
    }

    renderCategoryCards();

    if (galleryLightboxClose) {
      galleryLightboxClose.addEventListener('click', closeGallery);
    }

    galleryLightbox.querySelectorAll('[data-lightbox-close]').forEach(function (el) {
      el.addEventListener('click', closeGallery);
    });

    if (galleryLightboxPrev) {
      galleryLightboxPrev.addEventListener('click', function (e) {
        e.stopPropagation();
        showGalleryImage(galleryIndex - 1);
      });
    }

    if (galleryLightboxNext) {
      galleryLightboxNext.addEventListener('click', function (e) {
        e.stopPropagation();
        showGalleryImage(galleryIndex + 1);
      });
    }

    if (galleryLightboxZoomIn) {
      galleryLightboxZoomIn.addEventListener('click', function (e) {
        e.stopPropagation();
        setGalleryZoom(galleryZoom + ZOOM_STEP);
      });
    }

    if (galleryLightboxZoomOut) {
      galleryLightboxZoomOut.addEventListener('click', function (e) {
        e.stopPropagation();
        setGalleryZoom(galleryZoom - ZOOM_STEP);
      });
    }

    galleryLightboxStage.addEventListener('wheel', function (e) {
      e.preventDefault();
      setGalleryZoom(galleryZoom + (e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP));
    }, { passive: false });

    galleryLightboxStage.addEventListener('dblclick', function (e) {
      e.preventDefault();
      setGalleryZoom(galleryZoom > 1 ? 1 : 2);
    });

    galleryLightboxStage.addEventListener('pointerdown', function (e) {
      if (galleryZoom <= 1) return;
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      panStartX = galleryPanX;
      panStartY = galleryPanY;
      galleryLightboxStage.classList.add('is-dragging');
      galleryLightboxStage.setPointerCapture(e.pointerId);
    });

    galleryLightboxStage.addEventListener('pointermove', function (e) {
      if (!isDragging) return;
      galleryPanX = panStartX + (e.clientX - dragStartX);
      galleryPanY = panStartY + (e.clientY - dragStartY);
      applyGalleryTransform();
    });

    function endGalleryDrag(e) {
      if (!isDragging) return;
      isDragging = false;
      galleryLightboxStage.classList.remove('is-dragging');
      if (e && e.pointerId !== undefined) {
        try {
          galleryLightboxStage.releasePointerCapture(e.pointerId);
        } catch (err) {
          /* ignore */
        }
      }
    }

    galleryLightboxStage.addEventListener('pointerup', endGalleryDrag);
    galleryLightboxStage.addEventListener('pointercancel', endGalleryDrag);

    document.addEventListener('keydown', function (e) {
      if (!galleryAlbum.hidden && e.key === 'Escape' && galleryLightbox.hidden) {
        closeCategoryAlbum();
        return;
      }

      if (galleryLightbox.hidden) return;

      if (e.key === 'Escape') {
        closeGallery();
      } else if (e.key === 'ArrowLeft') {
        showGalleryImage(galleryIndex - 1);
      } else if (e.key === 'ArrowRight') {
        showGalleryImage(galleryIndex + 1);
      } else if (e.key === '+' || e.key === '=') {
        setGalleryZoom(galleryZoom + ZOOM_STEP);
      } else if (e.key === '-') {
        setGalleryZoom(galleryZoom - ZOOM_STEP);
      }
    });
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
