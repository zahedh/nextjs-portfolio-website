/** English copy used throughout the UI. */
export const en = {
  // Navigation Labels
  home: 'Home',
  about: 'About',
  skills: 'Skills',
  projects: 'Projects',
  experience: 'Experience',
  activity: 'Activity',
  contact: 'Contact',
  cV: 'CV',

  // Static Home Content
  sectionHeaders: {
    skillsCollage: 'What I Work Best With',
    projects: "What I've Worked On",
    about: 'A Bit About Me',
    experience: "Where I've Worked",
    contributionsSection: 'My GitHub Activity',
  },

  heroSection: {
    header: "Hi, I'm Zahed!",
    subHeaderPartOne: "I'm a...",
    subHeaderPartTwo: 'Web & Mobile Developer',
    supportingText:
      'I design and build digital products across web and mobile, using robust engineering, thoughtful design, and modern AI integrations.',
  },

  aboutSection: {
    /** Used for `aria-label` on the stats panel (no visible heading). */
    highlightsHeading: 'Quick snapshot',
    tagline: 'Tech loving, gym obsessed problem solver',
    introParagraph:
      'I care about building things properly — with clarity, longevity, and enough polish to feel intentional.',
    whatDrivesMeHeading: 'What drives me',
    whatDrivesMeText:
      "I thrive on solving real-world problems and constantly learning. Whether it's full stack development or AI integrations, I enjoy staying at the edge of tech and using it to create meaningful impact.",
    beyondCodingHeading: 'Beyond coding',
    beyondCodingIntro: "Outside of work, you'll find me:",
    beyondCodingItems: [
      'Lifting in the gym — staying focused and energised.',
      'Making music — always exploring new sounds.',
      'Diving into games, design, and tech — driven by curiosity.',
    ],
    levellingUpHeading: 'Levelling up in life',
    levellingUpText:
      'For me, growth means pushing past comfort zones — whether through better products, tougher workouts, or bold new ideas. Progress comes from curiosity, consistency, and showing up.',
    statCards: {
      yearsExperienceLabel: 'Years Experience',
      enterpriseClientsLabel: 'Enterprise Clients',
      enterpriseClientsValue: '2+',
      usersReachedLabel: 'Users Reached',
      usersReachedValue: '500K+',
      appsPublishedLabel: 'Apps Published',
      appsPublishedValue: 'iOS & Android',
      aiWorkflowsLabel: 'Workflows',
      aiWorkflowsValue: 'AI-Integrated',
      degreeLabel: 'Degree',
      degreeValue: '1st Class',
    },
  },

  skillsCollageSection: {
    // Modern Web & Mobile Frameworks
    react: 'React',
    nextJS: 'Next.js',
    reactNative: 'React Native',

    // Core Languages
    typeScript: 'TypeScript',
    javaScript: 'JavaScript',
    php: 'PHP',

    // Microsoft Stack
    dotNet: '.NET',
    aspNet: 'ASP.NET',
    visualBasicDotNet: 'Visual Basic .NET',

    // Legacy/Additional Languages
    objectiveC: 'Objective-C',
    jquery: 'jQuery',
    wordpress: 'WordPress',

    // Web Fundamentals
    html: 'HTML5',
    css: 'CSS3',
    amp: 'AMP',

    // Styling & Design
    tailwind: 'Tailwind CSS',
    figma: 'Figma',

    // Database
    mySQL: 'MySQL',

    // Development Tools & IDEs
    github: 'GitHub',
    cursor: 'Cursor',
    vercel: 'Vercel',
    vercelAnalytics: 'Vercel Analytics',
    speedInsights: 'Speed Insights',
    firebase: 'Firebase',
    androidStudio: 'Android Studio',
    xcode: 'Xcode',

    // Testing & Code Quality
    jest: 'Jest',
    vite: 'Vite',
    eSLint: 'ESLint',
    prettier: 'Prettier',

    // API & Development
    restAPI: 'REST API',
    postman: 'Postman',

    // Project Management & Collaboration
    jira: 'Jira',
    slack: 'Slack',
    discord: 'Discord',
    notion: 'Notion',

    // Productivity Tools
    microsoftOffice: 'Microsoft Office',
    googleDocs: 'Google Docs',

    // AI Tools
    gitHubCopilot: 'GH Copilot',
    chatGPT: 'ChatGPT',
    gemini: 'Gemini',
    noteBookLM: 'NotebookLM',
    promptEngineering: 'Prompt Engineering',
    generativeAI: 'Generative AI',
    agenticAI: 'Agentic AI',

    // Operating Systems
    macOS: 'macOS',
    windows: 'Windows',

    // Methodologies
    agile: 'Agile Methodologies',
  },

  projectsSection: {
    backToProjectsLabel: 'Back to Projects',
    designedToLabel: 'Designed to ',
    summaryHeader: 'Summary',
    technologiesHeader: 'Technologies',
    coreDevelopmentSubheader: 'Core Development',
    stylingSubheader: 'Styling & UI',
    toolsSubheader: 'Tools & Workflow',
    backendSubheader: 'Backend & APIs',
    lessonsLearnedHeader: 'Lessons Learned',
  },

  footerSection: {
    catchPhraseHeader: 'Zahed Heidari - Web & Mobile Developer',
    catchPhraseSubheader:
      'Blending design, development, and AI into cohesive systems.',
    catchPhraseSupportingTextPart1: 'Building something ambitious? ',
    catchPhraseSupportingTextPart2: "Let's build it properly.",
    contactHeader: 'Talk',
    talkButtonLabel: 'Talk',
    meetButtonLabel: 'Meet',
    connectHeader: 'Connect',
    copyrightText: `© ${new Date().getFullYear()} Zahed Heidari. All rights reserved.`,
    privacyLinkLabel: 'Privacy',
    ariaDownloadCV: 'Download CV',
    ariaSendEmail: 'Send email to Zahed',
    ariaLinkedIn: 'LinkedIn profile',
    ariaGitHub: 'GitHub profile',
    ariaSessionize: 'Sessionize profile',
  },

  themeToggle: 'Toggle light or dark mode',

  contributionsSection: {
    loading: 'Loading contributions...',
    error: 'Unable to load contribution data. Please try again later.',
  },

  contributionsCalendar: {
    totalCount: '{{count}} contributions in the last year',
    totalCountYear: '{{count}} contributions in {{year}}',
    contributions: 'contributions',
    contributionsSingular: 'contribution',
    noContributions: 'No contributions',
  },

  projectFilters: {
    all: 'All',
    mobile: 'Mobile',
    web: 'Web',
    clearSkillFilter: 'All skills',
  },

  projectCard: {
    titleLinkAria: 'Opens in a new tab',
    fullCaseStudy: 'Full case study',
    viewProject: 'View project',
    viewProjectArrow: '→',
  },

  projectDisplay: {
    statusActive: 'Active',
    statusCompleted: 'Completed',
    platformWeb: 'Web',
    platformMobile: 'Mobile',
    timelineLabel: 'Timeline',
    platformLabel: 'Platform',
    contextLabel: 'Organisation',
    personalTag: 'Personal',
    statusLabel: 'Status',
    sectionOverview: 'Overview',
    sectionFeatures: 'Full description',
    sectionTechStack: 'Tech stack',
    sectionLinks: 'Links',
    sectionMetadata: 'Details',
    visitLive: 'Visit live site',
    keyFeaturesSummary: 'Full description',
    techStackSummary: 'Technologies',
    moreSkills: '+{{count}} more',
  },

  projectDetailPanel: {
    closeLabel: 'Close project details',
  },

  notFound: {
    heading: 'Page Not Found',
    description: "Oops! The page you're looking for doesn't exist.",
    returnHome: 'Return Home',
    code: '404',
  },

  privacyPage: {
    title: 'Privacy Policy',
    lastUpdatedLabel: 'Last updated:',
    intro:
      'This site (zahedheidari.co.uk) is a personal portfolio. Below is how we handle information when you visit.',
    sectionInfoWeCollect: 'Information we collect',
    infoWeCollectIntro:
      'We do not collect personal data through forms or accounts. The only data stored in your browser is:',
    themePreferenceLabel: 'Theme preference',
    themePreferenceDetail:
      'On first visit we follow your operating system preference (light or dark). Your manual choice is saved in your browser (localStorage) so it persists between visits. This is not sent to any server.',
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
