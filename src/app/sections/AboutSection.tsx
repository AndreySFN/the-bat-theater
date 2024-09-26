import React from 'react';

import styles from './AboutSection.module.scss';

interface AboutSectionProps {
  content: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ content }) => (
  <section className={styles.about}>
    <h2>О нас</h2>
    <p>{content}</p>
  </section>
);
