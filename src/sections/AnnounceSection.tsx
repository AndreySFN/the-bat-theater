import React from 'react';

import {
  EEventCardColumDirection,
  EventCard,
} from '../atoms/EventCard/EventCard';
import styles from './AnnounceSection.module.scss';
import cn from 'classnames';
import { IEvent } from '@/model/events.model';

export enum EAnnounceSectionTitleDirections {
  LEFT,
  RIGHT,
}

interface AnnounceSectionProps {
  venueId?: string;
  title?: string;
  label?: string;
  events: Array<IEvent>;
  direction?: EAnnounceSectionTitleDirections;
}

export const AnnounceSection: React.FC<AnnounceSectionProps> = ({
  title = 'АФИША:',
  events,
  label,
  venueId,
  direction = EAnnounceSectionTitleDirections.RIGHT,
}) => {
  const titleClass = cn(styles.title, {
    [styles.announce__left]: direction === EAnnounceSectionTitleDirections.LEFT,
    [styles.announce__right]:
      direction === EAnnounceSectionTitleDirections.RIGHT,
  });

  return (
    <section className={styles.announce}>
      <div className={titleClass}>
        <h2>{title}</h2>
      </div>
      <span className={styles.announceContent}>
        {events.map(({ title, subtitle, posterImg, id }, index) => {
          // Проверка наличия posterImg и posterImg.src
          const imageUrl = posterImg?.src;
          const blurDataURL = posterImg?.blurDataUrl;

          return (
            <EventCard
              label={label}
              key={title}
              columnDirection={
                index % 2 === 1
                  ? EEventCardColumDirection.LEFT
                  : EEventCardColumDirection.RIGHT
              }
              href={`/${venueId}/${id}`}
              imageUrl={imageUrl || ''} // Использование пустой строки, если значение отсутствует
              blurDataURL={blurDataURL}
              title={title}
              subtitle={subtitle}
            />
          );
        })}
      </span>
    </section>
  );
};
