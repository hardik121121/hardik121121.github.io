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

Six routes, all statically pre-rendered:

| Route             | File                          |
| ----------------- | ----------------------------- |
| `/`               | `app/page.tsx`                |
| `/certifications` | `app/certifications/page.tsx` |
| `/contact`        | `app/contact/page.tsx`        |
| `/projects`       | `app/projects/page.tsx`       |
| `/blog`           | `app/blog/page.tsx`           |
| `/_not-found`     | `app/not-found.tsx`           |

No dynamic routing, no middleware. The site builds to `out/`.

### i18n

next-intl is used for translations only (no URL-based locale routing). Always uses `en`. `i18n/request.ts` hardcodes `en` and merges `messages/en/common.json` (shared UI strings under the `common` namespace) then `messages/en.json` (all content namespaces) — keys in `en.json` override same-named keys in `common.json`. Use `getTranslations()` in server components and `useTranslations()` in client components.

### Data flow

`resume.json` is the single source of truth for all portfolio content. Top-level keys:

- `basics` — name, email, location, social media links (LinkedIn, GitHub, Medium, Daily.dev, X, Reddit, Discord, WhatsApp)
- `work` — work experience entries with highlights and skills
- `projects` — all projects; each has a `featured` boolean. The home page "Major Projects" section shows only `featured: true` entries; `/projects` shows all 59
- `certifications` — 38 certification entries
- `achievements` — award/competition entries shown on the home page
- `skills` — skill entries shown in the skills section

Entries use `messageKey` fields (e.g., `work.watermelon.name`) that map to translation strings in `messages/en.json`.

### Component structure

- `components/section/` — major page sections:
  - `description-section.tsx` — about paragraphs (client, uses `useTranslations`)
  - `skill-section.tsx` — skills grid with simple-icons SVGs (client)
  - `achievement-section.tsx` — achievements list (server)
  - `project-section.tsx` — featured projects list (client); filters `project.featured === true`
  - `work/` — work experience accordion (client)
- `components/ui/` — shadcn/ui primitives (don't edit directly; use `npx shadcn@latest add`)
- `components/kibo-ui/` — customized kibo-ui contributions graph component (edit directly if needed)
- `components/navbar/` — site navbar with links to all pages; ghost button style on hover
- `components/footer/` — footer with nav links, social icons (GitHub, LinkedIn, X), copyright
- `components/theme/` — dark/light/system theme toggle
- `features/github/` — GitHub contributions graph; fetches from `github-contributions-api.jogruber.de` using `GITHUB_USERNAME` from `features/github/constant.ts`. `getGitHubContributions()` is async but called _without_ `await` in `page.tsx`, so it returns `Promise<Activity[]>`. The client component unwraps it with React 19's `use()` hook for streaming — do not await it in `page.tsx`. The fetch is wrapped in try/catch returning `[]` on failure so the build succeeds when the API is unreachable. The graph is wrapped in `<Suspense>` with `GitHubContributionFallback`.
- `features/resume/` — headline/contact info display

### Styling

Tailwind CSS v4 — configuration lives in `app/globals.css` (no `tailwind.config.ts`). CSS custom properties define the theme tokens for light/dark mode. Prettier auto-sorts Tailwind classes via `prettier-plugin-tailwindcss`.

### Adding content

**Work experience or skills:** update `resume.json`, add translation keys to `messages/en.json`, reference from the relevant section component. Project logos go in `public/logo/`. Each entry requires both `logo` and `logoDark` fields.

**Project:** add an entry to `resume.json` `projects` array with `"featured": true` to show on the home page or `"featured": false` for the `/projects` page only. Add name/description strings under `resume.projects` in `messages/en.json`.

**Certification:** add to `certifications` array in `resume.json` (fields: `id`, `nameKey`, `issuerKey`, `date`, `url`, `logo`, `logoDark`), add name/issuer strings under `resume.certifications` in `messages/en.json`, place logo in `public/logo/`.

**Achievement:** add to `achievements` array in `resume.json` (fields: `id`, `titleKey`, `descriptionKey`, `date`, `url`, `logo`, `logoDark`), add title/description strings under `resume.achievements` in `messages/en.json`.

**Social media link:** add to `basics.socialMedia` in `resume.json` with `url`, `handle`, `logo`, `logoDark`. Used in the contact page and footer.

### Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on every push to `main`. The personal GitHub SSH key (`~/.ssh/id_personal`) is configured for pushing to this repo — use `git@github.com-personal:hardik121121/...` as the remote URL format.
