// Убираем 'use client'
import { Button } from 'antd';
import Link from 'next/link';

interface BuyTicketButtonProps {
  url: string;
  price?: string;
  isSoldOut: boolean;
}

export const BuyTicketButton = ({ url, price, isSoldOut }: BuyTicketButtonProps) => {
  return (
    <Link href={url}>
      <Button disabled={isSoldOut} type="primary" style={{ height: '5rem', display: 'block' }}>
        <h3>{isSoldOut ? 'ПРОДАЖИ ЗАКРЫТЫ' : 'КУПИТЬ БИЛЕТ'}</h3>
        <div>
          {price && !isSoldOut && <h4>{price}</h4>}
        </div>
      </Button>
    </Link>
  );
};
