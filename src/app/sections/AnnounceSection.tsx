import React from 'react';

import { EventCard } from '../EventCard';
import styles from './AnnounceSection.module.scss';
import { DataTransferObject } from '../types';

interface AnnounceSectionProps {
  title?: string;
  eventsData: Record<string, DataTransferObject>;
}

export const AnnounceSection: React.FC<AnnounceSectionProps> = ({
  title = 'АФИША:',
  eventsData,
}) => (
  <section className={styles.announce}>
    <h2>{title}</h2>
    <div className={styles.announceContent}>
      {Object.entries(eventsData)
        .sort(
          (a, b) =>
            b[1].options[0].dateTime.getTime() -
            a[1].options[0].dateTime.getTime()
        )
        .map(([key, { shortDesc, title, options }]) => (
          <EventCard
            key={key}
            href={`/${key}`}
            imageUrl={`/miniposters/${key}.png`}
            date={options[0].dateTime}
            desc={shortDesc}
            title={title}
          />
        ))}
    </div>
  </section>
);
