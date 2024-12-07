import React from 'react';

import {
  EEventCardColumDirection,
  EventCard,
} from '../atoms/EventCard/EventCard';
import styles from './AnnounceSection.module.scss';
import { IRecordObjectElement } from '@/utils/dataHandler/types';
import cn from 'classnames';

export enum EAnnounceSectionTitleDirections {
  LEFT,
  RIGHT,
}

interface AnnounceSectionProps {
  title?: string;
  label?: string;
  place: string;
  eventsData: Record<string, IRecordObjectElement>;
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
        {Object.entries(eventsData)
          .sort(
            (a, b) =>
              a[1].options[0].dateTime.getTime() -
              b[1].options[0].dateTime.getTime()
          )
          .map(
            (
              [
                key,
                { shortDesc, blurMiniCoverUrl, title, schedule, miniCoverUrl },
              ],
              index
            ) => (
              <EventCard
                label={label}
                key={key}
                columnDirection={
                  index % 2 === 1
                    ? EEventCardColumDirection.LEFT
                    : EEventCardColumDirection.RIGHT
                }
                href={`/${place}/${key}`}
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
