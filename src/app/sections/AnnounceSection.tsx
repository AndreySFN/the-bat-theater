import React from 'react';
import { EventCard } from '../EventCard';
import styles from './AnnounceSection.module.scss';

interface AnnounceSectionProps {
  eventsData: Record<
    string,
    {
      shortDesc: string;
      title: string;
      options: { dateTime: string }[];
    }
  >;
}

export const AnnounceSection: React.FC<AnnounceSectionProps> = ({ eventsData }) => (
  <section className={styles.announce}>
    <h2>АФИША:</h2>
    <div className={styles.announceContent}>
      {Object.entries(eventsData).map(([key, { shortDesc, title, options }]) => (
        <EventCard
          key={key}
          href={`/${key}`}
          imageUrl={`/miniposters/${key}.png`}
          date={new Date(options[0].dateTime)}
          desc={shortDesc}
          title={title}
        />
      ))}
    </div>
  </section>
);
