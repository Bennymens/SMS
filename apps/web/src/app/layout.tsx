import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { TooltipProvider } from '@/components/ui/tooltip';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'School Management System (SMS) | Next-Gen Education Platform',
  description: 'Enterprise web-based school administration, attendance, grades, and portal management.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <TooltipProvider delayDuration={0}>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
