# Portfolio Gallery Upload Guide

This portfolio includes two independent gallery pages plus matching sections in `index.html`:

- `ai-videos.html` — standalone AI videos gallery
- `automation-workflows.html` — standalone automation workflows gallery

The main `index.html` links to both standalone pages.

- `assets/videos/` for `.mp4` or `.webm` files
- `assets/workflows/` for `.pdf`, `.png`, or `.jpg` workflow files

## Publish on GitHub Pages

1. Rename `portfolio.html` to `index.html`.
2. Upload `index.html` and the complete `assets` folder to the same repository.
3. Put your video files in `assets/videos/`.
4. Put your workflow files in `assets/workflows/`.
5. In `index.html`, duplicate an existing card in the matching gallery and update:
   - the `src` value for a video, or the `href` value for a workflow file;
   - the project title, category, and description;
   - the `poster` path for an optional video thumbnail;
   - the `data-format`, `data-focus`, and `data-outcome` values used by the lightbox.
6. Keep filenames lowercase, use hyphens instead of spaces, and make sure the path uses forward slashes.

Example video path:

```html
assets/videos/my-new-video.mp4
```

Example workflow path:

```html
assets/workflows/my-new-workflow.pdf
```

The lightbox opens uploaded videos inside the website. Workflow PDFs open in a new browser tab from the preview modal, which works on GitHub Pages without a backend.
