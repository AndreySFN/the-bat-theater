import { Button } from 'antd';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

import styles from './EventPage.module.scss';
import { ShowtimeCard } from '@/molecules/ShowtimeCard';
import { AnnounceSection } from '@/sections/AnnounceSection';
import { EventAboutSection } from '@/sections/EventAboutSection';
import { Schedule } from '@/sections/Schedule';
import { EUrlSearchKeyList } from '@/lib/types';
import {
  LUNA_ART_STUDIO_TITLE,
  MAX_WIDTH,
  PHONE_NUMBER,
  PHONE_NUMBER_LINK,
} from '@/consts';
import { CustomCarousel } from '@/atoms/CustomCarousel';
import { OurProjects } from '@/features/OurProjects';
import { YandexMetrika } from '@/atoms/YandexMetrika';
import ScrollButton from '@/atoms/ScrollButton';
import { ActorCard } from '@/atoms/ActorCard/ActorCard';
import { EventModel, IEvent } from '@/model/events.model';
import { IVenue, VenueModel } from '@/model/venues.model';
import dbConnect from '@/lib/dbconnect';
import {MapComponent} from "@/atoms/MapComponent";
import {IMainCarouselElement, MainCarouselModel} from "@/model";

export const dynamic = 'force-dynamic';
interface Props {
  params: { venueId: string; eventId: string };
  searchParams: Record<EUrlSearchKeyList, string>; // Добавлено
}

// TODO: Вернуть генерацию метаданных

export default async function EventPage({ params }: Props) {
  // await dbConnect();
  const { venueId, eventId } = params;
  const venue = (await VenueModel.findById<IVenue>(venueId).populate('events').populate({ path: 'events', populate: 'posterImg'}).lean<IVenue>());
  // if (!venue) {
  //   notFound();
  // }
  const event = (await EventModel.findById<IEvent>(eventId)
    .populate('posterImg') // Заполняем постер
    .populate({
      path: 'eventDetails', // Заполняем eventDetails
      populate: [
        {
          path: 'schedule', // Расписание
        },
        {
          path: 'coverImg', // Обложка
        },
        {
          path: 'roles', // Роли
          populate: 'image'
        },
        {
          path: 'previews', // Превью
          populate: {
            path: 'image', // Изображение внутри превью
          },
        },
      ],
    }));

  // if (!event) {
  //   notFound();
  // }

  // const { title, subtitle, posterImg, eventDetails } = event;
  // const carousel = await MainCarouselModel.find({}).populate('image').lean()
  const carousel =
      // isEmpty(eventDetails?.previews) ?
      (await MainCarouselModel.find()
          .populate('image')
          .lean<IMainCarouselElement>())
  //
  // const advertisment = venue.events.filter(({id}) =>
  //     id !== eventId
  // );
  // console.log('venue mapUrl: ', venue.mapUrl )

// : null;

  return (
    <>
      {/*<YandexMetrika id={String(ym)} />*/}
      <header
        className={styles.header}
        // style={{ backgroundImage: `url('${eventDetails?.coverImg?.src}')` }}
      >
        <div className={styles.headerContainer}>
          <div>
            <h3 style={{ fontStyle: 'italic', fontWeight: 100 }}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              {LUNA_ART_STUDIO_TITLE}
            </h3>
            {/*<h1>{title}</h1>*/}
            {/*<p>{subtitle}</p>*/}
          </div>
          <Link href="/" className={styles.allEventsBtn}>
            <Button style={{ fontWeight: 200 }}>📅 ВСЕ МЕРОПРИЯТИЯ 📅</Button>
          </Link>
        </div>
      </header>
      {/*<div className={styles.container}>*/}
      {/*  <Schedule id="schedule">*/}
      {/*    {eventDetails?.schedule?.map(*/}
      {/*      (*/}
      {/*        { id, ticketUrl, dateTime, place, price } // Добавлено price*/}
      {/*      ) => {*/}
      {/*        return (*/}
      {/*          <ShowtimeCard*/}
      {/*            key={id} // Уникальный ключ*/}
      {/*            link={ticketUrl} // Предполагаем, что ссылка берется из 'other'*/}
      {/*            dateTime={dateTime} // Теперь это Date*/}
      {/*            place={place}*/}
      {/*            price={price} // Передаем цену*/}
      {/*          />*/}
      {/*        );*/}
      {/*      }*/}
      {/*    )}*/}
      {/*  </Schedule>*/}
      {/*  <h2 style={{ fontWeight: 100, padding: '3rem', textAlign: 'center' }}>*/}
      {/*    <Link href={PHONE_NUMBER_LINK}>☎️ {PHONE_NUMBER} ☎️</Link>*/}
      {/*  </h2>*/}
      {/*  {eventDetails && !isEmpty(eventDetails?.previews) && (*/}
      {/*    <CustomCarousel*/}
      {/*      imagesList={eventDetails.previews!}*/}
      {/*      width={MAX_WIDTH}*/}
      {/*      height={MAX_WIDTH / 1.5}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*  {eventDetails?.description && (*/}
      {/*    <EventAboutSection*/}
      {/*      description={eventDetails?.description}*/}
      {/*      footer={*/}
      {/*        <div style={{ display: 'flex', justifyContent: 'center' }}>*/}
      {/*          <ScrollButton className={styles.toScheduleBtn}>*/}
      {/*            <h2>📅 Расписание показов 🕑</h2>*/}
      {/*          </ScrollButton>*/}
      {/*        </div>*/}
      {/*      }*/}
      {/*    />*/}
      {/*  )}*/}
      {/*  /!*{carousel && <OurProjects carousel={carousel} />}*!/*/}
      {/*  {!isEmpty(eventDetails?.roles) && (*/}
      {/*    <>*/}
      {/*      <h2*/}
      {/*        style={{*/}
      {/*          textAlign: 'center',*/}
      {/*          backgroundColor: '#610b00',*/}
      {/*          color: 'white',*/}
      {/*          margin: '1rem 0',*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        Актёрский состав:*/}
      {/*      </h2>*/}
      {/*      <div*/}
      {/*        style={{*/}
      {/*          display: 'flex',*/}
      {/*          flexWrap: 'wrap',*/}
      {/*          justifyContent: 'space-evenly',*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        {eventDetails?.roles?.map(({ id, image, actorName, role }) => (*/}
      {/*          <ActorCard*/}
      {/*            key={id}*/}
      {/*            src={image?.src || ''}*/}
      {/*            title={actorName}*/}
      {/*            subtitle={role}*/}
      {/*            blurDataUrl={image?.blurDataUrl || ''}*/}
      {/*          />*/}
      {/*        ))}*/}
      {/*      </div>*/}
      {/*    </>*/}
      {/*  )}*/}
      {/*  {venue?.mapUrl && <MapComponent mapUrl={venue.mapUrl}/>}*/}
      {/*  /!*<AddressSection mapKey={mapKey} />*!/*/}
      {/*  {!isEmpty(advertisment) && (*/}
      {/*    <AnnounceSection title="Другие мероприятия" events={advertisment} />*/}
      {/*  )}*/}
      {/*</div>*/}
    </>
  );
}
