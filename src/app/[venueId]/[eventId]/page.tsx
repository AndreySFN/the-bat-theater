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
import {
  EventDetailsModel,
  IImage,
  IMainCarouselElement,
  MainCarouselModel,
} from '@/model';
import { AddressSection } from '@/sections/AddressSection';
import { Metadata } from 'next';
import { notFoundRedirect } from '@/utils/notFoundRedirect';

export const dynamic = 'force-dynamic';
interface Props {
  params: { venueId: string; eventId: string };
  searchParams: Record<EUrlSearchKeyList, string>; // Добавлено
}

const imageItemToMainCarouselElementMaper = (a: IImage) =>
  ({ image: a }) as IMainCarouselElement;

export async function generateMetadata({
  params: { eventId, venueId },
}: Props): Promise<Metadata> {
  if (!eventId || !venueId) return {};
  try {
    const url = `${process.env.PUBLIC_SITE_URL}/${venueId}/${eventId}`;
    const eventDetailId = (await EventModel.findById<IEvent>(eventId))
      ?.eventDetails;
    if (!eventDetailId) return {};
    const { title, description, width, height, image, alt } =
      await EventDetailsModel.findById(eventDetailId);
    const imageSrc = `${process.env.PUBLIC_SITE_URL}/${image.src}`;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        siteName: LUNA_ART_STUDIO_TITLE,
        images: [
          {
            url: imageSrc,
            width,
            height,
            alt,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageSrc],
      },
    };
  } catch {
    return {};
  }
  return {};
}

export default async function EventPage({ params }: Props) {
  await dbConnect();
  const { venueId, eventId } = params;
  const venue = await notFoundRedirect(
    async () =>
      await VenueModel.findById<IVenue>(venueId)
        .populate({ path: 'events', populate: 'posterImg' })
        .lean<IVenue>()
  );
  if (!venue) {
    notFound();
  }
  const event = await notFoundRedirect(() =>
    EventModel.findById(eventId)
      .populate('posterImg')
      .populate({
        path: 'eventDetails',
        populate: [
          { path: 'previews' },
          {
            path: 'schedule',
          },
          {
            path: 'coverImg',
          },
          {
            path: 'roles',
            populate: 'image',
          },
        ],
      })
      .lean<IEvent>()
  );

  if (!event) {
    notFound();
  }

  const { title, subtitle, eventDetails } = event;
  const carousel = isEmpty(eventDetails?.previews)
    ? await MainCarouselModel.find()
        .populate('image')
        .lean<Array<IMainCarouselElement>>()
    : null;

  const advertisment = venue.events.filter(
    // @ts-ignore
    ({ _id }) => _id.toHexString() !== eventId
  );
  return (
    <>
      {eventDetails?.ym && (
        <YandexMetrika
          id={String(eventDetails?.ym)}
          options={{
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
            ecommerce: 'dataLayer',
          }}
        />
      )}
      <header
        className={styles.header}
        style={{ backgroundImage: `url('${eventDetails?.coverImg?.src}')` }}
      >
        <div className={styles.headerContainer}>
          <div>
            <h3 style={{ fontStyle: 'italic', fontWeight: 100 }}>
              {LUNA_ART_STUDIO_TITLE}
            </h3>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <Link href="/" className={styles.allEventsBtn}>
            <Button style={{ fontWeight: 200 }}>📅 ВСЕ МЕРОПРИЯТИЯ 📅</Button>
          </Link>
        </div>
      </header>
      <div className={styles.container}>
        <Schedule id="schedule">
          {eventDetails?.schedule?.map(
            ({ _id, ticketUrl, dateTime, place, price }) => {
              return (
                <ShowtimeCard
                  key={_id.toHexString()}
                  link={ticketUrl}
                  dateTime={dateTime}
                  place={place}
                  price={price}
                />
              );
            }
          )}
        </Schedule>
        <h2 style={{ fontWeight: 100, padding: '3rem', textAlign: 'center' }}>
          <Link href={PHONE_NUMBER_LINK}>☎️ {PHONE_NUMBER} ☎️</Link>
        </h2>
        {eventDetails && !isEmpty(eventDetails?.previews) && (
          <CustomCarousel
            imagesList={eventDetails.previews?.map(
              imageItemToMainCarouselElementMaper
            )} // TODO: Убрать костыль
            width={MAX_WIDTH}
            height={MAX_WIDTH / 1.5}
          />
        )}
        {eventDetails?.description && (
          <EventAboutSection
            description={eventDetails?.description}
            footer={
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ScrollButton className={styles.toScheduleBtn}>
                  <h2>📅 Расписание показов 🕑</h2>
                </ScrollButton>
              </div>
            }
          />
        )}
        {isEmpty(eventDetails?.previews) && carousel && (
          <OurProjects carousel={carousel} />
        )}
        {venue.mapUrl && (
          <AddressSection mapUri={venue.mapUrl} address={venue.address} />
        )}
        {!isEmpty(eventDetails?.roles) && (
          <>
            <h2
              style={{
                textAlign: 'center',
                backgroundColor: '#610b00',
                color: 'white',
                margin: '1rem 0',
              }}
            >
              Актёрский состав:
            </h2>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
              }}
            >
              {eventDetails?.roles?.map(({ id, image, actorName, role }) => (
                <ActorCard
                  key={id}
                  src={image?.src || ''}
                  title={actorName}
                  subtitle={role}
                  blurDataUrl={image?.blurDataUrl || ''}
                />
              ))}
            </div>
          </>
        )}

        {!isEmpty(advertisment) && (
          <AnnounceSection title="Другие мероприятия" events={advertisment} />
        )}
      </div>
    </>
  );
}
