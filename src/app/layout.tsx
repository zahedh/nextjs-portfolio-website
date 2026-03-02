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

/** Default metadata for the public site shell. */
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
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

/**
 * Root layout for the app.
 * Wraps children with global store provider and font variables.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalStoreProvider>
      <html lang="en" className={fontClasses} suppressHydrationWarning>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                })();
              `,
            }}
          />
        </head>
        <body
          className="prime-parent bg-neutral-100 antialiased dark:bg-neutral-900"
          suppressHydrationWarning
        >
          {children}
        </body>
      </html>
    </GlobalStoreProvider>
  );
}
