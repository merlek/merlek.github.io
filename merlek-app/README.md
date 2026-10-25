# Merle Klein portfolio

Angular application featuring Health Coach and AgentFlow, a consulting section, and a public HTML/PDF resume. Legacy language, algorithm, game, and theme routes redirect to the portfolio homepage; their source remains retained but is no longer loaded by the portfolio.

## Local development

Use Node 24.15 or later within Node 24, and npm 11 or later. `.nvmrc` selects Node 24.

The app uses Angular/CLI 22.2.3, Bootstrap 5.3.8, ng-bootstrap 21, ngx-bootstrap 22, RxJS 7.8.2, Font Awesome 7.3.1, Sass 1.105.2, and Vitest 5. Versions are pinned in the lockfile. TypeScript 6.0.3 is the newest compatible version: Angular 22 requires TypeScript >=6.0 and <6.1, so TypeScript 7 is intentionally excluded. See the [Angular compatibility table](https://angular.dev/reference/versions).

Unused jQuery, core-js, rxjs-compat, Popper v1, matrix/vector direct dependencies, and retired Karma/Protractor/TSLint tooling have been removed. The two used personal helper libraries are pinned to their latest upstream commits. They still ship CommonJS bundles; the build records these known dependencies explicitly.

Existing module-based components retain eager change detection so async vocabulary loads and animation controls keep their established behavior. The game canvas adapter lets the game manager own its render loop rather than accepting automatic state-free draws from the newer canvas library.

```sh
nvm use
npm ci --ignore-scripts
npm run build
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open `http://127.0.0.1:4173/#/home` or `http://127.0.0.1:4173/#/projects/health-coach`.

For a live development server, use `npm run serve`. Run `npm test` for the Vitest suite.

Validation on October 17, 2026: 18 tests passed, covering existing component construction plus edit distance, N Queens, Hanoi, Snake state, Tic Tac Toe, and canvas render-loop ownership. Actual canvas rendering, game input, flash cards, nested tabs, and desktop/mobile portfolio navigation are checked in the browser. Component construction tests do not claim to validate canvas rendering in jsdom.

## Public content

The Health Coach implementation is private. Only authored case-study copy and a labeled illustrative interface with fictional values belong here. Never copy private app source, personal health records, source imports, backups, device identifiers, credentials, or private requirements into this repository.

The validation copy records a dated snapshot. Recheck claims when updating it; keep implemented workout features distinct from future AI coaching ideas. The illustration is not an app screenshot.

## Publication

GitHub Pages serves the repository root on `master`; `merlek-app/` holds source, and `dist/` is an ignored local build. A source-only change does not update the public root bundles.

Preview and obtain approval before copying a reviewed build to the root or pushing any public update. The historical `bin/deploy.sh` script merges branches, deletes root files through `bin/clean.sh`, and pushes immediately; do not use it for preview or review.

## Public resume

The HTML route `/#/resume` renders `src/resume/resume-content.json`. Its PDF download is the separate public copy at `/resume/merle-klein-resume.pdf`; both use the professional app-support email. Keep phone numbers, personal email, editable Word files and private review notes out of these public assets.

When editing the canonical JSON, regenerate the matching public PDF and run `npm run check:resume`. The production build also runs this parity check, using Poppler's `pdftotext` on PATH. It compares the complete public HTML data with extracted PDF text, ignoring layout and page footers, and checks the approved email and absence of phone numbers. Private editable sources remain outside this repository.
