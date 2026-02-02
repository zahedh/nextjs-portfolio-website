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
];
