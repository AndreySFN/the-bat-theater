import { Button } from 'antd';
import Link from 'next/link';

interface BuyTicketButtonProps {
  url: string;
}

export const BuyTicketButton = ({ url }: BuyTicketButtonProps) => (
<Link href={url}>
<Button type="primary">
    <h3>КУПИТЬ БИЛЕТ</h3>
  </Button>
  </Link>
);
