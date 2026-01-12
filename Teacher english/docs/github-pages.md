# Deploy to GitHub Pages

This repository can be published to GitHub Pages using the provided GitHub Actions workflow.

How it works
- The action runs on push to `main`. It installs deps, builds with `VITE_BASE` set to `/FeruzaTeacher2/`, copies `index.html` to `404.html` to support SPA routing, and pushes `dist` to the `gh-pages` branch.

URL after successful deploy
- Your site will be available at: `https://<github-username>.github.io/FeruzaTeacher2/` (for example: `https://programmistboys-droid.github.io/FeruzaTeacher2/`).

Notes & troubleshooting
- If you deploy to a custom domain, add a `CNAME` file to `dist/` or configure Pages settings.
- If you use a different repo name or want to publish under the username site, adjust `VITE_BASE` in `.github/workflows/deploy.yml`.
- To test locally: `npm run build && npx serve dist` or `npm run start` then visit `http://localhost:3000`.
