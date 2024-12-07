// EventPage.tsx

import { Button } from 'antd';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

import styles from './EventPage.module.scss';
import { ShowtimeCard } from '@/molecules/ShowtimeCard';
import { AddressSection } from '@/sections/AddressSection';
import { AnnounceSection } from '@/sections/AnnounceSection';
import { EventAboutSection } from '@/sections/EventAboutSection';
import { Schedule } from '@/sections/Schedule';
import { EUrlSearchKeyList, IOption, IRootObject } from '@/lib/types';
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
import ScrollButton from '@/atoms/ScrollButton';
import { ActorCard } from '@/atoms/ActorCard/ActorCard';
import { dbClientPromise } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';
interface Props {
  params: { name: string; place: string };
  searchParams: Record<EUrlSearchKeyList, string>; // Добавлено
}

// Вернуть генерацию метаданных

export default async function EventPage({ params }: Props) {
  // Обновлено
  const { place, name } = params;
  const db = await dbClientPromise;
  const eventGroup = await db
    .collection('events')
    .findOne<IRootObject>({ url: place });
  if (!eventGroup) {
    notFound();
  }
  const event = eventGroup?.elements?.find((elem) => elem.url === name);
  if (!event) {
    notFound();
  }
  const advertisment = eventGroup?.elements.filter((elem) => elem.url !== name);

  const {
    desc,
    options: dataOptions,
    shortDesc,
    title,
    mapKey,
    ym,
    previews,
    coverUrl,
    troupe,
  } = event;
  const options: Array<IOption> = [];

  for (const option of dataOptions) {
    options.push(option);
  }
  return (
    <>
      <YandexMetrika id={String(ym)} />
      <header
        className={styles.header}
        style={{ backgroundImage: `url('${coverUrl}')` }}
      >
        <div className={styles.headerContainer}>
          <div>
            <h3 style={{ fontStyle: 'italic', fontWeight: 100 }}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              {LUNA_ART_STUDIO_TITLE}
            </h3>
            <h1>{title}</h1>
            <p>{shortDesc}</p>
          </div>
          <Link href="/" className={styles.allEventsBtn}>
            <Button style={{ fontWeight: 200 }}>📅 ВСЕ МЕРОПРИЯТИЯ 📅</Button>
          </Link>
        </div>
      </header>
      <div className={styles.container}>
        <Schedule id="schedule">
          {options.map(
            (
              { dateTime, ticketUrls, place, price } // Добавлено price
            ) => {
              return (
                <ShowtimeCard
                  key={generateUUID()} // Уникальный ключ
                  link={ticketUrls.other} // Предполагаем, что ссылка берется из 'other'
                  dateTime={dateTime} // Теперь это Date
                  place={place}
                  price={price} // Передаем цену
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
        {!isEmpty(troupe) && (
          <>
            <h2
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
            </div>
          </>
        )}
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
