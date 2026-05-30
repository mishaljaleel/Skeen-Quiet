# Aurora Studio

A professional, modern, and fully responsive creative agency website built from scratch with HTML5, CSS3, and vanilla JavaScript.

## Features

- **Fully responsive** — Optimized layouts for desktop (1200px+), tablet (768–1024px), and mobile (<768px)
- **Modern UI/UX** — Clean typography, gold accent palette, smooth hover effects, and scroll animations
- **Performance-focused** — No external dependencies, local SVG assets, minimal JavaScript
- **SEO-ready** — Semantic HTML, meta tags, Open Graph properties, and accessible markup
- **Interactive components** — Sticky header, mobile navigation, portfolio filters, testimonial slider, animated counters, and contact form validation

## Project Structure

```
aurora-studio/
├── index.html              # Main page
├── README.md               # This file
├── css/
│   ├── reset.css           # CSS reset & base styles
│   ├── variables.css       # Design tokens (colors, typography, spacing)
│   ├── layout.css          # Global layout, buttons, animations
│   ├── components.css      # Section-specific component styles
│   └── responsive.css      # Breakpoint overrides
├── js/
│   └── main.js             # Navigation, animations, slider, form
└── assets/
    ├── fonts/              # Local font files (optional)
    ├── icons/              # SVG icons and logo
    └── images/             # SVG placeholder illustrations
```

## Sections

| Section | Description |
|---------|-------------|
| Header | Fixed navbar with scroll effect, mobile hamburger menu |
| Hero | Full-viewport hero with stats, CTA buttons, floating cards |
| About | Two-column layout with image collage and feature list |
| Services | Four service cards with hover lift effect |
| Portfolio | Filterable masonry-style project gallery |
| Process | Four-step workflow on dark background |
| Testimonials | Auto-playing slider with dot navigation |
| Contact | Dark CTA block with validated contact form |
| Footer | Four-column footer with social links |

## Quick Start

### Option 1: Open directly

Double-click `index.html` or open it in your browser:

```
file:///C:/Users/PSS_OMNE_TEAM/aurora-studio/index.html
```

### Option 2: Local development server (recommended)

Using Python:

```bash
cd aurora-studio
python -m http.server 8080
```

Then visit [http://localhost:8080](http://localhost:8080)

Using Node.js (npx):

```bash
cd aurora-studio
npx serve .
```

Using PHP:

```bash
cd aurora-studio
php -S localhost:8080
```

### Option 3: VS Code Live Server

Install the "Live Server" extension, right-click `index.html`, and select "Open with Live Server".

## Customization

### Colors

Edit CSS custom properties in `css/variables.css`:

```css
:root {
  --color-accent: #c9a962;      /* Primary gold accent */
  --color-bg: #faf9f7;          /* Page background */
  --color-dark: #0f0f0f;        /* Dark sections */
}
```

### Typography

The site uses **Playfair Display** (headings) and **DM Sans** (body). Install these fonts locally for best results, or update `--font-body` and `--font-heading` in `variables.css` to use your preferred typefaces.

To add local font files:

1. Place `.woff2` files in `assets/fonts/`
2. Update `@font-face` rules in `css/variables.css` with the file paths

### Content

All text content is in `index.html`. Replace placeholder copy, update links, and swap SVG images in `assets/images/` with your own photography or illustrations.

### Images

Current images are lightweight SVG placeholders. Replace them with JPG/WebP photos:

1. Add images to `assets/images/`
2. Update `<img src="...">` paths in `index.html`
3. Add `loading="lazy"` for below-the-fold images

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Uses progressive enhancement: Intersection Observer for scroll animations with graceful fallback.

## Performance Tips

- SVG assets are already optimized for fast loading
- No render-blocking external scripts or stylesheets
- Consider converting hero/portfolio images to WebP for production
- Minify CSS/JS before deployment (`css/` and `js/` files)

## Deployment

Upload the entire `aurora-studio/` folder to any static hosting:

- **Netlify** — Drag and drop the folder
- **Vercel** — `vercel --prod`
- **GitHub Pages** — Push to a repo and enable Pages
- **Any web server** — Copy files to your document root

No build step required.

## License

Free to use and modify for personal and commercial projects. Replace placeholder content and branding with your own before publishing.

---

Built with care by Aurora Studio.
