import React from 'react';
import styles from './EventAboutSection.module.scss';

interface EventAboutSectionProps {
  description: string;
}

export const EventAboutSection: React.FC<EventAboutSectionProps> = ({ description }) => (
  <section className={styles.about}>
    <h2>О событии</h2>
    <p>{description}</p>
  </section>
);
