'use client'
import { Button, Spin } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface BuyTicketButtonProps {
  url: string;
  price?: string;
}

export const BuyTicketButton = ({ url, price }: BuyTicketButtonProps) => {
const [isLoading, setIsLoading] = useState(true);
const [isSoldOut, setIsSoldOut] = useState(false)
useEffect(() => {
  const checkUrlStatus = async () => {

    try {
      await fetch(url, { method: 'GET' });
    } catch (error) {
      console.error('Error fetching URL:', error);
      setIsSoldOut(true);
    } finally {
      setIsLoading(false);
    }
  };

  checkUrlStatus();
}, [url])

const Component = <Link href={url}>
<Button disabled={isSoldOut} type="primary" style={{height: '5rem', display: 'block'}}>
    <h3>{isSoldOut? 'ПРОДАЖИ ЗАКРЫТЫ' : 'КУПИТЬ БИЛЕТ'}</h3>
    <div>
      {price && !isSoldOut && <h4>{price}</h4>}
    </div>
  </Button>
  </Link>

return isLoading ? <Spin/> : Component

};
