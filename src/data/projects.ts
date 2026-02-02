export interface Project {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string[];
  skills: string[];
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Smarty Mobile App',
    company: 'Blue Beck Ltd',
    startDate: 'Mar 2023',
    endDate: 'Present',
    description: [
      '✦ A large-scale mobile application developed for SMARTY, focused on delivering a smooth and user-friendly experience for managing mobile accounts and plans.',
      '✦ Built using React Native to support both iOS and Android platforms under a shared codebase.',
      '✦ Designed for scalability and performance across a multi-company technical ecosystem.',
      '✦ Involved in continuous development, optimisation, and integration of new features aligned with SMARTY’s growing service offerings.',
      '✦ Codebase actively maintained with modern development practices, including automated testing, code review, and refactoring for long-term stability.',
      '✦ Collaboration across multiple development teams to ensure seamless integration between app, web, and backend services.',
      '✦ Research and adoption of emerging technologies, including the modern use of AI tools to improve development efficiency and workflow automation.',
    ],
    skills: [
      'react',
      'react-native',
      'typescript',
      'tailwind',
      'github-copilot',
      'figma',
      'macos',
      'agile',
      'prompt-engineering',
      'jira',
      'xcode',
      'android-studio',
      'postman',
      'slack',
      'gemini',
      'chatgpt',
      'notebooklm',
    ],
  },
  {
    id: 'project-2',
    title: 'Curtains E-Commerce Site & Stock Management Interface',
    company: 'Interlockdigital',
    startDate: 'Jun 2022',
    endDate: 'Mar 2023',
    description: [
      '✦ Revamp of a previous e-commerce site.',
      '✦ Heavily focused in back-end development.',
      "✦ Developed a programmatical bridge between the client's stock system and Oracle NetSuite.",
      '✦ Created a front-end stock management system using VB.NET.',
      '✦ Created an automated task scheduler that manages stock data and images periodically.',
      '✦ Developed a script to send emails to customers/suppliers after an order had been made. Emails were created dynamically based on XSLT templates.',
    ],
    skills: [
      'asp.net',
      'vb.net',
      'jquery',
      'xml',
      'github',
      'javascript',
      'agile',
      'jira',
      'postman',
      'mysql',
      'oracle-netsuite',
      'html',
      'css',
    ],
  },
];
