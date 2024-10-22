import { Pacifico, Playfair_Display } from 'next/font/google';
import localFont from 'next/font/local';

export const pacifico = Pacifico({
  weight: '400',
  subsets: ['cyrillic'],
  display: 'swap',
});

export const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'cyrillic'], // Укажите нужные subsets
  // Если используете CSS-переменную:
  variable: '--font-playfair-display',
});

export const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
export const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
