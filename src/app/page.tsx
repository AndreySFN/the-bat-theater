import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllData } from './utils';
import { AboutSection } from './sections/AboutSection';
import { AddressSection } from './sections/AddressSection';
import { AnnounceSection } from './sections/AnnounceSection';
import styles from './MainPage.module.scss';
import Link from 'next/link';

export default async function MainPage() {
  const data = await getAllData();

  if (!data) {
    notFound();
  }

  const aboutContent = `"Арт-студия "Луна" объединяет художников, музыкантов, писателей, дизайнеров и всех, кто стремится раскрыть свой творческий потенциал. Под светом луны наши идеи оживают, а вдохновение не знает границ. Здесь вы найдете поддержку единомышленников, возможность обмениваться опытом и участвовать в уникальных проектах."`;

  return (
    <>
      <Image
        src="/main_poster.png"
        alt="Афиша"
        width={2000}
        height={300}
        className={styles.backgroundImage}
      />
      <div className={styles.container}>
        <header className={styles.header}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
          <h1>Арт-студия "Луна"</h1>
          <p>Погружение в удивительный мир искусства</p>
          <Link href ='tel:+79067370208'><p>+7 (906) 737 02-08</p></Link>
        </header>

        <AnnounceSection eventsData={data} />
        <AboutSection content={aboutContent} />
        <AddressSection mapKey='main' />
      </div>
    </>
  );
}
