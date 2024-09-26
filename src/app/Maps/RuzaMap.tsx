import React from 'react';

export const RuzaMap: React.FC = () => (
  <div style={{ position: 'relative', overflow: 'hidden' }}>
    <a
      href="https://yandex.com/maps/org/tsentr_kultury_i_iskusstv_g_ruza/1101603133/?utm_medium=mapframe&utm_source=maps"
      style={{
        color: '#eee',
        fontSize: '12px',
        position: 'absolute',
        top: '0px',
      }}
    >
      Центр Культуры и Искусств г. Руза
    </a>
    <a
      href="https://yandex.com/maps/10751/ruza/category/house_of_culture/184105876/?utm_medium=mapframe&utm_source=maps"
      style={{
        color: '#eee',
        fontSize: '12px',
        position: 'absolute',
        top: '14px',
      }}
    >
      Дом культуры в Рузе
    </a>
    <a
      href="https://yandex.com/maps/10751/ruza/category/theater_and_concert_tickets/184105870/?utm_medium=mapframe&utm_source=maps"
      style={{
        color: '#eee',
        fontSize: '12px',
        position: 'absolute',
        top: '28px',
      }}
    >
      Театрально-концертная касса в Рузе
    </a>
    <iframe
      src="https://yandex.com/map-widget/v1/?ll=36.189256%2C55.704507&mode=search&oid=1101603133&ol=biz&source=serp_navig&z=17.9"
      width="100%"
      height="400"
      allowFullScreen
      style={{ position: 'relative' }}
    ></iframe>
  </div>
);
