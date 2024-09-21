import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "./Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'Арт-студия "Луна"',
  description: 'Спектакли и тематические вечера',
  openGraph: {
    title: 'Арт-студия "Луна',
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
    title: 'Арт-студия "Луна"',
    description: 'Спектакли и тематические вечера',
    images: ['https://ticketwave.ru/preview.png'], // Замените на URL вашего изображения
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <link rel="icon" href="favicon.svg" type="image/svg+xml" />
    </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Footer/>
      </body>
  
    </html>
  );
}
