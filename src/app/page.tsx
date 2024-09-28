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
import YandexMetrika from '@/app/YandexMetrika';
import { MAIN_YANDEX_METRICA_ID } from '@/app/consts';

export default async function MainPage() {
  const data = await getAllData();

  if (!data) {
    notFound();
  }

  const aboutContent =
    '"Арт-студия "Луна" объединяет художников, музыкантов, писателей, дизайнеров и всех, кто стремится раскрыть свой творческий потенциал. Под светом луны наши идеи оживают, а вдохновение не знает границ. Здесь вы найдете поддержку единомышленников, возможность обмениваться опытом и участвовать в уникальных проектах."';

  return (
    <>
      <YandexMetrika counter={MAIN_YANDEX_METRICA_ID} />
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
          <h1>Арт-студия "Луна"</h1>
          <p>Погружение в удивительный мир искусства</p>
          <Link href="tel:+79067370208">
            <p>+7 (906) 737 02-08</p>
          </Link>
        </div>
      </header>
      <div className={styles.container}>
        <AnnounceSection eventsData={data} />
        <AboutSection content={aboutContent} />
        <AddressSection mapKey="main" />
      </div>
    </>
  );
}
