# 🌐 Next.js Portfolio Website

A modern, minimal, and performant portfolio built with Next.js and TypeScript, designed to showcase projects, experience, and skills with a strong focus on responsive design, accessibility, and maintainable architecture.

## 📚 Contents

- 🧰 [Tech Stack](#tech-stack)
- ✨ [Features](#features)
- 🗂️ [Project Structure](#project-structure)
- 🚀 [Getting Started](#getting-started)
- 🔐 [Environment Variables](#environment-variables)
- 🧪 [Scripts](#scripts)
- 🌍 [Deployment](#deployment)
- 📄 [License](#license)

<a id="tech-stack"></a>

## 🧰 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Testing:** Jest, Testing Library
- **Linting & Formatting:** ESLint, Prettier
- **Hosting:** Vercel
- **Analytics:** Firebase Analytics

<a id="features"></a>

## ✨ Features

- ⚡ Static & server rendering for great performance and SEO
- 🎨 Fully responsive layout for mobile, tablet, and desktop
- 🌗 Light / dark mode theme toggle
- 💼 Project showcase with rich cards (and support for detail views)
- 🧠 Global UI state with Zustand
- ♿ Accessibility-first components and semantics
- 🧩 Modular, reusable component library for sections and UI elements

<a id="project-structure"></a>

## 🗂️ Project Structure

High-level overview of the main folders:

- `src/app` – Next.js routes, layouts, and pages (App Router)
- `src/components` – Reusable UI components (buttons, cards, navigation, sections, etc.)
- `src/data` – Static data (e.g. skills, content definitions)
- `src/hooks` – Custom React hooks for UI and interaction logic
- `src/lib` – Utilities, environment helpers, and shared logic
- `src/stores` – Zustand global store definitions
- `src/styles` – Global styles (Tailwind entry point, global CSS)
- `public` – Static assets (images, icons, etc.)

<a id="getting-started"></a>

## 🚀 Getting Started

### Prerequisites

- Node.js **18.17+** (match your deployment target, e.g. Vercel)
- npm (or another Node.js package manager)

<a id="environment-variables"></a>

## 🔐 Environment Variables

This project uses environment variables for configuration. For local development:

1. Create a `.env.local` file in the project root.
2. Add any required variables, for example:

```bash
# Example – adjust to your needs
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
API_BASE_URL=https://api.example.com
```

- `.env.local` is **git-ignored** and should not be committed.
- In production (e.g. Vercel), set the same variables in the project’s Environment Variables settings.

<a id="scripts"></a>

## 🧪 Scripts

Commonly used scripts defined in `package.json`:

```bash
npm run dev                   # Start development server
npm run build                 # Create production build
npm run start                 # Run the production server

npm run type-check            # Run TypeScript type checking
npm run lint                  # Run ESLint
npm run test                  # Run Jest test suite

npm run prettier-check        # Check formatting with Prettier
npm run prettier-format       # Format code with Prettier
npm run prettier-check-format # Check, or format if needed

npm run validate              # Type-check + lint + format check (full sanity check)
```

Run `npm run validate` before committing or deploying to ensure everything passes.

<a id="deployment"></a>

## 🌍 Deployment

This project is hosted on **Vercel** and optimised for similar platforms:

<a id="license"></a>

## 📄 License

This project is open source and licensed under the [MIT License](LICENSE).
