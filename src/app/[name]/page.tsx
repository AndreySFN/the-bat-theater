import { Button } from 'antd';
import { isEmpty, omit } from 'lodash';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

import styles from './EventPage.module.scss';
import { ShowtimeCard } from '../molecules/ShowtimeCard';
import { AddressSection } from '../sections/AddressSection';
import { AnnounceSection } from '../sections/AnnounceSection';
import { EventAboutSection } from '../sections/EventAboutSection';
import { Schedule } from '../sections/Schedule';
import { DataTransferObject } from '../types';
import { getAllData, getData } from '../utils';
import { LUNA_ART_STUDIO_TITLE, MAX_WIDTH } from '@/app/consts';
import { CustomCarousel } from '@/app/atoms/CustomCarousel';
import { Section } from '@/layouts/Section';
import { OurProjects } from '@/features/OurProjects';
import { YandexMetrika } from '../YandexMetrika';
interface Props {
  params: { name: string };
}

export async function generateMetadata({
  params: { name },
}: Props): Promise<Metadata> {
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
          url: `https://ticketwave.ru/miniposters/${name}.png`,
          width: 800,
          height: 600,
          alt: data.title,
        },
      ],
      locale: 'ru_RU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.shortDesc,
      images: ['https://ticketwave.ru/preview.png'],
    },
  };
}

export default async function EventPage({ params }: Props) {
  const { name } = params;
  const data: DataTransferObject | null = await getData(name);
  const advertisment = omit(await getAllData(), name);

  if (!data) {
    notFound();
  }

  const { desc, options, shortDesc, title, mapKey, ym, previews } = data;
  console.log(ym);
  return (
    <>
      <YandexMetrika id={String(ym)} />
      <header className={styles.header}>
        <Image
          src={`/posters/${name}.png`}
          alt="Афиша"
          width={2000}
          height={300}
          className={styles.backgroundImage}
        />
        <div className={styles.headerContainer}>
          <div>
            <h3 style={{ fontStyle: 'italic', fontWeight: 100 }}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              {LUNA_ART_STUDIO_TITLE}
            </h3>
            <h1>{title}</h1>
            <p>{shortDesc}</p>
          </div>
          <Link href="/">
            <Button style={{ fontWeight: 200 }}>📅 ВСЕ МЕРОПРИЯТИЯ 📅</Button>
          </Link>
        </div>
      </header>
      <div className={styles.container}>
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
        {/* <h2 style={{ fontWeight: 100, textAlign: 'center' }}>
          <Link href={PHONE_NUMBER_LINK}>☎️ {PHONE_NUMBER} ☎️</Link>
        </h2> */}
        {!isEmpty(previews) && (
          <Section>
            <CustomCarousel
              imagesList={previews}
              width={MAX_WIDTH}
              height={MAX_WIDTH / 1.5}
            />
          </Section>
        )}
        <EventAboutSection description={desc} />
        {isEmpty(previews) && <OurProjects />}
        <AddressSection mapKey={mapKey} />
        <AnnounceSection title="Другие мероприятия" eventsData={advertisment} />
      </div>
    </>
  );
}
