// Убираем 'use client'
import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';
interface BuyTicketButtonProps {
  url: string;
  price?: string;
  isSoldOut: boolean;
  className?: string;
}

export const BuyTicketButton = ({
  url,
  price,
  isSoldOut,
  className = '',
}: BuyTicketButtonProps) => {
  return (
    <Button disabled={isSoldOut} type="primary" className={className}>
      <Link href={url}>
        <h3>{isSoldOut ? 'ПРОДАЖИ ЗАКРЫТЫ' : 'КУПИТЬ БИЛЕТ'}</h3>
        <div>{price && !isSoldOut && <h4>{price}</h4>}</div>
      </Link>
    </Button>
  );
};
