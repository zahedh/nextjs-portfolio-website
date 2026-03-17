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

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4
- **Animations:** Motion (Framer Motion) 12.16
- **UI Libraries:**
  - Swiper 12.1 (Project carousel)
  - React Activity Calendar 3.0 (GitHub contributions)
  - React Icons 5.5 & Lucide React 0.556 (Icon libraries)
- **State Management:** Zustand 5.0
- **API Integration:** GitHub GraphQL API
- **Testing:** Jest 29, React Testing Library 16
- **Linting & Formatting:** ESLint 9, Prettier 3.5
- **Hosting:** Vercel

<a id="features"></a>

## ✨ Features

- ⚡ Static & server rendering for SEO and performance
- 🎨 Fully responsive design (mobile, tablet, desktop)
- 🌗 Light / dark mode theme toggle
- 💼 Project showcase with Swiper carousel and filtering
- 📊 GitHub contributions calendar with year filtering
- 📅 Timeline-based experience section
- 🎭 Smooth animations and transitions
- 🏆 Interactive skill tiles with categorization
- 📲 Mobile hamburger menu
- ♿ Accessibility-first components
- 📜 Privacy policy page (`/privacy`)
- 🔗 Custom 404 (not-found) page
- 📝 Centralized UI copy via `src/language`

<a id="project-structure"></a>

## 🗂️ Project Structure

High-level overview of the main folders:

- `src/app` – Next.js routes, layouts, and pages (App Router); includes `(dashboard)` route group (home, `/privacy`)
- `src/components` – Reusable UI components (buttons, cards, navigation, sections, text, media, etc.)
- `src/data` – Static data (skills, projects, experience, about content)
- `src/hooks` – Custom React hooks for UI and interaction logic
- `src/language` – Centralized UI copy and translations (e.g. `english.ts`)
- `src/lib` – Utilities, environment helpers, API clients (e.g. GitHub), and shared logic
- `src/providers` – React context providers (e.g. global store)
- `src/stores` – Zustand global store definitions
- `src/styles` – Global styles (Tailwind entry point, theme, components CSS)
- `src/types` – TypeScript type definitions (e.g. GitHub API types)
- `public` – Static assets (images, icons, etc.)

<a id="getting-started"></a>

## 🚀 Getting Started

### Prerequisites

- Node.js **18.17+** (match your deployment target, e.g. Vercel)
- npm (or another Node.js package manager)
- GitHub Personal Access Token (for contributions calendar feature)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/nextjs-portfolio-website.git
cd nextjs-portfolio-website
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (see [Environment Variables](#environment-variables) section below)

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

<a id="environment-variables"></a>

## 🔐 Environment Variables

Create a `.env.local` file in the project root:

```bash
# GitHub Personal Access Token for contributions calendar
# Create at: https://github.com/settings/tokens (requires read:user scope)
GITHUB_TOKEN=your_github_personal_access_token
```

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

This project is hosted on **Vercel** and is optimised for similar platforms (e.g. Vercel, Netlify). To deploy:

<a id="license"></a>

## 📄 License

This project is open source and licensed under the [MIT License](LICENSE).
