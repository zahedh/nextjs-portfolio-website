import type { Metadata } from 'next';
import { Inter, IBM_Plex_Sans } from 'next/font/google';

import { GlobalStoreProvider } from '@/providers/global-store-provider';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
});

const fontClasses = `${inter.variable} ${ibmPlexSans.variable}`;

export const metadata: Metadata = {
  title: 'Next.js Portfolio Website for Zahed Heidari',
  description:
    "A portfolio website built with Next.js showcasing Zahed Heidari's projects and skills.",
  authors: [{ name: 'Zahed Heidari' }],
  keywords: [
    'Zahed Heidari',
    'Next.js Portfolio',
    'Frontend Developer',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Web Development',
    'Projects',
    'Skills',
    'Resume',
    'Contact',
    'AI',
  ],
  metadataBase: new URL('https://yourdomain.com'),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalStoreProvider>
      <html lang="en" className={fontClasses}>
        <body className="prime-parent bg-neutral-100 antialiased dark:bg-neutral-900">
          {children}
        </body>
      </html>
    </GlobalStoreProvider>
  );
}
