import type { Metadata } from 'next';
import { Inter, IBM_Plex_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { GlobalStoreProvider } from '@/providers/global-store-provider';
import '../styles/index.css';

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
  title: 'Zahed Heidari',
  description:
    "A portfolio website built with Next.js showcasing Zahed Heidari's professional experience, projects, and skills in web and mobile development.",
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
  metadataBase: new URL('https://zahedheidari.co.uk'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://zahedheidari.co.uk',
    siteName: 'Zahed Heidari',
    title: 'Zahed Heidari - Web & Mobile Developer',
    description:
      "A portfolio website built with Next.js showcasing Zahed Heidari's professional experience, projects, and skills in web and mobile development.",
    images: [
      {
        url: '/images/og-image.png',
        width: 1024,
        height: 682,
        alt: 'Zahed Heidari - Web & Mobile Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zahed Heidari - Web & Mobile Developer',
    description:
      "A portfolio website built with Next.js showcasing Zahed Heidari's professional experience, projects, and skills in web and mobile development.",
    images: [
      {
        url: '/images/twitter-image.png',
        width: 1024,
        height: 682,
        alt: 'Zahed Heidari - Web & Mobile Developer',
      },
    ],
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
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </GlobalStoreProvider>
  );
}
