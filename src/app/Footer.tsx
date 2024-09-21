import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
      <p style={{ fontSize: '0.7rem', color: 'gray', fontStyle: 'italic' }}>
        ИП Петров Андрей Валентинович 
        ОГРНИП: 324508100044321 | ИНН: 500715842418<br />
        <Link href="https://bestcv.pro" passHref>
          <p style={{ color: 'gray' }}>bestcv.pro</p>
        </Link>
        <br />
        © 2024 Все права защищены.
      </p>
    </footer>
  );
};

