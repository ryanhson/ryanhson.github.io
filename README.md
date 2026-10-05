# Ryan Henderson — Portfolio

Personal portfolio site. Plain HTML, CSS, and JavaScript with no build step, hosted on GitHub Pages.

## Structure

```
index.html          Home: intro, "explore by" choices, featured projects
projects.html       Project gallery with topic + skill filters
experience.html     Expandable timeline of roles
skills.html         Skills grouped by category, each linked to its projects
about.html          Bio
contact.html        Email, LinkedIn, GitHub, resume
404.html            Shown by GitHub Pages for missing URLs
projects/*.html     One page per project (same template)
css/styles.css      All styles (colors are tokens at the top)
js/data.js          Projects, skills, roles: the single source of truth
js/main.js          Header/footer, theme toggle, filters, generated sections, lightbox
assets/             Images, video, resume.pdf
```

## Common edits

- **Change a project's tags, dates, summary, or order:** edit `PROJECTS` in `js/data.js`. Cards, filters, skill counts, and "Where to next?" links update automatically.
- **Add a project:** add an entry to `PROJECTS`, then copy any file in `projects/`, rename it to match the new `id`, and update `data-project` on its `<body>`.
- **Add media:** put files in `assets/images/` or `assets/video/`, then replace a `<div class="media-ph">…</div>` placeholder with:
  - Image: `<img src="../assets/images/name.jpg" alt="Description">`
  - Video: `<video src="../assets/video/name.mp4" controls muted playsinline></video>`
  - Images inside `.gallery` open in a lightbox when clicked.
- **Change colors:** edit the tokens at the top of `css/styles.css` (light and dark).

## Preview locally

Open `index.html` in a browser, or use the VS Code "Live Server" extension.
