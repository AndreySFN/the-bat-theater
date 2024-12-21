import { BuyTicketButton } from '@/atoms/BuyTicketButton';
import { Card } from 'antd';
import React from 'react';
import { formatDate } from '@/utils/dateUtils';
import styles from './showtimeCard.module.scss';
export interface ShowtimeCardProps {
  dateTime: Date;
  place: string;
  link: string;
  price?: string;
  isSoldOut?: boolean;
  unsoldTotalCount?: number | null;
}

// Добавьте 'async' перед компонентом
export const ShowtimeCard = async ({
  dateTime,
  place,
  link,
  price,
}: ShowtimeCardProps) => {
  // Выполняем запрос на сервере
  const isSoldOut = await fetch(link)
    .then((res) => !res.ok)
    .catch(() => true);
  return (
    <div className={styles.showtimeCard}>
      <Card
        title={<h3>{formatDate(new Date(dateTime))}</h3>}
        style={{ width: '100%' }}
      >
        <div className={styles.content}>
          <h3 style={{ fontWeight: 100 }}>{place}</h3>
          <div className={styles.footer}>
            <BuyTicketButton
              disabled={isSoldOut}
              className={styles.button}
              price={price}
              url={link}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

// style={{ height: '5rem', display: 'block' }}
