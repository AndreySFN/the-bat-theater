import { BuyTicketButton } from '@/app/atoms/BuyTicketButtonProps';
import { Card } from 'antd';
import React from 'react';
import { formatDate } from '../utils';
import styles from './showtimeCard.module.scss';
export interface ShowtimeCardProps {
  dateTime: Date;
  place: string;
  link: string;
  price?: string;
}

// Добавьте 'async' перед компонентом
export const ShowtimeCard = async ({
  dateTime,
  place,
  link,
  price,
}: ShowtimeCardProps) => {
  // Выполняем запрос на сервере
  const SUCCESS_STATUS_CODES = [200, 302];
  let isSoldOut = false;

  try {
    const response = await fetch(link, { method: 'GET', cache: 'no-cache' });
    console.log(`Status for ${link}: ${response.status}`);

    if (!SUCCESS_STATUS_CODES.includes(response.status)) {
      isSoldOut = true;
    }
  } catch (error) {
    console.error(`Error fetching ${link}:`, error);
    isSoldOut = true; // Если произошла ошибка, считаем, что билеты распроданы
  }

  return (
    <div className={styles.showtimeCard}>
      <Card title={<h3>{formatDate(dateTime)}</h3>} style={{ width: '100%' }}>
        <div className={styles.content}>
          <h3 style={{ fontWeight: 100 }}>{place}</h3>
          <BuyTicketButton price={price} url={link} isSoldOut={isSoldOut} />
        </div>
      </Card>
    </div>
  );
};
