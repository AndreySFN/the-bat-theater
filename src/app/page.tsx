import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

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
import { YandexMetrika } from '@/atoms/YandexMetrika';
import { strapiServices } from '@/lib/strapi-services';
import {
  adaptStrapiVenueToLegacy,
  adaptStrapiActorToLegacy,
  adaptStrapiAlbumToLegacy,
} from '@/lib/strapi-adapters';
import { ActorCard } from '@/atoms/ActorCard/ActorCard';
import { isEmpty, shuffle } from 'lodash';
import { OurProjects } from '@/features/OurProjects';
import { Section } from '@/layouts/Section';
import { Metadata } from 'next';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import { Button } from 'antd';
import { SocialMediaBlock } from '@/features/SocialMediaBlock';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: LUNA_ART_STUDIO_TITLE,
    description: 'Погружение в удивительный мир искусства',
    openGraph: {
      title: LUNA_ART_STUDIO_TITLE,
      description: 'Погружение в удивительный мир искусства',
      url: process.env.PUBLIC_SITE_URL,
      siteName: LUNA_ART_STUDIO_TITLE,
      images: [
        {
          url: '/preview.png',
          width: 300,
          height: 300,
          alt: LUNA_ART_STUDIO_TITLE,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: LUNA_ART_STUDIO_TITLE,
      description: 'Погружение в удивительный мир искусства',
      images: [`${process.env.PUBLIC_SITE_URL}/preview.png`],
    },
  };
}

export default async function MainPage() {
  try {
    console.log(1)
    const venues = await strapiServices.getVenues();
    console.log(2)
    const actors = await strapiServices.getActors();
    console.log(3)
    const albums = await strapiServices.getAlbums();
    console.log(4)
    // Преобразуем данные в старый формат для совместимости
    const transformedVenues = venues?.map(adaptStrapiVenueToLegacy) || [];
    console.log(5)
    const transformedActors = actors?.map(adaptStrapiActorToLegacy) || [];
    console.log(6)
    const transformedCarousel = shuffle(albums?.map(adaptStrapiAlbumToLegacy) || []);

    return (
      <>
        <YandexMetrika id={String(MAIN_YANDEX_METRICA_ID)} />
        <header // TODO: вынести дублирующийся код с [venuId]/[eventId]/page.tsx
          className={styles.header}
          style={{ backgroundImage: `url('${MAIN_COVERAGE_URL}')` }}
        >
          <div className={styles.headerContainer}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <h1>{LUNA_ART_STUDIO_TITLE}</h1>
            <p>Погружение в удивительный мир искусства</p>
            <Link href={PHONE_NUMBER_LINK}>
              <p>{PHONE_NUMBER}</p>
            </Link>
          </div>
          <Image height={200} width={200} src="/main_logo.png" alt="logo" />
        </header>
        <div className={styles.container}>
          <SocialMediaBlock />
        </div>
        <div className={styles.container}>
          {transformedVenues.map(({ _id, title, label, events }) => {
            return (
              <AnnounceSection
                key={_id}
                venueId={_id}
                label={label}
                title={title}
                events={events}
              />
            );
          })}
          {
            // @ts-ignore TODO: Убрать
            !isEmpty(transformedCarousel) && (
              <OurProjects carousel={transformedCarousel} />
            )
          }
          <AboutSection />
          <AddressSection
            title="Контакты"
            mapUri="https://yandex.ru/map-widget/v1/org/letuchaya_mysh/91074484875/?ll=36.729552%2C56.329304&z=18"
          />
          <Section title="Коллектив:">
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
              }}
            >
              {transformedActors?.map(({ _id, image, name, description }) => (
                <ActorCard
                  key={_id}
                  src={image?.src || ''}
                  title={name}
                  subtitle={description}
                  blurDataUrl={image?.blurDataUrl || ''}
                />
              ))}
            </div>
          </Section>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error loading data from Strapi:', error);
    // Возвращаем страницу с пустыми данными вместо notFound
    return (
      <>
        <YandexMetrika id={String(MAIN_YANDEX_METRICA_ID)} />
        <header
          className={styles.header}
          style={{ backgroundImage: `url('${MAIN_COVERAGE_URL}')` }}
        >
          <div className={styles.headerContainer}>
            <h1>{LUNA_ART_STUDIO_TITLE}</h1>
            <p>Погружение в удивительный мир искусства</p>
            <Link href={PHONE_NUMBER_LINK}>
              <p>{PHONE_NUMBER}</p>
            </Link>
          </div>
          <Image height={200} width={200} src="/main_logo.png" alt="logo" />
        </header>
        <div className={styles.container}>
          <SocialMediaBlock />
        </div>
        <div className={styles.container}>
          <AboutSection />
          <AddressSection
            title="Контакты"
            mapUri="https://yandex.ru/map-widget/v1/org/letuchaya_mysh/91074484875/?ll=36.729552%2C56.329304&z=18"
          />
          <Section title="Коллектив:">
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
              }}
            >
              {/* Пустой список актеров */}
            </div>
          </Section>
        </div>
      </>
    );
  }
}
