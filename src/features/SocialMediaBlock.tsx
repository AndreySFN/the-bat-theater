import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { BOOSTY_LOGO, TG_URL, VK_URL } from '@/consts';

export const SocialMediaBlock = () => {
  // TODO: Исправить эту побыстрейку
  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <h3 style={{ fontSize: '2rem' }}>
        🎄 Будь в курсе анонсов и получай бонусы за поддержку 🎁
      </h3>
      <div
        style={{
          display: 'flex',
          gap: '3rem',
          justifyContent: 'center',
          paddingTop: '1rem',
        }}
      >
        <Link href={VK_URL}>
          <Image src="/icons/vk-logo.png" alt="icon" height={60} width={60} />
        </Link>
        <Link href={TG_URL}>
          <Image src="/icons/tg-logo.png" alt="icon" height={60} width={60} />
        </Link>
        <Link href={BOOSTY_LOGO}>
          <Image
            src="/icons/boosty-logo.png"
            alt="icon"
            height={60}
            width={60}
          />
        </Link>
      </div>
    </div>
  );
};
