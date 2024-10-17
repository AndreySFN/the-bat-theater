import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const Custom404: FC = () => {
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
        src="/404.png"
        alt="404"
        width={500}
        height={500}
        style={{ maxWidth: '100%', height: 'auto', borderRadius: '16px' }}
      />
      <h1 style={{ margin: '10px 0' }}>К сожалению, такой страницы нет</h1>
      <h2 style={{ margin: '10px 0' }}>
        Но вы всегда можете посмотреть нашу афишу
      </h2>
      <Link href="/" passHref>
        <Button type="primary" style={{ padding: '10px 20px' }}>
          <h2 style={{ margin: 0 }}>Смотреть афишу</h2>
        </Button>
      </Link>
    </div>
  );
};

export default Custom404;
