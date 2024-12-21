import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import React from 'react';

export interface IErrorPageProps {
  title: string;
  subtitle: string;
  navigationMessage: string;
  imageSrc: string;
}

export const ErrorPage = ({
  title,
  subtitle,
  navigationMessage,
  imageSrc,
}: IErrorPageProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        gap: '20px',
      }}
    >
      <Image
        src={imageSrc}
        alt="404"
        width={500}
        height={500}
        style={{ maxWidth: '100%', height: 'auto', borderRadius: '16px' }}
      />
      <h1 style={{ margin: '10px 0' }}>{title}</h1>
      <h2 style={{ margin: '0 0 10px 0' }}>{subtitle}</h2>
      <h2 style={{ margin: '10px 0' }}>{navigationMessage}</h2>
      <Link href="/" passHref>
        <Button type="primary" style={{ padding: '10px 20px' }}>
          <h2 style={{ margin: 0 }}>Смотреть афишу</h2>
        </Button>
      </Link>
    </div>
  );
};

ErrorPage.displayName = 'ErrorPage';
