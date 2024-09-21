import React from 'react';
import {Map} from '../Map'
import Image from 'next/image'
import styles from './page.module.scss';
import { ShowtimeCard } from '../molecules/ShowtimeCard';
import { Schedule } from '../sections/Schedule';
import { getData } from '../utils';
import { DataTransferObject } from '../types';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Button } from 'antd';
import Link from 'next/link';

export interface Props {
  params: { name: string }, searchParams: unknown
}

export async function generateMetadata(
  { params: { name } }: Props
): Promise<Metadata> {

  const data: DataTransferObject | null = getData(name);
  if(!data) {
    notFound()
  }

  return {
    title: data.title,
  description: data.shortDesc,
  openGraph: {
    title: data.title,
    description: data.shortDesc,
    url: 'https://ticketwave.ru', // Замените на ваш реальный URL
    siteName: 'TicketWave',
    images: [
      {
        url: `https://ticketwave.ru/posters/${name}.png`, // Замените на URL вашего изображения
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
  }
}

export default function Page({ params }: Props) {
  const {name} = params;
  const data: DataTransferObject | null = getData(name);
  if (!data) {
    notFound();
  }
  const {desc, options, shortDesc, title, } = data!
  return (
    <>
    <Image src={`/posters/${name}.png`} alt='Афиша' width={2000} height={300} style={{position: 'absolute', zIndex: -1, 
      objectFit: 'cover', maxWidth: '100%'}}/>
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{title}</h1>
        <p>{shortDesc}</p>
        <br/>
        <Link href='/'><Button><h4>📅 ВСЕ МЕРОПРИЯТИЯ 📅</h4></Button></Link>
      </header>

        <Schedule>
          {options.map(({dateTime, nethouseLink, place}) => <ShowtimeCard key={nethouseLink} link={nethouseLink} dateTime={dateTime} place={place} />)}
        </Schedule>
          

      <section className={styles.about}>
      <h2>О событии</h2>
      {desc}
      </section>

      <section className={styles.address}>
        <h2>Адрес</h2>
        <p></p>
        <Map/>
        </section>
    </div>
    </>
  );
};
