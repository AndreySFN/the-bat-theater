'use client';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';
interface BuyTicketButtonProps {
  url: string;
  price?: string;
  isSoldOut: boolean;
  className?: string;
}

import s from './BuyTicketButton.module.scss';
import { Loader } from '@/atoms/Loader';

export const BuyTicketButtonQTicket = ({
  url,
  price,
  isSoldOut,
  className = '',
}: BuyTicketButtonProps) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const iframeLoadedCallback = () => {
    setLoading(false);
  };
  return (
    <>
      <Button
        disabled={isSoldOut}
        type="primary"
        className={className}
        onClick={() => setVisible(true)}
      >
        {/*<Link href={url}>*/}
        <h3>{isSoldOut ? 'ПРОДАЖИ ЗАКРЫТЫ' : 'КУПИТЬ БИЛЕТ'}</h3>
        <br />
        <div>{price && !isSoldOut && <h4>{price}</h4>}</div>
        {/*</Link>*/}
      </Button>
      <Modal
        title="Покупка билета"
        visible={visible}
        className={s.modal}
        onClose={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        {loading && <Loader />}
        <iframe className={s.iframe} src={url} onLoad={iframeLoadedCallback} />
      </Modal>
    </>
  );
};
