import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

// import Image from 'next/image';
import styles from './MainPage.module.scss';
import { AboutSection } from './sections/AboutSection';
import { AddressSection } from './sections/AddressSection';
import { AnnounceSection } from './sections/AnnounceSection';
import { getAllData } from './utils';

import Image from 'next/image';
import {
  LUNA_ART_STUDIO_TITLE,
  MAIN_YANDEX_METRICA_ID,
  PHONE_NUMBER,
  PHONE_NUMBER_LINK,
} from '@/app/consts';
import { OurProjects } from '@/features/OurProjects';
import { YandexMetrika } from './YandexMetrika';

export default async function MainPage() {
  const data = await getAllData();

  if (!data) {
    notFound();
  }

  const aboutContent =
    '"Арт-студия "Луна" объединяет художников, музыкантов, писателей, дизайнеров и всех, кто стремится раскрыть свой творческий потенциал. Под светом луны наши идеи оживают, а вдохновение не знает границ. Здесь вы найдете поддержку единомышленников, возможность обмениваться опытом и участвовать в уникальных проектах."';

  return (
    <>
      <YandexMetrika id={String(MAIN_YANDEX_METRICA_ID)} />
      <header className={styles.header}>
        <Image
          src="/main_poster.png"
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
        {Object.entries(data).map(([key, { title, elements }]) => {
          return (
            <AnnounceSection
              key={key}
              title={title}
              eventsData={elements}
              place={key}
            />
          );
        })}
        <OurProjects />
        <AboutSection content={aboutContent} />
        <AddressSection mapKey="main" />
      </div>
    </>
  );
}
