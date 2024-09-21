// BuyTicketButton.tsx
'use client';

import { Button } from 'antd';

interface BuyTicketButtonProps {
  url: string;
}

export const BuyTicketButton = ({ url }: BuyTicketButtonProps) => (
  <Button type="primary" onClick={() => (window.location.href = url)}>
    <h3>КУПИТЬ БИЛЕТ</h3>
  </Button>
);
