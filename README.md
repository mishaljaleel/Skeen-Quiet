# Woody House

A modern, professional, fully responsive accommodation website for **Woody House** — peaceful shared accommodation for healthcare professionals in Woodchester, South Australia.

Built with HTML5, CSS3, and vanilla JavaScript. No WordPress, Elementor, or framework dependencies.

## Features

- **Fully responsive** — Mobile-first design for desktop, tablet, and mobile
- **Premium countryside aesthetic** — Sage green, warm cream, and wood-inspired palette
- **10 complete sections** — Hero, About, Features, Nature, Pricing, Gallery, Agencies, Testimonials, Contact, Booking
- **SEO optimized** — Semantic HTML, meta tags, Open Graph, and JSON-LD structured data
- **Accessible** — ARIA labels, focus states, reduced-motion support
- **Interactive** — Sticky header, scroll reveal animations, testimonial slider, form validation
- **Fast loading** — Local SVG assets, no build step required

## Project Structure

```
Skeen-Quiet/
├── index.html              # Main page
├── README.md
├── css/
│   ├── reset.css           # CSS reset
│   ├── variables.css       # Woody House design tokens
│   ├── layout.css          # Global layout, buttons, forms
│   ├── components.css      # Section-specific styles
│   └── responsive.css      # Breakpoint overrides
├── js/
│   └── main.js             # Navigation, animations, slider, forms
└── assets/
    ├── icons/              # Logo and favicon
    └── images/             # Hero, gallery, and property SVGs
```

## Quick Start

### Open directly

Double-click `index.html` or open in your browser.

### Local development server (recommended)

```bash
cd Skeen-Quiet
python -m http.server 8080
```

Visit [http://localhost:8080](http://localhost:8080)

Or with Node.js:

```bash
npx serve .
```

## Customization

### Replace placeholder contact details

Update phone and email in `index.html`:

- Phone: `0400 000 000`
- Email: `enquiries@woodyhouse.com.au`

### Add real photography

Replace SVG placeholders in `assets/images/` with JPG or WebP photos:

1. Add photos to `assets/images/`
2. Update `<img src="...">` paths in `index.html`
3. Use `loading="lazy"` for below-the-fold images

Recommended photos: bedrooms, kitchen, lounge, creekside, pine grove, BBQ area.

### Brand colors

Edit `css/variables.css`:

```css
--color-accent: #5E6D59;      /* Sage green */
--color-secondary: #D68E49;   /* Terracotta accent */
--color-bg: #F9F7F2;          /* Warm cream background */
```

### Typography

Uses Google Fonts: **Playfair Display** (headings), **DM Sans** (body), **Cormorant Garamond** (script accents). For fully offline use, download fonts to `assets/fonts/` and update `@font-face` rules.

## Sections

| Section | ID | Description |
|---------|-----|-------------|
| Hero | `#home` | Full-viewport hero with CTAs |
| About | `#about` | Property overview and travel times |
| Features | `#features` | 11 accommodation feature cards |
| Nature | `#nature` | Recovery and outdoor experience |
| Rooms | `#rooms` | Three pricing tiers |
| Gallery | `#gallery` | Masonry-style photo grid |
| Agencies | `#agencies` | Workforce accommodation partnerships |
| Testimonials | `#testimonials` | Auto-playing review slider |
| Contact | `#contact` | Contact form, map, and details |
| Booking | `#booking` | Room enquiry form |

## Deployment

Upload the entire folder to any static host:

- **Netlify** — Drag and drop
- **Vercel** — `vercel --prod`
- **GitHub Pages** — Enable Pages on the repo

No build step required.

## Browser Support

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

---

**Woody House** — A quiet place to stay. A better place to be.

Part of Quiet Corners of Australia.
