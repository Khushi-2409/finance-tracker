import '../styles/globals.css';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Finance Tracker',
  description: 'Track your personal finances beautifully.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-sky-50 via-white to-rose-100`}>
        {children}
      </body>
    </html>
  );
}
