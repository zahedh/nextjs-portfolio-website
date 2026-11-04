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
  SiOracle,
  SiXml,
  SiPhp,
  SiWordpress,
  SiJquery,
} from 'react-icons/si';
import { FaWindows } from 'react-icons/fa';
import {
  Braces,
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
    label: en.skillLabels.react,
    icon: SiReact,
    category: 'frameworks',
  },
  {
    id: 'nextjs',
    label: en.skillLabels.nextJS,
    icon: SiNextdotjs,
    category: 'frameworks',
  },
  {
    id: 'react-native',
    label: en.skillLabels.reactNative,
    icon: SiReact,
    category: 'frameworks',
  },
  {
    id: 'nativewind',
    label: en.skillLabels.nativeWind,
    icon: SiTailwindcss,
    category: 'frameworks',
  },
  {
    id: 'shadcn-ui',
    label: en.skillLabels.shadcnUI,
    icon: SiShadcnui,
    category: 'frameworks',
  },
  {
    id: 'zustand',
    label: en.skillLabels.zustand,
    icon: Layers,
    category: 'frameworks',
  },
  {
    id: 'tanstack-query',
    label: en.skillLabels.tanStackQuery,
    icon: SiReactquery,
    category: 'frameworks',
  },
  {
    id: 'tanstack-table',
    label: en.skillLabels.tanStackTable,
    icon: SiReacttable,
    category: 'frameworks',
  },
  {
    id: 'react-hook-form',
    label: en.skillLabels.reactHookForm,
    icon: SiReacthookform,
    category: 'frameworks',
  },
  {
    id: 'lottie',
    label: en.skillLabels.lottie,
    icon: Film,
    category: 'frameworks',
  },
  {
    id: 'nodejs',
    label: en.skillLabels.nodeJS,
    icon: SiNodedotjs,
    category: 'frameworks',
  },
  {
    id: 'zod',
    label: en.skillLabels.zod,
    icon: SiZod,
    category: 'frameworks',
  },

  // Core Languages
  {
    id: 'typescript',
    label: en.skillLabels.typeScript,
    icon: SiTypescript,
    category: 'languages',
  },
  {
    id: 'javascript',
    label: en.skillLabels.javaScript,
    icon: SiJavascript,
    category: 'languages',
  },
  {
    id: 'php',
    label: en.skillLabels.php,
    icon: SiPhp,
    category: 'languages',
  },
  {
    id: 'wordpress',
    label: en.skillLabels.wordPress,
    icon: SiWordpress,
    category: 'frameworks',
  },
  {
    id: 'jquery',
    label: en.skillLabels.jQuery,
    icon: SiJquery,
    category: 'frameworks',
  },

  // Microsoft Stack
  {
    id: 'dotnet',
    label: en.skillLabels.dotNet,
    icon: SiDotnet,
    category: 'microsoft',
  },

  // Legacy/Additional Languages
  {
    id: 'xslt',
    label: en.skillLabels.xslt,
    icon: SiXml,
    category: 'legacy',
  },

  // Web Fundamentals
  {
    id: 'html',
    label: en.skillLabels.html,
    icon: SiHtml5,
    category: 'web-fundamentals',
  },
  {
    id: 'css',
    label: en.skillLabels.css,
    icon: SiCss3,
    category: 'web-fundamentals',
  },

  // Styling & Design
  {
    id: 'tailwind',
    label: en.skillLabels.tailwind,
    icon: SiTailwindcss,
    category: 'design',
  },
  {
    id: 'figma',
    label: en.skillLabels.figma,
    icon: SiFigma,
    category: 'design',
  },
  {
    id: 'framer',
    label: en.skillLabels.framer,
    icon: SiFramer,
    category: 'design',
  },

  // Database
  {
    id: 'mysql',
    label: en.skillLabels.mySQL,
    icon: SiMysql,
    category: 'database',
  },

  // Development Tools & IDEs
  {
    id: 'github',
    label: en.skillLabels.github,
    icon: SiGithub,
    category: 'dev-tools',
  },
  {
    id: 'cursor',
    label: en.skillLabels.cursor,
    icon: MousePointer2,
    category: 'ai',
  },
  {
    id: 'vite',
    label: en.skillLabels.vite,
    icon: SiVite,
    category: 'dev-tools',
  },
  {
    id: 'vercel',
    label: en.skillLabels.vercel,
    icon: SiVercel,
    category: 'dev-tools',
  },
  {
    id: 'firebase',
    label: en.skillLabels.firebase,
    icon: SiFirebase,
    category: 'dev-tools',
  },
  {
    id: 'android-studio',
    label: en.skillLabels.androidStudio,
    icon: SiAndroidstudio,
    category: 'dev-tools',
  },
  {
    id: 'xcode',
    label: en.skillLabels.xcode,
    icon: SiXcode,
    category: 'dev-tools',
  },
  {
    id: 'nx',
    label: en.skillLabels.nx,
    icon: SiNx,
    category: 'dev-tools',
  },
  {
    id: 'storybook',
    label: en.skillLabels.storybook,
    icon: SiStorybook,
    category: 'dev-tools',
  },

  // Testing & Code Quality
  {
    id: 'jest',
    label: en.skillLabels.jest,
    icon: SiJest,
    category: 'testing',
  },
  {
    id: 'testing-library',
    label: en.skillLabels.testingLibrary,
    icon: SiTestinglibrary,
    category: 'testing',
  },
  {
    id: 'playwright',
    label: en.skillLabels.playwright,
    icon: Drama,
    category: 'testing',
  },
  {
    id: 'eslint',
    label: en.skillLabels.eSLint,
    icon: SiEslint,
    category: 'testing',
  },
  {
    id: 'prettier',
    label: en.skillLabels.prettier,
    icon: SiPrettier,
    category: 'testing',
  },

  // API & Development
  {
    id: 'rest-api',
    label: en.skillLabels.restAPI,
    icon: Network,
    category: 'api',
  },
  {
    id: 'postman',
    label: en.skillLabels.postman,
    icon: SiPostman,
    category: 'api',
  },
  {
    id: 'netsuite',
    label: en.skillLabels.netSuite,
    icon: SiOracle,
    category: 'api',
  },

  // Project Management & Collaboration
  {
    id: 'jira',
    label: en.skillLabels.jira,
    icon: SiJira,
    category: 'collaboration',
  },
  {
    id: 'slack',
    label: en.skillLabels.slack,
    icon: SiSlack,
    category: 'collaboration',
  },
  {
    id: 'discord',
    label: en.skillLabels.discord,
    icon: SiDiscord,
    category: 'collaboration',
  },
  {
    id: 'notion',
    label: en.skillLabels.notion,
    icon: SiNotion,
    category: 'collaboration',
  },

  // AI Tools
  {
    id: 'github-copilot',
    label: en.skillLabels.gitHubCopilot,
    icon: SiGithub,
    category: 'ai',
  },
  {
    id: 'claude',
    label: en.skillLabels.claude,
    icon: SiClaude,
    category: 'ai',
  },
  {
    id: 'claude-code',
    label: en.skillLabels.claudeCode,
    icon: Terminal,
    category: 'ai',
  },
  {
    id: 'codex',
    label: en.skillLabels.codex,
    icon: Braces,
    category: 'ai',
  },
  {
    id: 'prompt-engineering',
    label: en.skillLabels.promptEngineering,
    icon: MessageSquareCode,
    category: 'ai',
  },
  {
    id: 'context-engineering',
    label: en.skillLabels.contextEngineering,
    icon: FolderTree,
    category: 'ai',
  },
  {
    id: 'chatgpt',
    label: en.skillLabels.chatGPT,
    icon: SiOpenai,
    category: 'ai',
  },
  {
    id: 'gemini',
    label: en.skillLabels.gemini,
    icon: SiGooglegemini,
    category: 'ai',
  },
  {
    id: 'notebooklm',
    label: en.skillLabels.noteBookLM,
    icon: NotebookPen,
    category: 'ai',
  },

  // Operating Systems
  {
    id: 'macos',
    label: en.skillLabels.macOS,
    icon: SiMacos,
    category: 'os',
  },
  {
    id: 'windows',
    label: en.skillLabels.windows,
    icon: FaWindows,
    category: 'os',
  },

  // Methodologies
  {
    id: 'agile',
    label: en.skillLabels.agile,
    icon: Sparkles,
    category: 'methodologies',
  },
];
