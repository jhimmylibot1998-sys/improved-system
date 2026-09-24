# Portfolio Asset Upload Guide

The portfolio includes a responsive homepage, a dedicated AI video gallery, and an automation workflow gallery. All pages share the same premium visual system through `app.css` and the shared interactions in `app.js`.

## Asset locations

Place video files in `assets/videos/` using `.mp4` or `.webm` formats. Place workflow references in `assets/workflows/` using `.pdf`, `.png`, or `.jpg` formats. Keep filenames lowercase, use hyphens instead of spaces, and use forward slashes in every HTML path.

The repository currently includes `assets/videos/my-ai-video.mp4`, which is linked from `ai-videos.html`. The workflow directory contains documentation only, so workflow cards currently show a request-based state until a real workflow file is added.

## Add a new video

Add the file to `assets/videos/`, then duplicate a card in `ai-videos.html`. Update the asset link, title, category, and description. Use `target="_blank"` with `rel="noopener"` for files that should open in a new browser tab.

## Add a new workflow

Add the file to `assets/workflows/`, then duplicate a card in `automation-workflows.html`. Update the link, title, category, and description. PDFs open directly in a new browser tab and work on GitHub Pages without a backend.

## Publish on GitHub Pages

Keep `index.html` at the repository root, push the complete repository to GitHub, then enable Pages from **Settings → Pages** using the `main` branch and repository root. No build step is required.
