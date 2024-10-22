'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from 'antd';
import { MarkdownModal } from '@/atoms/markdown';
import { RouteLoader } from '@/molecules/BatLoader/BatLoader';

export interface IFooterProps {
  privatePolicy: string;
  userAgreement: string;
}

export const Footer: React.FC<IFooterProps> = ({
  privatePolicy,
  userAgreement,
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [content, setContent] = useState('');
  const showPrivatePolicyModal = () => {
    setContent(privatePolicy);
    setIsModalVisible(true);
  };

  const showUserAgreementModal = () => {
    setContent(userAgreement);
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <footer
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        margin: '40px 0 0 0',
        padding: '1rem 0',
        background: '#610b00',
      }}
    >
      <div>
        <p style={{ fontSize: '1rem', color: 'white', fontStyle: 'italic' }}>
          ИП Петров Андрей Валентинович ОГРНИП: 324508100044321 | ИНН:
          500715842418
          <br />
          <br />© 2024 Все права защищены.{' '}
          <Link href="https://bestcv.pro" passHref>
            bestcv.pro
          </Link>
        </p>
      </div>
      <div>
        <Button type="link" onClick={showPrivatePolicyModal}>
          Политика конфиденциальности
        </Button>
        |
        <Button type="link" onClick={showUserAgreementModal}>
          Пользовательское соглашение
        </Button>
        <MarkdownModal
          isVisible={isModalVisible}
          onClose={handleClose}
          markdownContent={content}
          title="Пользовательское соглашение"
          okText="Прочитал(а) и соглас(ен/на)"
        />
        <RouteLoader />
      </div>
    </footer>
  );
};
