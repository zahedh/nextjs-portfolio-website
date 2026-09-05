# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

**portfolio-site** — personal portfolio site (Next.js 15 App Router, React 19, TypeScript 5, Tailwind CSS v4), designed in Figma and implemented with Claude Code. Full brief, stack, engineering standard, and project-specific rules live in `.context/projects/portfolio-site.md` — read that before working in this repo.

Engineering standard: Next.js / React, **Showcase** tier. Read `.context/engineering/tiers.md` and `.context/engineering/nextjs-react.md` for what that obliges.

## Running locally

```bash
npm run dev           # Development server
npm run build         # Production build
npm run validate      # Full checkpoint: type-check + lint + prettier-check + test
```

`npm run validate` is the per-task checkpoint. Focused checks during development, full validation once before a task is considered finished.

`GITHUB_TOKEN` is optional; without it the contributions API is rate-limited.

## Repo rules shared with Codex

`AGENTS.md` holds the project rules that bind both agents — role division, the small-fix workflow, the architecture map, and the repo-local patterns. Read it when planning or writing a brief, not only when executing one.

Repo-local conventions the hub does not cover live in `AGENTS.md`, under Repo-local conventions.

---

## Personal context

The user's private context hub is mounted at `.context/` (gitignored).
Read these first on every task:

@.context/CLAUDE.md
