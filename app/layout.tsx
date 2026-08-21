import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';
import TanstackQueryProvider from '@/components/provider/tanstack-query-provider';
import { Toaster } from '@/components/ui/toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '망스비 - 대시보드',
  description: '망스비 관리를 위한 대시보드',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='ko'
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        inter.variable,
      )}
    >
      <body className='min-h-full flex flex-col dark'>
        <TanstackQueryProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </TanstackQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
