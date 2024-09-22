import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from 'antd';
import { getAllData, getData } from '../utils';
import { DataTransferObject } from '../types';
import { Schedule } from '../sections/Schedule';
import { ShowtimeCard } from '../molecules/ShowtimeCard';
import styles from './EventPage.module.scss';
import { AddressSection } from '../sections/AddressSection';
import { EventAboutSection } from '../sections/EventAboutSection';
import { AnnounceSection } from '../sections/AnnounceSection';
import { omit } from 'lodash'
interface Props {
  params: { name: string };
}

export async function generateMetadata({ params: { name } }: Props): Promise<Metadata> {
  const data: DataTransferObject | null = await getData(name);

  if (!data) {
    notFound();
  }

  return {
    title: data.title,
    description: data.shortDesc,
    openGraph: {
      title: data.title,
      description: data.shortDesc,
      url: 'https://ticketwave.ru',
      siteName: 'TicketWave',
      images: [
        {
          url: `https://ticketwave.ru/posters/${name}.png`,
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
      images: ['https://ticketwave.ru/preview.png'],
    },
  };
}


export default async function EventPage({ params }: Props) {
  const { name } = params;
  const data: DataTransferObject | null = await getData(name);
  const advertisment = await getAllData()

  if (!data) {
    notFound();
  }

  const { desc, options, shortDesc, title, } = data;

  return (
    <>
      <Image
        src={`/posters/${name}.png`}
        alt="Афиша"
        width={2000}
        height={300}
        className={styles.backgroundImage}
      />
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <h3 style={{fontStyle: 'italic', fontWeight: 100}}>Арт-студия "Луна"</h3>
          <h1>{title}</h1>
          </div>
          <p>{shortDesc}</p>
          <Link href="/">
            <Button style={{fontWeight: 200}}>📅 ВСЕ МЕРОПРИЯТИЯ 📅</Button>
          </Link>
        </header>

        <Schedule>
          {options.map(({ dateTime, nethouseLink, place }) => (
            <ShowtimeCard
              key={nethouseLink}
              link={nethouseLink}
              dateTime={dateTime}
              place={place}
              price={options[0].price}
            />
          ))}
        </Schedule>
        <Link href ='tel:+79067370208' style={{textAlign: 'center'}}><h2 style={{fontWeight: 100}}>☎️ +7 (906) 737 02-08 ☎️</h2></Link>
        <EventAboutSection description={desc} />
        <AddressSection />
        <AnnounceSection title='Другие мероприятия' eventsData={omit(advertisment, name)} />

      </div>
    </>
  );
}
