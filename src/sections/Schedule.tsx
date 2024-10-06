import React, { ReactNode } from 'react';
import styles from './styles.module.scss';

export interface ScheduleProps {
  children: ReactNode;
}

export const Schedule = ({ children }: ScheduleProps) => (
  <section className={styles.schedule}>
    <h2>Расписание:</h2>
    {children}
  </section>
);
