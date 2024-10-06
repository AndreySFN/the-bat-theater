// EventPage.tsx

import { Button } from 'antd';
import { isEmpty, omit } from 'lodash';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

import styles from './EventPage.module.scss';
import { ShowtimeCard } from '@/molecules/ShowtimeCard';
import { AddressSection } from '@/sections/AddressSection';
import { AnnounceSection } from '@/sections/AnnounceSection';
import { EventAboutSection } from '@/sections/EventAboutSection';
import { Schedule } from '@/sections/Schedule';
import { RecordObjectElement } from '@/utils/dataHandler/types';
import {
  getRootObjectElementList,
  getTicketKey,
} from '../../../utils/dataHandler/dataHandler'; // Импортируем getUserSource
import { LUNA_ART_STUDIO_TITLE, MAX_WIDTH } from '@/consts';
import { CustomCarousel } from '@/atoms/CustomCarousel';
import { Section } from '@/layouts/Section';
import { OurProjects } from '@/features/OurProjects';
import { YandexMetrika } from '../../../atoms/YandexMetrika';
import { v4 as generateUUID } from 'uuid';

interface Props {
  params: { name: string; place: string };
  searchParams: { [key: string]: string | string[] | undefined }; // Добавлено
}

export async function generateMetadata({
  params: { place, name },
}: Props): Promise<Metadata> {
  const rootObjectElementList = await getRootObjectElementList(place);
  const data: RecordObjectElement | Record<string, string> =
    rootObjectElementList?.[name] || {};

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

export default async function EventPage({ params, searchParams }: Props) {
  // Обновлено
  const { place, name } = params;
  const rootObjectElementList = await getRootObjectElementList(place);
  if (!rootObjectElementList) {
    notFound();
  }
  const advertisment = omit(rootObjectElementList, name);
  const data: RecordObjectElement = rootObjectElementList[name];

  if (!data) {
    notFound();
  }

  const { desc, options, shortDesc, title, mapKey, ym, previews, coverUrl } =
    data;
  console.log(coverUrl);
  const ticketKey = getTicketKey(searchParams) || ''; // Получаем источник пользователя

  // Можно использовать userSource для передачи в YandexMetrika или других целей
  return (
    <>
      <YandexMetrika id={String(ym)} />
      {/* Передаем источник */}
      <header className={styles.header}>
        <Image
          src={coverUrl!}
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
          {options.map(
            (
              { dateTime, nethouseLinks, place, price } // Добавлено price
            ) => (
              <ShowtimeCard
                key={generateUUID()} // Уникальный ключ
                link={nethouseLinks?.[ticketKey] || nethouseLinks.other} // Предполагаем, что ссылка берется из 'other'
                dateTime={dateTime} // Теперь это Date
                place={place}
                price={price} // Передаем цену
              />
            )
          )}
        </Schedule>
        {/* <h2 style={{ fontWeight: 100, textAlign: 'center' }}>
          <Link href={PHONE_NUMBER_LINK}>☎️ {PHONE_NUMBER} ☎️</Link>
        </h2> */}
        {!isEmpty(previews) && (
          <Section>
            <CustomCarousel
              imagesList={previews!}
              width={MAX_WIDTH}
              height={MAX_WIDTH / 1.5}
            />
          </Section>
        )}
        <EventAboutSection description={desc} />
        {isEmpty(previews) && <OurProjects />}
        <AddressSection mapKey={mapKey} />
        {!isEmpty(advertisment) && (
          <AnnounceSection
            title="Другие мероприятия"
            eventsData={advertisment}
            place={place}
          />
        )}
      </div>
    </>
  );
}
