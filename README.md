# 🌐 Next.js Portfolio Website

**v1.1.0**

A personal portfolio built with Next.js and TypeScript, showcasing projects, experience and skills. Live at [zahedheidari.co.uk](https://zahedheidari.co.uk).

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
- **UI:** React 19
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4
- **3D and animation:** Three.js, Motion
- **Icons:** React Icons, Lucide React
- **API:** GitHub GraphQL API
- **Testing:** Jest, React Testing Library
- **Linting and formatting:** ESLint, Prettier
- **Hosting:** Vercel

<a id="features"></a>

## ✨ Features

- 3D rocket in the hero, assembled and launched on a tap
- GitHub contributions calendar, by year
- Skills grouped by kind
- Projects filtered by category, each with its own page
- Experience rail, grouped by employer
- Light and dark themes
- Keyboard navigable, with visible focus throughout
- Privacy page and custom 404

<a id="project-structure"></a>

## 🗂️ Project Structure

- `src/app`: routes, layouts and the contributions API route
- `src/components`: page sections and UI components
- `src/data`: projects, skills, experience and About content
- `src/language`: all site copy
- `src/lib`: logic with no React
- `src/hooks`: React hooks
- `src/styles`: theme tokens and shared styles
- `src/types`: shared types
- `public`: images, icons and the CV

More detail in [ARCHITECTURE.md](ARCHITECTURE.md).

<a id="getting-started"></a>

## 🚀 Getting Started

Requires Node.js 22.

```bash
git clone https://github.com/zahedh/nextjs-portfolio-website.git
cd nextjs-portfolio-website
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

<a id="environment-variables"></a>

## 🔐 Environment Variables

Create `.env.local` in the project root:

```bash
# GitHub personal access token with the read:user scope
GITHUB_TOKEN=your_github_personal_access_token
```

Without it, the contributions calendar shows its error state.

<a id="scripts"></a>

## 🧪 Scripts

```bash
npm run dev               # Development server
npm run build             # Production build
npm run start             # Serve the production build

npm run type-check        # TypeScript
npm run lint              # ESLint
npm run test              # Jest
npm run prettier-check    # Check formatting
npm run prettier-format   # Format code

npm run validate          # Type-check, lint, format check and tests
```

<a id="deployment"></a>

## 🌍 Deployment

Hosted on Vercel, which builds a preview for every push. CI runs `npm run validate` on every push and pull request. Vercel Analytics and Speed Insights load only on Vercel deployments.

<a id="license"></a>

## 📄 License

[MIT](LICENSE)
