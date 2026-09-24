# Alex Morgan Studio Portfolio

A GitHub Pages-ready personal portfolio and services showcase for an AI video specialist and AI automation specialist. The site uses a shared premium visual system across the homepage, galleries, case-study notes, and supporting reference pages.

## Live site

- **GitHub Pages:** https://jhimmylibot1998-sys.github.io/improved-system/
- **Local preview:** serve the repository root with any static HTTP server and open `index.html`.

## Site structure

- `index.html` — responsive portfolio homepage with services, selected work, process, testimonial, filters, and contact form.
- `ai-videos.html` — AI video gallery with the available uploaded MP4 linked from `assets/videos/`.
- `automation-workflows.html` — automation workflow gallery and service overview.
- `ai_video.html`, `automation.html`, `method.html`, `opportunity.html`, `services.html`, `work.html`, `cover.html`, `close.html` — shared-style studio notes and supporting pages retained for presentation and reference use.
- `app.css` — shared responsive design system, theme tokens, layout, animations, gallery cards, and accessibility states.
- `app.js` — shared navigation, reveal motion, work filtering, and contact form behavior.
- `robots.txt` and `sitemap.xml` — crawler guidance for search engine discovery.

## Assets

- Place `.mp4` or `.webm` files in `assets/videos/`.
- Place workflow `.pdf`, `.png`, or `.jpg` files in `assets/workflows/`.
- Keep filenames lowercase and use hyphens instead of spaces.
- Update the relevant gallery card when adding a new asset.

## Publishing

1. Push the repository to GitHub.
2. Open **Settings → Pages**.
3. Select the `main` branch and repository root.
4. GitHub Pages will publish the static site without a build step.

The site is intentionally dependency-free at runtime: it uses semantic HTML, a single shared stylesheet, a small deferred JavaScript file, and static assets only.
