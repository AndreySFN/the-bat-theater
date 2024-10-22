import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export const MainMap = ({ className }: { className?: string }) => (
  <div className={className}>
    <a
      href="https://yandex.com/maps/10733/klin/?utm_medium=mapframe&utm_source=maps"
      style={{
        color: '#eee',
        fontSize: '12px',
        position: 'absolute',
        top: '0px',
      }}
    >
      {'>'}
      Клин
    </a>
    <a
      href="https://yandex.com/maps/10733/klin/house/ulitsa_zakhvatayeva_4/Z08YcQVpQEABQFtsfX9zeH5nZg==/?ll=36.729956%2C56.329243&source=serp_navig&utm_medium=mapframe&utm_source=maps&z=17.13"
      style={{
        color: '#eee',
        fontSize: '12px',
        position: 'absolute',
        top: '14px',
      }}
    >
      Улица Захватаева, 4 — Яндекс Карты
    </a>
    <iframe
      src="https://yandex.com/map-widget/v1/?ll=36.729956%2C56.329243&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1Njg2MjA3NBJf0KDQvtGB0YHQuNGPLCDQnNC-0YHQutC-0LLRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwg0JrQu9C40L0sINGD0LvQuNGG0LAg0JfQsNGF0LLQsNGC0LDQtdCy0LAsIDQiCg166xJCFSVRYUI%2C&source=serp_navig&z=17.13"
      width="100%"
      height="400"
      allowFullScreen
      style={{ position: 'relative' }}
    />
  </div>
);
