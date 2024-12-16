import React from 'react';

import styles from './AddressSection.module.scss';
import { MapsDictionary, TMapKeys } from '@/atoms/maps/MapsDictionary';
import { PHONE_NUMBER } from '@/consts';
import { MapComponent } from '@/atoms/MapComponent';

export interface IAddressSectionProps {
  address?: string;
  mapUri?: string;
  title?: string;
}

export const AddressSection: React.FC<IAddressSectionProps> = ({
  mapUri,
  title = 'Адрес:',
  address,
}: IAddressSectionProps) => {
  if (!mapUri) {
    return null;
  }

  const Map = MapsDictionary[mapUri];

  return (
    <>
      <section className={styles.address}>
        <div className={styles.content}>
          <h2 style={{ fontSize: '2rem' }}>{title}</h2>
          <ul className={styles.contactBlock}>
            <li>
              <strong>📍 Адрес:</strong> {address}
            </li>
            <li>
              <h4>🎟️ Заказ билетов:</h4>
              <ul className={styles.nestedList}>
                <li>💻 Доступен онлайн на сайте</li>
                <li>
                  📱 По телефону:{' '}
                  <a href="tel:+79067370208">+7 (906) 737 02-08</a>
                </li>
                <li style={{ fontSize: '0.8rem' }}>
                  Если вам не удалось дозвониться, отправьте SMS со словом
                  «ЛУНА», и мы обязательно перезвоним!
                </li>
              </ul>
            </li>
            <li>
              <h4>💼 По вопросам сотрудничества</h4>
              <ul className={styles.nestedList}>
                <li>
                  📞 Телефон: <a href={`tel:${PHONE_NUMBER}`}>{PHONE_NUMBER}</a>
                </li>
                {/* <li>
                  ✉️ Email:{' '}
                  <a href="mailto:art-director@luna-art-studio.ru">
                    art-director@luna-art-studio.ru
                  </a>
                </li> */}
              </ul>
            </li>
          </ul>
        </div>
        <MapComponent className={styles.mapContainer} mapUrl={mapUri} />
      </section>
    </>
  );
};
