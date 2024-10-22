import React, { ReactNode } from 'react';

import styles from './EventAboutSection.module.scss';

interface EventAboutSectionProps {
  description: string;
  footer?: ReactNode;
}

export const EventAboutSection: React.FC<EventAboutSectionProps> = ({
  description,
  footer,
}) => (
  <section className={styles.about}>
    {/*<h2>О событии</h2>*/}
    <p>{description}</p>
    {footer || null}
  </section>
);
