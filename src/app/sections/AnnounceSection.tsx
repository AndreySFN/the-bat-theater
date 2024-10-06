import React from 'react';

import { EventCard } from '../EventCard';
import styles from './AnnounceSection.module.scss';
import { RecordObjectElement } from '../types';

interface AnnounceSectionProps {
  title?: string;
  place: string;
  eventsData: Record<string, RecordObjectElement>;
}

export const AnnounceSection: React.FC<AnnounceSectionProps> = ({
  title = 'АФИША:',
  place,
  eventsData,
}) => {
  return (
    <section className={styles.announce}>
      <h2>{title}</h2>
      <span className={styles.announceContent}>
        {Object.entries(eventsData)
          .sort(
            (a, b) =>
              a[1].options[0].dateTime.getTime() -
              b[1].options[0].dateTime.getTime()
          )
          .map(([key, { shortDesc, title, subtitle, miniCoverUrl }]) => (
            <EventCard
              key={key}
              href={`/${place}/${key}`}
              imageUrl={miniCoverUrl!}
              subtitle={subtitle}
              desc={shortDesc}
              title={title}
            />
          ))}
      </span>
    </section>
  );
};
