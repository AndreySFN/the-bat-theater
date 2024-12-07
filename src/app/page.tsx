import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

// import Image from 'next/image';
import styles from './MainPage.module.scss';
import { AboutSection } from '@/sections/AboutSection';
import { AddressSection } from '@/sections/AddressSection';
import { AnnounceSection } from '@/sections/AnnounceSection';

import Image from 'next/image';
import {
  LUNA_ART_STUDIO_TITLE,
  MAIN_COVERAGE_BLUR_URL,
  MAIN_COVERAGE_URL,
  MAIN_YANDEX_METRICA_ID,
  PHONE_NUMBER,
  PHONE_NUMBER_LINK,
} from '@/consts';
import { OurProjects } from '@/features/OurProjects';
import { YandexMetrika } from '@/atoms/YandexMetrika';
import { ActorCard } from '@/atoms/ActorCard/ActorCard';
import { dbClientPromise } from '@/lib/mongodb';
import { IRootObject, ITroupeElement } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function MainPage() {
  const client = await dbClientPromise;
  const data = await client
    .collection('events')
    .find<IRootObject>({})
    .toArray();
  const troupe = await client
    .collection('troupe')
    .find<ITroupeElement>({})
    .toArray();
  if (!data) {
    notFound();
  }

  return (
    <>
      <YandexMetrika id={String(MAIN_YANDEX_METRICA_ID)} />
      <header className={styles.header}>
        <Image
          src={MAIN_COVERAGE_URL}
          placeholder="blur"
          blurDataURL={MAIN_COVERAGE_BLUR_URL}
          alt="Афиша"
          width={2000}
          height={300}
          className={styles.backgroundImage}
        />
        <div className={styles.headerContainer}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <h1>{LUNA_ART_STUDIO_TITLE}</h1>
          <p>Погружение в удивительный мир искусства</p>
          <Link href={PHONE_NUMBER_LINK}>
            <p>{PHONE_NUMBER}</p>
          </Link>
        </div>
      </header>
      <div className={styles.container}>
        {data.map(({ url, title, label, elements }) => {
          return (
            <AnnounceSection
              key={url}
              label={label}
              title={title}
              eventsData={elements}
              place={url}
            />
          );
        })}
        <OurProjects />
        <AboutSection />
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
        <AddressSection title="Контакты" mapKey="main" />
      </div>
    </>
  );
}
