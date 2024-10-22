import type { Metadata } from 'next';

import '../globals.css';
import { Footer } from '../atoms/Footer';

import React from 'react';
import { LUNA_ART_STUDIO_TITLE } from '../consts';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { pacifico, geistSans, geistMono, playfairDisplay } from './fonts';
import path from 'path';
import fs from 'fs';
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
  const privacyPolicy = fs.readFileSync(
    path.join(process.cwd(), 'PrivacyPolicy.md'),
    'utf-8'
  );
  const userAgreement = fs.readFileSync(
    path.join(process.cwd(), 'UserAgreement.md'),
    'utf-8'
  );
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        style={playfairDisplay.style}
        className={`${pacifico.className} ${geistSans.style} ${geistMono.variable}`}
      >
        <AntdRegistry>{children}</AntdRegistry>
        <Footer userAgreement={userAgreement} privatePolicy={privacyPolicy} />
      </body>
    </html>
  );
}
