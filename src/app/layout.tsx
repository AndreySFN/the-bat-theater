import type { Metadata } from 'next';
import localFont from 'next/font/local';

import '../globals.css';
import { Footer } from '../atoms/Footer';

import { Playfair_Display } from 'next/font/google';
import React from 'react';
import { LUNA_ART_STUDIO_TITLE } from '../consts';

const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'cyrillic'], // Укажите нужные subsets
  // Если используете CSS-переменную:
  variable: '--font-playfair-display',
});

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  'yandex-verification': '8bb2a08b2a778121',
  title: LUNA_ART_STUDIO_TITLE,
  description: 'Спектакли и тематические вечера',
  openGraph: {
    title: LUNA_ART_STUDIO_TITLE,
    description: 'Спектакли и тематические вечера',
    url: 'https://ticketwave.ru', // Замените на ваш реальный URL
    siteName: 'TicketWave',
    images: [
      {
        url: 'https://ticketwave.ru/preview.png', // Замените на URL вашего изображения
        width: 800,
        height: 600,
        alt: 'Спектакли и тематические вечера',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: LUNA_ART_STUDIO_TITLE,
    description: 'Спектакли и тематические вечера',
    images: ['https://ticketwave.ru/preview.png'], // Замените на URL вашего изображения
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://events.nethouse.ru/assets/js/popup-form.js"></script>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${playfairDisplay.className} ${geistSans.variable} ${geistMono.variable}`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
