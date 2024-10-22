import Link from 'next/link';
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        margin: '40px 0 0 0',
        padding: '1rem 0',
        background: '#610b00',
      }}
    >
      <p style={{ fontSize: '1rem', color: 'white', fontStyle: 'italic' }}>
        ИП Петров Андрей Валентинович ОГРНИП: 324508100044321 | ИНН:
        500715842418
        <br />
        <br />© 2024 Все права защищены.{' '}
        <Link href="https://bestcv.pro" passHref>
          bestcv.pro
        </Link>
      </p>
    </footer>
  );
};
