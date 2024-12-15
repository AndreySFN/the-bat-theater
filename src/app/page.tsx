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
import { YandexMetrika } from '@/atoms/YandexMetrika';
import dbConnect from "@/lib/dbconnect";
import {VenueModel} from "@/model/venues.model";
import {ActorModel, IActor} from "@/model/actors.model";
import {ActorCard} from "@/atoms/ActorCard/ActorCard";
import {MainCarouselModel} from "@/model/mainCarousel.model";
import {isEmpty} from "lodash";
import {OurProjects} from "@/features/OurProjects";
import {ObjectId} from "bson";

export const dynamic = 'force-dynamic';

export default async function MainPage() {
  await dbConnect();
  // const a = EventModel;
  const venues = await VenueModel.find({}).populate({
    path: 'events', // Populate each event
    populate: {
      path: 'posterImg' // Populate images inside events
    }
  });
  const actors = await ActorModel.find<IActor>({}).populate('image')
  const carousel = await MainCarouselModel.find({})
      .populate('image').lean()
  if (!venues) {
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
        {venues.map(({ id, title, label, events  }) => {
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
          // @ts-ignore TDOO: Убрать
          !isEmpty(carousel) && <OurProjects carousel={carousel}/>
        }
        <AboutSection />
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
        <AddressSection title="Контакты" mapKey="main" />
      </div>
    </>
  );
}
