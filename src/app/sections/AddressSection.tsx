import React from 'react';

import styles from './AddressSection.module.scss';
import { MapsDictionary, TMapKeys } from '../Maps/MapsDictionary';

export interface IAddressSectionProps {
  address?: string;
  mapKey?: TMapKeys;
}

export const AddressSection: React.FC<IAddressSectionProps> = ({
  address,
  mapKey,
}: IAddressSectionProps) => {
  if (!mapKey) {
    return null;
  }

  const Мap = MapsDictionary[mapKey];

  return (
    <section className={styles.address}>
      <h2>Адрес:</h2>
      <h3>{address}</h3>
      <Мap />
    </section>;
  );
};
