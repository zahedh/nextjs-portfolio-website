import { getYearsOfExperience } from '@/lib/date';
import { capitalise, spellNumber } from '@/lib/utils';

/** English copy used throughout the UI. */
export const en = {
  // Navigation Labels
  home: 'Home',
  about: 'About',
  skills: 'Skills',
  projects: 'Projects',
  experience: 'Experience',
  contact: 'Contact',
  cV: 'CV',
  closeMenu: 'Close menu',
  menu: 'Menu',
  theme: 'Theme',
  initials: 'ZH',

  // Static Home Content
  sectionHeaders: {
    skillsCollage: 'What I Work Best With',
    projects: "What I've Worked On",
    about: 'A Bit About Me',
    experience: "Where I've Worked",
  },

  heroSection: {
    name: 'Zahed Heidari',
    eyebrow: 'Senior Software Engineer · Blue Beck',
    headline: `Over a million users. ${capitalise(spellNumber(getYearsOfExperience()))} years shipping.`,
    supportingText:
      'I build full stack web and mobile products, and the AI that runs inside them.',
    primaryButton: 'See the work',
    secondaryButton: 'Download CV',
    downloadCvAriaLabel: 'Download CV (PDF)',
  },

  aboutSection: {
    stickers: ['tech nerd', 'gym rat', 'wannabe vocalist'],
    narrativeParagraphs: [
      "I build web and mobile apps that people rely on every day, so I care about getting them right, not just getting them out. Building with AI agents hasn't changed that; if anything, it's made the standards matter more.",
      "I like getting better at things, whether that's code, lifting or singing. Most of it comes down to turning up consistently.",
    ],
    credentialsHeading: 'A few highlights',
    photoAlt: 'Zahed Heidari, smiling in sunglasses at a café table',
  },

  skillsSection: {
    groups: {
      languages: 'Languages',
      frameworks: 'Frameworks and libraries',
      design: 'Design',
      aiTooling: 'AI',
      toolingAndPractice: 'Tooling and practice',
    },
  },

  skillsCollageSection: {
    // Modern Web & Mobile Frameworks
    react: 'React',
    nextJS: 'Next.js',
    reactNative: 'React Native',
    nativeWind: 'NativeWind',
    shadcnUI: 'shadcn/ui',
    zustand: 'Zustand',
    tanStackQuery: 'TanStack Query',
    tanStackTable: 'TanStack Table',
    reactHookForm: 'React Hook Form',
    lottie: 'Lottie',
    nodeJS: 'Node.js',
    zod: 'Zod',

    // Core Languages
    typeScript: 'TypeScript',
    javaScript: 'JavaScript',
    php: 'PHP',
    wordPress: 'WordPress',
    jQuery: 'jQuery',

    // Microsoft Stack
    dotNet: '.NET',

    // Legacy/Additional Languages
    xslt: 'XSLT',

    // Web Fundamentals
    html: 'HTML5',
    css: 'CSS3',

    // Styling & Design
    tailwind: 'Tailwind CSS',
    figma: 'Figma',
    framer: 'Framer',

    // Database
    mySQL: 'MySQL',

    // Development Tools & IDEs
    github: 'GitHub',
    cursor: 'Cursor',
    vercel: 'Vercel',
    firebase: 'Firebase',
    androidStudio: 'Android Studio',
    xcode: 'Xcode',
    nx: 'Nx',
    storybook: 'Storybook',

    // Testing & Code Quality
    jest: 'Jest',
    testingLibrary: 'React Testing Library',
    playwright: 'Playwright',
    vite: 'Vite',
    eSLint: 'ESLint',
    prettier: 'Prettier',

    // API & Development
    restAPI: 'REST API',
    postman: 'Postman',
    netSuite: 'Oracle NetSuite',

    // Project Management & Collaboration
    jira: 'Jira',
    slack: 'Slack',
    discord: 'Discord',
    notion: 'Notion',

    // Productivity Tools

    // AI Tools
    gitHubCopilot: 'GH Copilot',
    claude: 'Claude',
    claudeCode: 'Claude Code',
    codex: 'Codex',
    chatGPT: 'ChatGPT',
    gemini: 'Gemini',
    noteBookLM: 'NotebookLM',
    promptEngineering: 'Prompt Engineering',
    contextEngineering: 'Context Engineering',

    // Operating Systems
    macOS: 'macOS',
    windows: 'Windows',

    // Methodologies
    agile: 'Agile Methodologies',
  },

  footerSection: {
    heading: 'Building something ambitious?',
    supportingText:
      "I design and build web and mobile apps, and help teams work well with AI. Tell me what you're working on.",
    copyLabel: 'Copy email address',
    copiedLabel: 'Copied',
    downloadCVLabel: 'Download CV',
    socialLinksAriaLabel: 'Social profiles',
    linkedInLabel: 'LinkedIn',
    gitHubLabel: 'GitHub',
    sessionizeLabel: 'Sessionize',
    copyrightText: `© ${new Date().getFullYear()} Zahed Heidari`,
    privacyLinkLabel: 'Privacy',
    email: 'zahed.heidari2@gmail.com',
  },

  themeToggle: 'Toggle light or dark mode',

  contributionsSection: {
    loading: 'Loading contributions…',
    error: 'Unable to load contribution data. Please try again later.',
  },

  contributionsCalendar: {
    label: 'Contributions',
    less: 'Less',
    more: 'More',
    totalCountYear: '{{count}} contributions in {{year}}',
    contributions: 'contributions',
    contributionsSingular: 'contribution',
    noContributions: 'No contributions',
    scrollEarlier: 'Scroll to earlier weeks',
    scrollLater: 'Scroll to later weeks',
  },

  projectFilters: {
    all: 'All',
    mobile: 'Mobile',
    web: 'Web',
    ai: 'AI',
  },

  projectCard: {
    viewProject: 'View project',
    seeAllProjects: 'See all {{count}} projects',
    showFewerProjects: 'Show fewer',
    noProjectsInCategory: 'Nothing to show here yet.',
  },

  projectDisplay: {
    statusActive: 'Active',
    statusCompleted: 'Completed',
    platformWeb: 'Web',
    platformMobile: 'Mobile',
    timelineLabel: 'Timeline',
    platformLabel: 'Platform',
    contextLabel: 'Context',
    statusLabel: 'Status',
    sectionOverview: 'Overview',
    accessLabel: 'Access',
    visitLive: 'Visit site',
    viewRepo: 'View repo',
    moreSkills: '+{{count}} more',
    backToProjects: 'All projects',
    sectionBuiltWith: 'Built with',
    nextProjectLabel: 'Next project',
    previousProjectLabel: 'Previous project',
  },

  /** Keyed by ProjectAccess so a new state cannot be added without its copy. */
  projectAccess: {
    'Open source': 'Open source',
    Public: 'Public',
    Private: 'Private',
  },

  jobDisplay: {
    statusCurrent: 'Current',
    stackLabel: 'Built with',
    showDetails: 'Show details',
    hideDetails: 'Hide details',
  },

  projectDetailPanel: {
    closeLabel: 'Close project details',
  },

  notFound: {
    heading: 'Page not found',
    description: "This page doesn't exist.",
    returnHome: 'Return home',
    code: '404',
  },

  privacyPage: {
    title: 'Privacy Policy',
    lastUpdatedLabel: 'Last updated:',
    // Revise only when the policy's substance changes, never on a redesign.
    lastUpdated: '24 October 2026',
    intro:
      'This site (zahedheidari.co.uk) is a personal portfolio. Below is how we handle information when you visit.',
    sectionInfoWeCollect: 'Information we collect',
    infoWeCollectIntro:
      'We do not collect personal data through forms or accounts. The only data stored in your browser is:',
    themePreferenceLabel: 'Theme preference',
    themePreferenceDetail:
      'The site opens in dark mode. If you switch themes, your choice is saved in your browser (localStorage) so it persists between visits. This is not sent to any server.',
    sectionHowWeUse: 'How we use it',
    howWeUseText:
      'Theme preference is used only to display the site in your preferred appearance. We do not use it for analytics or advertising.',
    sectionThirdParty: 'Third-party services',
    thirdPartyIntro:
      "This site is hosted on Vercel. When you load a page, Vercel may process requests (e.g. IP address, basic request data) as part of providing the service. We use Vercel Analytics and Speed Insights to measure site usage and performance. Contribution data shown on the site is fetched from GitHub's API; that request is made server-side and does not send your personal data to GitHub.",
    thirdPartyFuture:
      'Vercel Analytics and Speed Insights collect anonymised, aggregated data such as page views, URLs, country, device type, and Web Vitals (e.g. load times). No cookies are used and data is not tied to individual visitors. For more details, see ',
    thirdPartyVercelLinkLabel: "Vercel's privacy policy",
    thirdPartyVercelLinkUrl: 'https://vercel.com/legal/privacy-policy',
    sectionYourRights: 'Your rights',
    yourRightsText:
      "You can clear the theme preference at any time by clearing your browser's local storage for this site. If you are in the UK or EU, you have rights under applicable data protection laws (e.g. access, correction, deletion). To exercise them, contact us using the email in the footer.",
    sectionChanges: 'Changes',
    changesText:
      'We may update this page occasionally. The "Last updated" date at the top will be revised when we do.',
    contactIntro:
      'If you have questions about this privacy policy, you can reach out at',
    contactEmail: 'zahed.heidari2@gmail.com',
  },
};
