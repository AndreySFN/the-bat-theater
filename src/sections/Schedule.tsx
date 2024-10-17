import React, { ReactNode } from 'react';
import styles from './styles.module.scss';

export interface ScheduleProps {
  children: ReactNode;
  id?: string;
}

export const Schedule = ({ children, id }: ScheduleProps) => (
  <section id={id} className={styles.schedule}>
    <h2>Расписание:</h2>
    {children}
  </section>
);
