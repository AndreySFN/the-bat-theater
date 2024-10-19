import React from 'react';

import styles from './AddressSection.module.scss';
import { MapsDictionary, TMapKeys } from '@/atoms/maps/MapsDictionary';

export interface IAddressSectionProps {
  address?: string;
  mapKey?: TMapKeys;
  title?: string;
}

export const AddressSection: React.FC<IAddressSectionProps> = ({
  address,
  mapKey,
  title = 'Адрес:',
}: IAddressSectionProps) => {
  if (!mapKey) {
    return null;
  }

  const Мap = MapsDictionary[mapKey];

  return (
    <section className={styles.address}>
      <h2>{title}</h2>
      <h3>{address}</h3>
      <Мap />
    </section>
  );
};
