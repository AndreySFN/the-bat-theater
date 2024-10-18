import { Button, Card } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Meta from 'antd/es/card/Meta';

export interface EventCardProps {
  imageUrl: string;
  blurDataURL?: string;
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
  blurDataURL,
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
        cover={
          <Image
            priority
            alt="АФИША"
            placeholder={blurDataURL ? 'blur' : 'empty'}
            blurDataURL={blurDataURL}
            src={imageUrl}
            width={280}
            height={300}
          />
        }
        styles={{
          body: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexGrow: 1,
          },
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
          <Meta title={metaTitle} description={desc} />
          <Button style={{ marginTop: '1.5rem' }}>подробности и билеты</Button>
        </div>
      </Card>
    </Link>
  );
};
