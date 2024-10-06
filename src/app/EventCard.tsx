import { Button, Card } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { CMeta } from './CMeta';
import React from 'react';

export interface EventCardProps {
  imageUrl: string;
  title: string;
  desc: string;
  subtitle?: string;
  href: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  desc,
  imageUrl,
  subtitle,
  href,
}: EventCardProps) => {
  const metaTitle = (
    <>
      {subtitle && <h5>{subtitle}</h5>}
      <h4 style={{ textWrap: 'balance' }}>{title}</h4>
    </>
  );
  return (
    <Link href={href}>
      <Card
        hoverable
        style={{
          width: 240,
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        cover={<Image alt="АФИША" src={imageUrl} width={280} height={300} />}
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        <div
          style={{
            flexGrow: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <CMeta title={metaTitle} description={desc} />
          <Button style={{ marginTop: '1.5rem' }}>подробности и билеты</Button>
        </div>
      </Card>
    </Link>
  );
};
