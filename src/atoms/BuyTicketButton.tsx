'use client';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';
interface BuyTicketButtonProps {
  url: string;
  price?: string;
  className?: string;
}

import s from './BuyTicketButton.module.scss';
import { Loader } from '@/atoms/Loader';

export const BuyTicketButton = ({
  url,
  price,
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
        type="primary"
        className={className}
        onClick={() => setVisible(true)}
      >
        <div>
          <h3>{'КУПИТЬ БИЛЕТ'}</h3>
          <div>{price && <h4>{price}</h4>}</div>
        </div>
      </Button>
      <Modal
        title="Покупка билета"
        width="80vw"
        centered
        open={visible}
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
