# Merle Klein portfolio

Angular 8 application containing a portfolio homepage, the Health Coach public case study, and interactive language, algorithm, and game projects.

## Local development

Use Node 24 and npm 11. This legacy Angular build uses the OpenSSL legacy provider in its build and serve scripts. Sass replaces the unsupported native node-sass compiler; the application framework has not been upgraded.

```sh
npm ci --ignore-scripts --legacy-peer-deps
npm run build
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open `http://127.0.0.1:4173/#/home` or `http://127.0.0.1:4173/#/projects/health-coach`.

For a live development server, use `npm run serve`.

## Public content

The Health Coach implementation is private. Only authored case-study copy and a labeled illustrative interface with fictional values belong here. Never copy private app source, personal health records, source imports, backups, device identifiers, credentials, or private requirements into this repository.

The validation copy records a dated snapshot. Recheck claims when updating it; keep implemented workout features distinct from future AI coaching ideas. The illustration is not an app screenshot.

## Publication

GitHub Pages serves the repository root on `master`; `merlek-app/` holds source, and `dist/` is an ignored local build. A source-only change does not update the public root bundles.

Preview and obtain approval before copying a reviewed build to the root or pushing any public update. The historical `bin/deploy.sh` script merges branches, deletes root files through `bin/clean.sh`, and pushes immediately; do not use it for preview or review.
