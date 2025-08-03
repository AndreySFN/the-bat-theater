import { Button } from 'antd';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import styles from './EventPage.module.scss';
import { ShowtimeCard } from '@/molecules/ShowtimeCard';
import { AnnounceSection } from '@/sections/AnnounceSection';
import { EventAboutSection } from '@/sections/EventAboutSection';
import { Schedule } from '@/sections/Schedule';
import { EUrlSearchKeyList } from '@/lib/types';
import {
  LUNA_ART_STUDIO_TITLE,
  PHONE_NUMBER,
  PHONE_NUMBER_LINK,
} from '@/consts';
import { OurProjects } from '@/features/OurProjects';
import { YandexMetrika } from '@/atoms/YandexMetrika';
import { ActorCard } from '@/atoms/ActorCard/ActorCard';
import { strapiServices } from '@/lib/strapi-services';
import { adaptStrapiVenueToLegacy, adaptStrapiEventToLegacy } from '@/lib/strapi-adapters';
import { getImageUrlFromStrapi } from '@/lib/simple-image-utils';
import { AddressSection } from '@/sections/AddressSection';
import { Metadata } from 'next';
import { SocialMediaBlock } from '@/features/SocialMediaBlock';
import { AboutSection } from '@/sections/AboutSection';

export const dynamic = 'force-dynamic';
interface Props {
  params: { venueId: string; eventId: string };
  searchParams: Record<EUrlSearchKeyList, string>;
}

export async function generateMetadata({
  params: { eventId, venueId },
}: Props): Promise<Metadata> {
  if (!eventId || !venueId) return {};
  try {
    const url = `${process.env.PUBLIC_SITE_URL}/${venueId}/${eventId}`;
    const event = await strapiServices.getEventById(eventId);
    if (!event) return {};
    
    const { title, subtitle, coverImage } = event;
    const imageSrc = coverImage ? getImageUrlFromStrapi(coverImage) : '';
    
    return {
      title: title || subtitle,
      description: event.description,
      openGraph: {
        title: title || subtitle,
        description: event.description,
        url,
        siteName: LUNA_ART_STUDIO_TITLE,
        images: imageSrc ? [
          {
            url: imageSrc,
            width: coverImage?.width || 1200,
            height: coverImage?.height || 630,
            alt: coverImage?.alternativeText || '',
          },
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: title || subtitle,
        description: event.description,
        images: imageSrc ? [imageSrc] : [],
      },
    };
  } catch {
    return {};
  }
}

export default async function EventPage({ params }: Props) {
  try {
    const { venueId, eventId } = params;
    
    // Получаем данные из Strapi
    const venue = await strapiServices.getVenueById(venueId);
    const event = await strapiServices.getEventById(eventId);
    
    if (!venue || !event) {
      notFound(); // Для конкретной страницы события логично возвращать 404
    }
    
    // Преобразуем данные в старый формат для совместимости
    const transformedVenue = adaptStrapiVenueToLegacy(venue);
    const transformedEvent = adaptStrapiEventToLegacy(event);
    
    const { title, subtitle } = transformedEvent;
    
    // Получаем карусель из превью события
    const carousel = transformedEvent.previews || null;
    
    // Рекламные события (все события места, кроме текущего)
    const advertisment = transformedVenue.events.filter(
      ({ _id }: { _id: string }) => _id !== eventId
    );

    return (
      <>
        {transformedEvent?.ym && (
          <YandexMetrika
            id={String(transformedEvent?.ym)}
            options={{
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
            }}
          />
        )}
        <header
          className={styles.header}
          style={{ backgroundImage: `url('${transformedEvent?.coverImg?.src}')` }}
        >
          <div className={styles.headerContainer}>
            <h1>{title}</h1>
            <p>{subtitle}</p>
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
          <Schedule id="schedule">
            {transformedEvent?.schedule?.map(
              ({ _id, ticketUrl, dateTime, place, price }: { 
                _id: string; 
                ticketUrl: string; 
                dateTime: string; 
                place: string; 
                price: string; 
              }) => {
                return (
                  <ShowtimeCard
                    key={_id}
                    link={ticketUrl}
                    dateTime={new Date(dateTime)}
                    place={place}
                    price={price}
                  />
                );
              }
            )}
          </Schedule>
          {!isEmpty(carousel?.elements) && (
            <OurProjects carousel={carousel?.elements as any} />
          )}
          {transformedEvent?.description && (
            <EventAboutSection
              description={transformedEvent?.description}
              footer={
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button type="primary" size="large">
                    <Link href="#schedule">Купить билет</Link>
                  </Button>
                </div>
              }
            />
          )}
          {transformedVenue.mapUrl && (
            <AddressSection mapUri={transformedVenue.mapUrl} address={transformedVenue.address} />
          )}
          {!isEmpty(transformedEvent?.roles) && (
            <>
              <h2
                style={{
                  textAlign: 'center',
                  margin: '2rem 0',
                  fontSize: '2rem',
                  fontWeight: 100,
                }}
              >
                В ролях:
              </h2>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-evenly',
                  marginBottom: '2rem',
                }}
              >
                {transformedEvent?.roles?.map(({ id, image, actor, role }: { 
                  id: string; 
                  image: any; 
                  actor: any; 
                  role: string; 
                }) => (
                  <ActorCard
                    key={id}
                    src={image?.src || ''}
                    title={actor?.name || ''}
                    subtitle={role}
                    blurDataUrl={image?.blurDataUrl || ''}
                  />
                ))}
              </div>
            </>
          )}
          {!isEmpty(advertisment) && (
            <AnnounceSection
              venueId={venueId}
              label={transformedVenue.label}
              title={transformedVenue.title}
              events={advertisment}
            />
          )}
        </div>
      </>
    );
  } catch (error) {
    console.error('Error loading event page:', error);
    notFound(); // При ошибке также возвращаем 404
  }
}
