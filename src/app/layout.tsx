import type { Metadata } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/contexts/ThemeContext';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Elluminate Capital',
  description: 'Professional Investment Banking Services',
  keywords: 'investment banking, financial services, capital markets, advisory',
  authors: [{ name: 'Elluminate Capital' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Elluminate Capital',
    description: 'Professional Investment Banking Services',
    type: 'website',
    locale: 'en_US',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}
        style={{
          fontFamily: 'var(--font-family-primary)',
        }}
      >
        <ThemeProvider>
          <SmoothScrollProvider>
            <div
              style={{
                minHeight: '100vh',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                transition: 'background-color var(--transition-normal), color var(--transition-normal)',
              }}
            >
              {/* Navigation */}
              <Navbar />
              
              {/* Main Content */}
              <main>{children}</main>
              
              {/* Footer */}
              <Footer />
            </div>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}