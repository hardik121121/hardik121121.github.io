# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Production build (static export to out/)
npm run lint     # Run ESLint (max-warnings 0)
```

No test suite is configured. Linting and formatting run automatically on pre-commit via lint-staged (ESLint + Prettier). Prettier also auto-organizes imports via `prettier-plugin-organize-imports`.

**Node/npm requirement:** This project uses Node 25 / npm 11 locally. The `package-lock.json` is generated with npm 11 — always use `npm install` (not `yarn` or `pnpm`) to keep the lock file in sync. CI is configured to use npm 11 as well.

## Architecture

**Next.js 16 App Router** portfolio site with static export (`output: "export"`, `images.unoptimized: true`), deployed to GitHub Pages at `hardikarora.me`.

### Routing

Two routes: `app/page.tsx` (home) and `app/certifications/page.tsx` (certifications). No dynamic routing, no middleware. The site builds to `out/`.

### i18n

next-intl is used for translations only (no URL-based locale routing). Always uses `en`. `i18n/request.ts` hardcodes `en` and merges `messages/en/common.json` then `messages/en.json` — keys in `en.json` override same-named keys in `common.json`. Use `getTranslations()` in server components and `useTranslations()` in client components.

### Data flow

`resume.json` is the single source of truth for portfolio content (work experience, projects, skills). It uses `messageKey` fields (e.g., `work.watermelon.name`) that map to translation strings in `messages/en.json`. The main page (`app/page.tsx`) composes section components that read from this file.

### Component structure

- `components/section/` — major page sections (description, projects, skills, work)
- `components/ui/` — shadcn/ui primitives (don't edit directly; use `npx shadcn@latest add`)
- `components/kibo-ui/` — customized kibo-ui contributions graph component (edit directly if needed)
- `components/navbar/`, `components/footer/` — layout chrome
- `features/github/` — GitHub contributions graph; fetches from `github-contributions-api.jogruber.de` using `GITHUB_USERNAME` from `features/github/constant.ts`. The fetch result (a Promise) is passed directly to the graph component for React streaming — do not await it in `page.tsx`.
- `features/resume/` — headline/contact info display

### Styling

Tailwind CSS v4 — configuration lives in `app/globals.css` (no `tailwind.config.ts`). CSS custom properties define the theme tokens for light/dark mode. Prettier auto-sorts Tailwind classes via `prettier-plugin-tailwindcss`.

### Adding content

To add a new work experience or project: update `resume.json`, add the corresponding translation keys to `messages/en.json`, then reference the new entry from the relevant section component. Project logos go in `public/logo/`. Each work/project entry requires both `logo` and `logoDark` fields (light and dark mode variants).

To add a certification: add an entry to the `certifications` array in `resume.json` (fields: `id`, `nameKey`, `issuerKey`, `date`, `url`, `logo`, `logoDark`), add the name/issuer strings under `resume.certifications` in `messages/en.json`, and place the logo in `public/logo/`.

### Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on every push to `main`. The personal GitHub SSH key (`~/.ssh/id_personal`) is configured for pushing to this repo — use `git@github.com-personal:hardik121121/...` as the remote URL format.
