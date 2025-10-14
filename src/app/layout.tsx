import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { GlobalStoreProvider } from '@/providers/global-store-provider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next.js Portfolio Website for Zahed Heidari',
  description:
    "A portfolio website built with Next.js showcasing Zahed Heidari's projects and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalStoreProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </GlobalStoreProvider>
  );
}
