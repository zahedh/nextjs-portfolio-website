import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiJquery,
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
  SiGoogledocs,
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
  SiLibreofficewriter,
  SiVercel,
  SiFirebase,
  SiPhp,
  SiWordpress,
  SiFramer,
  SiClaude,
  SiNx,
  SiStorybook,
} from 'react-icons/si';
import { FaWindows } from 'react-icons/fa';
import {
  Activity,
  BarChart2,
  Bot,
  Code2,
  Lightbulb,
  MousePointer2,
  Network,
  Sparkles,
  Terminal,
  WandSparkles,
} from 'lucide-react';
import { en } from '@/language';
import type { IconType } from 'react-icons';
import type { LucideIcon } from 'lucide-react';

export interface Skill {
  id: string;
  label: string;
  icon: IconType | LucideIcon;
  category: SkillCategory;
}

export type SkillCategory =
  | 'frameworks'
  | 'languages'
  | 'microsoft'
  | 'legacy'
  | 'web-fundamentals'
  | 'design'
  | 'database'
  | 'dev-tools'
  | 'testing'
  | 'api'
  | 'collaboration'
  | 'productivity'
  | 'ai'
  | 'os'
  | 'methodologies';

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
    id: 'React Native',
    label: en.skillsCollageSection.reactNative,
    icon: SiReact,
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
  {
    id: 'php',
    label: en.skillsCollageSection.php,
    icon: SiPhp,
    category: 'languages',
  },

  // Microsoft Stack
  {
    id: 'dotnet',
    label: en.skillsCollageSection.dotNet,
    icon: SiDotnet,
    category: 'microsoft',
  },
  {
    id: 'aspnet',
    label: en.skillsCollageSection.aspNet,
    icon: SiDotnet,
    category: 'microsoft',
  },
  {
    id: 'vb-net',
    label: en.skillsCollageSection.visualBasicDotNet,
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
  {
    id: 'jquery',
    label: en.skillsCollageSection.jquery,
    icon: SiJquery,
    category: 'legacy',
  },
  {
    id: 'wordpress',
    label: en.skillsCollageSection.wordpress,
    icon: SiWordpress,
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
  {
    id: 'amp',
    label: en.skillsCollageSection.amp,
    icon: Code2,
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
    category: 'dev-tools',
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
    id: 'vercel-analytics',
    label: en.skillsCollageSection.vercelAnalytics,
    icon: BarChart2,
    category: 'dev-tools',
  },
  {
    id: 'speed-insights',
    label: en.skillsCollageSection.speedInsights,
    icon: Activity,
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
  {
    id: 'microsoft-office',
    label: en.skillsCollageSection.microsoftOffice,
    icon: SiLibreofficewriter,
    category: 'productivity',
  },
  {
    id: 'google-docs',
    label: en.skillsCollageSection.googleDocs,
    icon: SiGoogledocs,
    category: 'productivity',
  },

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
    icon: SiGooglegemini,
    category: 'ai',
  },
  {
    id: 'prompt-engineering',
    label: en.skillsCollageSection.promptEngineering,
    icon: Lightbulb,
    category: 'ai',
  },
  {
    id: 'generative-ai',
    label: en.skillsCollageSection.generativeAI,
    icon: WandSparkles,
    category: 'ai',
  },
  {
    id: 'agentic-ai',
    label: en.skillsCollageSection.agenticAI,
    icon: Bot,
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
