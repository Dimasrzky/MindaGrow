import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/style/globals.css';

// Initialize Inter font with Latin subset
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
});

// Define metadata for the app
export const metadata: Metadata = {
  title: 'MindaGrow - Platform Pendidikan Anak Personalisasi',
  description: 'Platform pendidikan digital personalisasi yang memadukan gamifikasi dengan analisis perkembangan kognitif untuk menciptakan pengalaman belajar yang optimal bagi setiap anak.',
  keywords: 'pendidikan, anak, personalisasi, gamifikasi, kognitif, pembelajaran',
  authors: [{ name: 'MindaGrow Team' }],
  robots: 'index, follow',
  icons: {
    icon: '/favicon.ico',
  },
};

// Separate viewport metadata (sesuai peringatan Next.js)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* Common UI elements can go here if needed */}
        <main>{children}</main>
      </body>
    </html>
  );
}