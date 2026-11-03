import type { Metadata } from 'next';
import {
  Bricolage_Grotesque,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Inter,
} from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { en } from '@/language';
import { SITE_URL, socialShareImageMeta } from '@/lib/meta';
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

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

// Display face for the few places the artboards draw one: the hero headline and
// standalone figures. Section headings stay on the heading face.
const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-bricolage-grotesque',
  display: 'swap',
});

const fontClasses = `${inter.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} ${bricolageGrotesque.variable}`;

/** Default metadata for the public site shell. */
export const metadata: Metadata = {
  title: en.siteMetadata.name,
  description: en.siteMetadata.description,
  authors: [{ name: en.siteMetadata.name }],
  keywords: en.siteMetadata.keywords,
  metadataBase: new URL(SITE_URL),
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
    url: SITE_URL,
    siteName: en.siteMetadata.name,
    title: en.siteMetadata.title,
    description: en.siteMetadata.description,
    images: [socialShareImageMeta],
  },
  twitter: {
    card: 'summary_large_image',
    title: en.siteMetadata.title,
    description: en.siteMetadata.description,
    images: [socialShareImageMeta],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

/** Root layout: the document shell, font variables, and pre-paint theme. */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontClasses} overflow-x-clip`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                (function() {
                  // Dark unless the visitor chose light. Storage can throw in a
                  // private window, which still means dark.
                  let theme = null;
                  try { theme = localStorage.getItem('theme'); } catch (e) {}
                  if (theme !== 'light') document.documentElement.classList.add('dark');
                })();
              `,
          }}
        />
      </head>
      <body
        className="overflow-x-clip bg-neutral-100 antialiased dark:bg-neutral-900"
        suppressHydrationWarning
      >
        {children}
        {/* Only on Vercel: script URLs 404 on localhost and break the console */}
        {process.env.VERCEL === '1' ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  );
}
