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
import {
  EUrlSearchKeyList,
  Option,
  RecordObjectElement,
} from '@/utils/dataHandler/types';
import {
  getRootObjectElementList,
  getSearchValue,
} from '@/utils/dataHandler/dataHandler'; // Импортируем getUserSource
import {
  LUNA_ART_STUDIO_TITLE,
  MAX_WIDTH,
  PHONE_NUMBER,
  PHONE_NUMBER_LINK,
} from '@/consts';
import { CustomCarousel } from '@/atoms/CustomCarousel';
import { OurProjects } from '@/features/OurProjects';
import { YandexMetrika } from '@/atoms/YandexMetrika';
import { v4 as generateUUID } from 'uuid';
import { apiClientInstance } from '@/api/NethouseApi';
import ScrollButton from '@/atoms/ScrollButton';
import { ActorCard } from '@/atoms/ActorCard/ActorCard';

interface Props {
  params: { name: string; place: string };
  searchParams: Record<EUrlSearchKeyList, string>; // Добавлено
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

  const {
    desc,
    options: dataOptions,
    shortDesc,
    title,
    mapKey,
    ym,
    previews,
    coverUrl,
    blurCoverUrl,
    troupe,
  } = data;
  const options: Array<Option> = [];

  for (const option of dataOptions) {
    if (option.ticketsTotalCount) {
      const unsoldTicketsCount = await apiClientInstance.getUnsoldTicketsCount(
        option.nethouseId,
        option.ticketsTotalCount
      );
      option.unsoldTicketsCount = Number(
        Number(unsoldTicketsCount) <= 30 && unsoldTicketsCount
      );
    }
    options.push(option);
  }
  const ticketKey =
    getSearchValue(searchParams, EUrlSearchKeyList.SOURCE) || ''; // Получаем источник пользователя
  // Можно использовать userSource для передачи в YandexMetrika или других целей
  console.log(blurCoverUrl);
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
          placeholder="blur"
          blurDataURL={blurCoverUrl}
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
        <Schedule id="schedule">
          {options.map(
            (
              { dateTime, nethouseLinks, place, price, unsoldTicketsCount } // Добавлено price
            ) => {
              return (
                <ShowtimeCard
                  key={generateUUID()} // Уникальный ключ
                  link={nethouseLinks?.[ticketKey] || nethouseLinks.other} // Предполагаем, что ссылка берется из 'other'
                  dateTime={dateTime} // Теперь это Date
                  place={place}
                  price={price} // Передаем цену
                  unsoldTotalCount={unsoldTicketsCount}
                />
              );
            }
          )}
        </Schedule>
        <h2 style={{ fontWeight: 100, padding: '3rem', textAlign: 'center' }}>
          <Link href={PHONE_NUMBER_LINK}>☎️ {PHONE_NUMBER} ☎️</Link>
        </h2>
        {!isEmpty(previews) && (
          <CustomCarousel
            imagesList={previews!}
            width={MAX_WIDTH}
            height={MAX_WIDTH / 1.5}
          />
        )}
        <EventAboutSection
          description={desc}
          footer={
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ScrollButton className={styles.toScheduleBtn}>
                <h2>📅 Расписание показов 🕑</h2>
              </ScrollButton>
            </div>
          }
        />
        {isEmpty(previews) && <OurProjects />}
        {!isEmpty(troupe) && <><h2
          style={{
            textAlign: 'center',
            backgroundColor: '#610b00',
            color: 'white',
            margin: '1rem 0',
          }}
        >
          Актёрский состав:
        </h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
          }}
        >
          {troupe?.map(({ src, actorName, role, blurDataUrl }) => (
            <ActorCard
              key={src}
              src={src}
              actorName={actorName}
              role={role}
              blurDataUrl={blurDataUrl}
            />
          ))}
        </div></>}
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
