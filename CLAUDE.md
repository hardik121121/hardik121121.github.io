# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # Run ESLint (max-warnings 0)
```

No test suite is configured. Linting and formatting run automatically on pre-commit via lint-staged (ESLint + Prettier).

## Architecture

**Next.js 16 App Router** portfolio site — English only.

### Routing & i18n

All pages live under `app/[locale]/` — next-intl middleware handles locale detection and redirects. Only `en` locale is configured (`localePrefix: "never"` so URLs have no `/en` prefix). Use `getTranslations()` in server components and `useTranslations()` in client components. Navigation helpers (locale-aware `Link`, `redirect`, etc.) come from `i18n/navigation.ts`, not `next/navigation`.

### Data flow

`resume.json` is the single source of truth for portfolio content (work experience, projects, skills). It uses `messageKey` fields (e.g., `work.watermelon.name`) that map to translation strings in `messages/en.json`. The main page (`app/[locale]/page.tsx`) composes section components that read from this file.

### Component structure

- `components/section/` — major page sections (description, projects, skills, work)
- `components/ui/` — shadcn/ui primitives (don't edit directly; use `npx shadcn@latest add`)
- `features/github/` — GitHub contributions graph with server-side data fetching
- `features/resume/` — resume data display

### Styling

Tailwind CSS v4 — configuration lives in `app/globals.css` (no `tailwind.config.ts`). CSS custom properties define the theme tokens for light/dark mode. Prettier auto-sorts Tailwind classes via `prettier-plugin-tailwindcss`.

### Adding content

To add a new work experience or project: update `resume.json`, add the corresponding translation keys to `messages/en.json`, then reference the new entry from the relevant section component.
