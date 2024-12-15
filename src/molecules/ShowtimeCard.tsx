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
  unsoldTotalCount?: number | null;
}

// Добавьте 'async' перед компонентом
export const ShowtimeCard = ({
  dateTime,
  place,
  link,
  price,
  unsoldTotalCount,
}: ShowtimeCardProps) => {
  // Выполняем запрос на сервере

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
