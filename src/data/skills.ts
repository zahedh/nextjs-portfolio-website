import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiDotnet,
  SiHtml5,
  SiCss3,
  SiFigma,
  SiTailwindcss,
  SiJira,
  SiGithub,
  SiPostman,
  SiSlack,
  SiDiscord,
  SiNotion,
  SiOpenai,
  SiGooglegemini,
  SiMysql,
  SiAndroidstudio,
  SiXcode,
  SiMacos,
  SiJest,
  SiVite,
  SiEslint,
  SiPrettier,
  SiVercel,
  SiFirebase,
  SiFramer,
  SiClaude,
  SiNx,
  SiStorybook,
  SiNodedotjs,
  SiZod,
  SiShadcnui,
  SiReactquery,
  SiReacttable,
  SiReacthookform,
  SiTestinglibrary,
} from 'react-icons/si';
import { FaWindows } from 'react-icons/fa';
import {
  Braces,
  Code2,
  Drama,
  Film,
  FolderTree,
  Layers,
  MessageSquareCode,
  MousePointer2,
  Network,
  NotebookPen,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { en } from '@/language';
import { Skill } from '@/types/skill';

export const skillsData: Skill[] = [
  // Modern Web & Mobile Frameworks
  {
    id: 'react',
    label: en.skillsCollageSection.react,
    icon: SiReact,
    category: 'frameworks',
  },
  {
    id: 'nextjs',
    label: en.skillsCollageSection.nextJS,
    icon: SiNextdotjs,
    category: 'frameworks',
  },
  {
    id: 'react-native',
    label: en.skillsCollageSection.reactNative,
    icon: SiReact,
    category: 'frameworks',
  },
  {
    id: 'nativewind',
    label: en.skillsCollageSection.nativeWind,
    icon: SiTailwindcss,
    category: 'frameworks',
  },
  {
    id: 'shadcn-ui',
    label: en.skillsCollageSection.shadcnUI,
    icon: SiShadcnui,
    category: 'frameworks',
  },
  {
    id: 'zustand',
    label: en.skillsCollageSection.zustand,
    icon: Layers,
    category: 'frameworks',
  },
  {
    id: 'tanstack-query',
    label: en.skillsCollageSection.tanStackQuery,
    icon: SiReactquery,
    category: 'frameworks',
  },
  {
    id: 'tanstack-table',
    label: en.skillsCollageSection.tanStackTable,
    icon: SiReacttable,
    category: 'frameworks',
  },
  {
    id: 'react-hook-form',
    label: en.skillsCollageSection.reactHookForm,
    icon: SiReacthookform,
    category: 'frameworks',
  },
  {
    id: 'lottie',
    label: en.skillsCollageSection.lottie,
    icon: Film,
    category: 'frameworks',
  },
  {
    id: 'nodejs',
    label: en.skillsCollageSection.nodeJS,
    icon: SiNodedotjs,
    category: 'frameworks',
  },
  {
    id: 'zod',
    label: en.skillsCollageSection.zod,
    icon: SiZod,
    category: 'frameworks',
  },

  // Core Languages
  {
    id: 'typescript',
    label: en.skillsCollageSection.typeScript,
    icon: SiTypescript,
    category: 'languages',
  },
  {
    id: 'javascript',
    label: en.skillsCollageSection.javaScript,
    icon: SiJavascript,
    category: 'languages',
  },

  // Microsoft Stack
  {
    id: 'dotnet',
    label: en.skillsCollageSection.dotNet,
    icon: SiDotnet,
    category: 'microsoft',
  },

  // Legacy/Additional Languages
  {
    id: 'objective-c',
    label: en.skillsCollageSection.objectiveC,
    icon: Code2,
    category: 'legacy',
  },

  // Web Fundamentals
  {
    id: 'html',
    label: en.skillsCollageSection.html,
    icon: SiHtml5,
    category: 'web-fundamentals',
  },
  {
    id: 'css',
    label: en.skillsCollageSection.css,
    icon: SiCss3,
    category: 'web-fundamentals',
  },

  // Styling & Design
  {
    id: 'tailwind',
    label: en.skillsCollageSection.tailwind,
    icon: SiTailwindcss,
    category: 'design',
  },
  {
    id: 'figma',
    label: en.skillsCollageSection.figma,
    icon: SiFigma,
    category: 'design',
  },
  {
    id: 'framer',
    label: en.skillsCollageSection.framer,
    icon: SiFramer,
    category: 'design',
  },

  // Database
  {
    id: 'mysql',
    label: en.skillsCollageSection.mySQL,
    icon: SiMysql,
    category: 'database',
  },

  // Development Tools & IDEs
  {
    id: 'github',
    label: en.skillsCollageSection.github,
    icon: SiGithub,
    category: 'dev-tools',
  },
  {
    id: 'cursor',
    label: en.skillsCollageSection.cursor,
    icon: MousePointer2,
    category: 'ai',
  },
  {
    id: 'vite',
    label: en.skillsCollageSection.vite,
    icon: SiVite,
    category: 'dev-tools',
  },
  {
    id: 'vercel',
    label: en.skillsCollageSection.vercel,
    icon: SiVercel,
    category: 'dev-tools',
  },
  {
    id: 'firebase',
    label: en.skillsCollageSection.firebase,
    icon: SiFirebase,
    category: 'dev-tools',
  },
  {
    id: 'android-studio',
    label: en.skillsCollageSection.androidStudio,
    icon: SiAndroidstudio,
    category: 'dev-tools',
  },
  {
    id: 'xcode',
    label: en.skillsCollageSection.xcode,
    icon: SiXcode,
    category: 'dev-tools',
  },
  {
    id: 'nx',
    label: en.skillsCollageSection.nx,
    icon: SiNx,
    category: 'dev-tools',
  },
  {
    id: 'storybook',
    label: en.skillsCollageSection.storybook,
    icon: SiStorybook,
    category: 'dev-tools',
  },

  // Testing & Code Quality
  {
    id: 'jest',
    label: en.skillsCollageSection.jest,
    icon: SiJest,
    category: 'testing',
  },
  {
    id: 'testing-library',
    label: en.skillsCollageSection.testingLibrary,
    icon: SiTestinglibrary,
    category: 'testing',
  },
  {
    id: 'playwright',
    label: en.skillsCollageSection.playwright,
    icon: Drama,
    category: 'testing',
  },
  {
    id: 'eslint',
    label: en.skillsCollageSection.eSLint,
    icon: SiEslint,
    category: 'testing',
  },
  {
    id: 'prettier',
    label: en.skillsCollageSection.prettier,
    icon: SiPrettier,
    category: 'testing',
  },

  // API & Development
  {
    id: 'rest-api',
    label: en.skillsCollageSection.restAPI,
    icon: Network,
    category: 'api',
  },
  {
    id: 'postman',
    label: en.skillsCollageSection.postman,
    icon: SiPostman,
    category: 'api',
  },

  // Project Management & Collaboration
  {
    id: 'jira',
    label: en.skillsCollageSection.jira,
    icon: SiJira,
    category: 'collaboration',
  },
  {
    id: 'slack',
    label: en.skillsCollageSection.slack,
    icon: SiSlack,
    category: 'collaboration',
  },
  {
    id: 'discord',
    label: en.skillsCollageSection.discord,
    icon: SiDiscord,
    category: 'collaboration',
  },
  {
    id: 'notion',
    label: en.skillsCollageSection.notion,
    icon: SiNotion,
    category: 'collaboration',
  },

  // Productivity Tools

  // AI Tools
  {
    id: 'github-copilot',
    label: en.skillsCollageSection.gitHubCopilot,
    icon: SiGithub,
    category: 'ai',
  },
  {
    id: 'claude',
    label: en.skillsCollageSection.claude,
    icon: SiClaude,
    category: 'ai',
  },
  {
    id: 'claude-code',
    label: en.skillsCollageSection.claudeCode,
    icon: Terminal,
    category: 'ai',
  },
  {
    id: 'codex',
    label: en.skillsCollageSection.codex,
    icon: Braces,
    category: 'ai',
  },
  {
    id: 'prompt-engineering',
    label: en.skillsCollageSection.promptEngineering,
    icon: MessageSquareCode,
    category: 'ai',
  },
  {
    id: 'context-engineering',
    label: en.skillsCollageSection.contextEngineering,
    icon: FolderTree,
    category: 'ai',
  },
  {
    id: 'chatgpt',
    label: en.skillsCollageSection.chatGPT,
    icon: SiOpenai,
    category: 'ai',
  },
  {
    id: 'gemini',
    label: en.skillsCollageSection.gemini,
    icon: SiGooglegemini,
    category: 'ai',
  },
  {
    id: 'notebooklm',
    label: en.skillsCollageSection.noteBookLM,
    icon: NotebookPen,
    category: 'ai',
  },

  // Operating Systems
  {
    id: 'macos',
    label: en.skillsCollageSection.macOS,
    icon: SiMacos,
    category: 'os',
  },
  {
    id: 'windows',
    label: en.skillsCollageSection.windows,
    icon: FaWindows,
    category: 'os',
  },

  // Methodologies
  {
    id: 'agile',
    label: en.skillsCollageSection.agile,
    icon: Sparkles,
    category: 'methodologies',
  },
];
