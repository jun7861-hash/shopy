import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Providers from '@/components/providers';
import './reset.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shopy',
  description: 'Generated by create next app',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;