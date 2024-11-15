// EventPage.tsx
import { Button } from 'antd';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

import styles from './EventPage.module.scss';
import { Schedule } from '@/sections/Schedule';
import {
  EUrlSearchKeyList,
  RecordObjectElement,
} from '@/utils/dataHandler/types';
import { getRootObjectElementList } from '@/utils/dataHandler/dataHandler'; // Импортируем getUserSource
import {
  LUNA_ART_STUDIO_TITLE,
  PHONE_NUMBER,
  PHONE_NUMBER_LINK,
} from '@/consts';
import { BuyTicketButtonQTicket } from '@/atoms/BuyTicketButtonQTicket';

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

export default async function EventPage() {
  return (
    <>
      {/* Передаем источник */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div>
            <h3 style={{ fontStyle: 'italic', fontWeight: 100 }}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              {LUNA_ART_STUDIO_TITLE}
            </h3>
          </div>
          <Link href="/">
            <Button style={{ fontWeight: 200 }}>📅 ВСЕ МЕРОПРИЯТИЯ 📅</Button>
          </Link>
        </div>
      </header>
      <div className={styles.container}>
        <Schedule id="schedule">
          <BuyTicketButtonQTicket
            className={styles.button}
            price={'500'}
            url={'https://qtickets.ru/event/139351'}
            isSoldOut={false}
          />
        </Schedule>
        <h2 style={{ fontWeight: 100, padding: '3rem', textAlign: 'center' }}>
          <Link href={PHONE_NUMBER_LINK}>☎️ {PHONE_NUMBER} ☎️</Link>
        </h2>
      </div>
    </>
  );
}
