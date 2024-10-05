import React, { ReactNode } from 'react';
import styles from './Section.module.scss';

export interface ISectionProps {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
}

export const Section = ({ children, subtitle, title }: ISectionProps) => {
  return (
    <section className={styles.section}>
      {title && <h2>{title}</h2>}
      {subtitle && <h3>{subtitle}</h3>}
      <div style={{ width: '100%' }}>{children}</div>
    </section>
  );
};
