import React from 'react';

import {
  EEventCardColumDirection,
  EventCard,
} from '../atoms/EventCard/EventCard';
import styles from './AnnounceSection.module.scss';
import { IRecordObjectElement } from '@/lib/types';
import cn from 'classnames';

export enum EAnnounceSectionTitleDirections {
  LEFT,
  RIGHT,
}

interface AnnounceSectionProps {
  title?: string;
  label?: string;
  place: string;
  eventsData: Array<IRecordObjectElement>;
  direction?: EAnnounceSectionTitleDirections;
}

export const AnnounceSection: React.FC<AnnounceSectionProps> = ({
  title = 'АФИША:',
  place,
  eventsData,
  label,
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
        {eventsData
          .sort(
            (a: IRecordObjectElement, b: IRecordObjectElement) =>
              a.options[0].dateTime.getTime() - b.options[0].dateTime.getTime()
          )
          .map(
            (
              {
                url,
                shortDesc,
                blurMiniCoverUrl,
                title,
                schedule,
                miniCoverUrl,
              },
              index
            ) => (
              <EventCard
                label={label}
                key={title}
                columnDirection={
                  index % 2 === 1
                    ? EEventCardColumDirection.LEFT
                    : EEventCardColumDirection.RIGHT
                }
                href={`/${place}/${url}`}
                imageUrl={miniCoverUrl!}
                blurDataURL={blurMiniCoverUrl}
                schedule={schedule}
                desc={shortDesc}
                title={title}
              />
            )
          )}
      </span>
    </section>
  );
};
