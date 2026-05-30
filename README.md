# Quiet Corners of Australia

A modern, professional, fully responsive accommodation website for **Quiet Corners of Australia** — peaceful shared accommodation for healthcare professionals in Woodchester, South Australia.

Built with HTML5, CSS3, and vanilla JavaScript. No WordPress, Elementor, or framework dependencies.

## Features

- **Fully responsive** — Mobile-first design for desktop, tablet, and mobile
- **Premium countryside aesthetic** — Sage green, warm cream, and wood-inspired palette
- **10 complete sections** — Hero, About, Features, Nature, Pricing, Gallery, Agencies, Testimonials, Contact, Booking
- **SEO optimized** — Semantic HTML, meta tags, Open Graph, and JSON-LD structured data
- **Accessible** — ARIA labels, focus states, reduced-motion support
- **Interactive** — Sticky header, scroll reveal animations, testimonial slider, form validation
- **Fast loading** — Local assets, no build step required

## Project Structure

```
Skeen-Quiet/
├── index.html              # Main page
├── README.md
├── css/
│   ├── reset.css           # CSS reset
│   ├── variables.css       # Brand design tokens
│   ├── layout.css          # Global layout, buttons, forms
│   ├── components.css      # Section-specific styles
│   └── responsive.css      # Breakpoint overrides
├── js/
│   └── main.js             # Navigation, animations, slider, forms
└── assets/
    ├── icons/              # Logo and favicon
    └── images/             # Hero, gallery, and property photos
```

## Quick Start

### Open directly

Double-click `index.html` or open in your browser.

### Local development server (recommended)

```bash
cd Skeen-Quiet
python -m http.server 8765
```

Visit [http://localhost:8765](http://localhost:8765)

Or with Node.js:

```bash
npx serve .
```

## Customization

### Replace placeholder contact details

Update phone and email in `index.html`:

- Phone: `0400 000 000`
- Email: `enquiries@quietcorners.com.au`

### Add real photography

Replace SVG placeholders in `assets/images/` with JPG or WebP photos.

### Brand colors

Edit `css/variables.css`.

## Deployment

Upload the entire folder to any static host (Netlify, Vercel, GitHub Pages). No build step required.

---

**Quiet Corners of Australia** — A quiet place to stay. A better place to be.
