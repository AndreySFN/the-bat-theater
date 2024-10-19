import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

// import Image from 'next/image';
import styles from './MainPage.module.scss';
import { AboutSection } from '../sections/AboutSection';
import { AddressSection } from '../sections/AddressSection';
import { AnnounceSection } from '../sections/AnnounceSection';
import { getAllData } from '../utils/dataHandler/dataHandler';

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
import { YandexMetrika } from '../atoms/YandexMetrika';

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
        {Object.entries(data).map(([key, { title, label, elements }]) => {
          return (
            <AnnounceSection
              key={key}
              label={label}
              title={title}
              eventsData={elements}
              place={key}
            />
          );
        })}
        <OurProjects />
        <AboutSection content={aboutContent} />
        <AddressSection
          title='Домашняя площадка - Арт-студия "Луна" г. Клин'
          mapKey="main"
        />
      </div>
    </>
  );
}
