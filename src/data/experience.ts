export interface JobExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  skills: string[];
}

export const jobExperiences: JobExperience[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Developer',
    company: 'Tech Company',
    location: 'San Francisco, CA',
    startDate: '2023',
    endDate: '2024',
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis nisi rutrum. Donec hendrerit, diam vitae scelerisque aliquam, nisl ante pulvinar massa, sit amet aliquet velit turpis vitae odio. Integer maximus mattis enim eu elementum.',
      'Duis luctus enim quis tempor volutpat. Duis est nunc, placerat at facilisis ut, posuere eget mauris. Aenean aliquam velit non dui consectetur pharetra.',
      'Duis luctus enim quis tempor volutpat. Duis est nunc, placerat at facilisis ut, posuere eget mauris. Aenean aliquam velit non dui consectetur pharetra.',
    ],
    skills: ['react', 'nextjs', 'typescript', 'tailwindcss'],
  },
  {
    id: 'job-2',
    title: 'Frontend Developer',
    company: 'Startup Inc',
    location: 'Remote',
    startDate: '2021',
    endDate: '2023',
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis nisi rutrum. Donec hendrerit, diam vitae scelerisque aliquam, nisl ante pulvinar massa, sit amet aliquet velit turpis vitae odio. Integer maximus mattis enim eu elementum.',
      'Duis luctus enim quis tempor volutpat. Duis est nunc, placerat at facilisis ut, posuere eget mauris. Aenean aliquam velit non dui consectetur pharetra.',
      'Duis luctus enim quis tempor volutpat. Duis est nunc, placerat at facilisis ut, posuere eget mauris. Aenean aliquam velit non dui consectetur pharetra.',
    ],
    skills: ['react', 'javascript', 'css3', 'figma'],
  },
  {
    id: 'job-3',
    title: 'Junior Web Developer',
    company: 'Agency Co',
    location: 'New York, NY',
    startDate: '2019',
    endDate: '2021',
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis nisi rutrum. Donec hendrerit, diam vitae scelerisque aliquam, nisl ante pulvinar massa, sit amet aliquet velit turpis vitae odio. Integer maximus mattis enim eu elementum.',
      'Duis luctus enim quis tempor volutpat. Duis est nunc, placerat at facilisis ut, posuere eget mauris. Aenean aliquam velit non dui consectetur pharetra.',
    ],
    skills: ['javascript', 'html5', 'css3', 'jquery'],
  },
];
