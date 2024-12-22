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
import dbConnect from '@/lib/dbconnect';
import { VenueModel } from '@/model/venues.model';
import { ActorModel, IActor } from '@/model/actors.model';
import { ActorCard } from '@/atoms/ActorCard/ActorCard';
import { IAlbumElement, AlbumElementModel } from '@/model/albumElement.model';
import { isEmpty, shuffle } from 'lodash';
import { OurProjects } from '@/features/OurProjects';
import { Section } from '@/layouts/Section';
import { Metadata } from 'next';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import { notFoundRedirect } from '@/utils/notFoundRedirect';
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
  await dbConnect();
  const venues = await notFoundRedirect(() =>
    VenueModel.find({}).populate({
      path: 'events',
      populate: {
        path: 'posterImg',
      },
    })
  );
  const actors = await ActorModel.find<IActor>({}).populate('image');
  const carousel = shuffle(
    await AlbumElementModel.find({}).populate('image').lean<IAlbumElement>()
  );
  if (!venues) {
    notFound();
  }
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
        {venues.map(({ id, title, label, events }) => {
          return (
            <AnnounceSection
              key={id}
              venueId={id}
              label={label}
              title={title}
              events={events}
            />
          );
        })}
        {
          // @ts-ignore TODO: Убрать
          !isEmpty(carousel) && <OurProjects carousel={carousel} />
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
            {actors?.map(({ id, image, name, description }) => (
              <ActorCard
                key={id}
                src={image.src}
                title={name}
                subtitle={description}
                blurDataUrl={image.blurDataUrl}
              />
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
