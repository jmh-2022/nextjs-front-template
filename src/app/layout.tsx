import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { Roboto } from 'next/font/google';

const Pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  openGraph: {
    title: 'Create Next App',
    description: 'Generated by create next app',
    url: 'https://example.com',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 800,
        height: 600,
        alt: 'Og Image Alt',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Next App',
    description: 'Generated by create next app',
    images: ['https://example.com/twitter-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={'ko'}>
      <body
        className={`${Pretendard.variable} ${roboto.variable} antialiased flex flex-col overflow-y-auto container mx-auto h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
