import React from 'react';
import { Map } from '../Map';
import styles from './AddressSection.module.scss';

export const AddressSection: React.FC = () => (
  <section className={styles.address}>
    <h2>Адрес</h2>
    <Map />
  </section>
);
