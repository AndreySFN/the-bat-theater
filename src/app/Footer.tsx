import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer style={{display: 'flex', justifyContent: 'center', textAlign: 'center', margin: '40px 0 20px 0'}}>
      <p style={{ fontSize: '1rem', color: 'gray', fontStyle: 'italic' }}>
        ИП Петров Андрей Валентинович 
        ОГРНИП: 324508100044321 | ИНН: 500715842418<br />
        <br />
        © 2024 Все права защищены. <Link href="https://bestcv.pro" passHref>bestcv.pro</Link>
      </p>
    </footer>
  );
};

