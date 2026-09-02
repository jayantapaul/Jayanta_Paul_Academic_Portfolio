# Dr. Jayanta Paul — Academic Portfolio

A lightweight, responsive academic portfolio built with plain HTML, CSS and JavaScript. It is ready for **GitHub Pages** and requires no build step, framework, package manager or server.

## Files

- `index.html` — page structure and main profile text
- `styles.css` — responsive layout, colors and dark mode
- `data.js` — publications, research themes, experience, education, teaching/service and awards
- `script.js` — rendering, publication filtering/search, mobile menu and theme toggle
- `assets/Jayanta_Paul_CV.pdf` — downloadable CV
- `.nojekyll` — tells GitHub Pages to serve the static files as-is

## Publish on GitHub Pages

### Option A — Personal homepage

1. Sign in to GitHub and create a **public** repository named exactly:
   `YOUR-GITHUB-USERNAME.github.io`
2. Upload all files and folders from this portfolio package to the repository root.
3. Commit the files to the `main` branch.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Select `main` and `/ (root)`, then click **Save**.
7. Your site will be available at:
   `https://YOUR-GITHUB-USERNAME.github.io/`

### Option B — Project repository

1. Create a repository, for example `academic-portfolio`.
2. Upload all files to the repository root and commit them.
3. Open **Settings → Pages**.
4. Choose **Deploy from a branch → main → / (root)**.
5. The site will be available at:
   `https://YOUR-GITHUB-USERNAME.github.io/academic-portfolio/`

All links in this template are relative, so both deployment options work without code changes.

## Update publications later

Open `data.js` and edit the `publications` array. Each publication has:

```js
{
  year: 2026,
  type: "journal", // journal | conference | review
  title: "Paper title",
  authors: "Author list",
  venue: "Journal / conference information"
}
```

Save and push the change to GitHub; Pages will update automatically after the deployment finishes.

## Change your CV

Replace `assets/Jayanta_Paul_CV.pdf` with a newer PDF **using the same filename**. No other code change is needed.

## Add a profile photo (optional)

The current design intentionally uses a clean `JP` monogram because the CV package did not contain a suitable personal portrait. If you want a photograph later, add your image under `assets/` and replace the `.avatar` block in `index.html` with an `<img>` element.

## Privacy choice

The public portfolio intentionally omits CV-only personal details such as date of birth, parent information and referee phone numbers. Professional email, Google Scholar and LinkedIn remain available.
