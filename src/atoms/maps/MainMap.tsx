import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export const MainMap = ({ className }: { className?: string }) => (
  <div className={className}>
    <iframe
      src="https://yandex.com/map-widget/v1/?ll=36.729956%2C56.329243&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1Njg2MjA3NBJf0KDQvtGB0YHQuNGPLCDQnNC-0YHQutC-0LLRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwg0JrQu9C40L0sINGD0LvQuNGG0LAg0JfQsNGF0LLQsNGC0LDQtdCy0LAsIDQiCg166xJCFSVRYUI%2C&source=serp_navig&z=17.13"
      width="100%"
      height="100%"
      allowFullScreen
      style={{ position: 'relative' }}
    />
  </div>
);
