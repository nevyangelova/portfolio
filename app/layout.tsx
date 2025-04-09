import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'My professional portfolio showcasing my work and skills',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
} 