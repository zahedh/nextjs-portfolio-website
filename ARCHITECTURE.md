# Architecture

> How the code is laid out: what each folder under `src/` owns, how a page request travels through it, and what lint enforces.

## Folders

```text
src/
├── app/                      routes
│   ├── layout.tsx            fonts, metadata, pre-paint theme script
│   ├── not-found.tsx         404
│   ├── sitemap.ts
│   ├── (dashboard)/          pages wrapped in the header and footer
│   │   ├── page.tsx          home
│   │   ├── privacy/
│   │   └── projects/[slug]/  one page per project
│   └── api/contributions/    GitHub activity for the browser
├── components/               React
│   ├── ui/
│   │   ├── sections/         the six home sections
│   │   ├── cards/            project cards, job cards, stacks, links
│   │   ├── buttons/
│   │   ├── navigation/       nav bar and phone menu
│   │   ├── tiles/            skill tiles
│   │   └── animations/       hero orbs, and rocket/ (the 3D rocket)
│   ├── layout/               header and footer
│   ├── text/                 heading and body type components
│   └── dev/                  breakpoint badge, development only
├── lib/                      functions with no React
│   ├── ui-logic/             what a section shows: role groups, contributions grid, project display
│   ├── date/                 role durations and years
│   ├── project/              project filtering
│   ├── api/                  the GitHub fetch
│   ├── meta/                 share metadata
│   ├── utils/                cn(), skill lookup
│   └── viewTransition.ts     the card-to-page morph
├── data/                     site content
├── language/                 site copy
├── hooks/                    React hooks
├── types/                    shared domain types
├── styles/                   tokens and shared classes
└── images/                   static image imports
```

| Folder        | Owns                                                                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/`        | Routes. The `(dashboard)` group wraps the home page, `/privacy` and `/projects/[slug]` in the header and footer; `api/contributions` serves GitHub activity to the browser.          |
| `components/` | React. The 3D rocket is self-contained and imports nothing from the rest of the site.                                                                                                |
| `lib/`        | Functions with no React.                                                                                                                                                             |
| `data/`       | The site's content as typed TypeScript: projects, skills, experience and the About facts.                                                                                            |
| `language/`   | Every human-readable string, in `english.ts`, keyed by the surface that shows it.                                                                                                    |
| `hooks/`      | React hooks shared by components, or pulled out of one to keep it thin.                                                                                                              |
| `types/`      | Domain types shared across layers: a project, a skill, a role, a GitHub response. Any other type lives with the module that owns it.                                                 |
| `styles/`     | `theme.css` holds the colour, type and spacing tokens and the semantic colour roles; `utilities.css` and `components.css` hold shared classes. All are imported through `index.css`. |
| `images/`     | Static imports of `public/images`, so `next/image` knows each file's dimensions.                                                                                                     |

Top-level `hooks/`, `types/` and `data/`, and copy in `language/` rather than `lib/language/`, predate the hub's Next.js standard. They are a declared exception, not a pattern to extend.

## A page request

1. `app/layout.tsx` renders `<html>`, applies the font variables, and runs an inline script that sets the `dark` class before first paint, so the theme never flashes.
2. `app/(dashboard)/layout.tsx` adds the header and footer.
3. `app/(dashboard)/page.tsx` renders six sections from `components/ui/sections`: Hero, Contributions, Skills, Projects, Experience and About. Each reads its content from `data/` and its copy from `language/`, and calls `lib/` for anything computed. The page is built statically.
4. Contributions is the one section that loads in the browser. It requests `/api/contributions?year=`, whose route calls `lib/api/githubApi.ts`. That queries GitHub's GraphQL API with `GITHUB_TOKEN` and caches the answer for a day. Without the token, or when GitHub fails, the section shows its error state.
5. A project card links to `/projects/[slug]`, which is generated at build time for every project in `data/projects.ts`. Opening one from its card morphs the card into the page through `lib/viewTransition.ts`.

## What lint enforces

ESLint runs Next's `core-web-vitals` and `typescript` presets with Prettier's overrides, plus the repo's own rules: no `console` other than `warn` and `error`, the rules of hooks and exhaustive effect dependencies as errors, a warning on `any`, and no unused variables unless prefixed with `_`. No lint rule enforces structure; the folder rules above and the conventions in `AGENTS.md` are kept by review.
