import { BuyTicketButton } from '@/atoms/BuyTicketButtonProps';
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
export const ShowtimeCard = async ({
  dateTime,
  place,
  link,
  price,
  unsoldTotalCount,
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
  } catch {
    console.error(`Error fetching ${link}:`);
    isSoldOut = true; // Если произошла ошибка, считаем, что билеты распроданы
  }

  return (
    <div className={styles.showtimeCard}>
      <Card title={<h3>{formatDate(dateTime)}</h3>} style={{ width: '100%' }}>
        <div className={styles.content}>
          <h3 style={{ fontWeight: 100 }}>{place}</h3>
          <div className={styles.footer}>
            <BuyTicketButton
              className={styles.button}
              price={price}
              url={link}
              isSoldOut={isSoldOut}
            />
            {Boolean(unsoldTotalCount) && !isSoldOut && (
              <h4>осталось билетов: {unsoldTotalCount}</h4>
            )}
            {isSoldOut && <h4>Все билеты проданы</h4>}
          </div>
        </div>
      </Card>
    </div>
  );
};

// style={{ height: '5rem', display: 'block' }}
