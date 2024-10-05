/* eslint-disable */
// @ts-nocheck
import React from 'react';
import Script from 'next/script';

interface YMOptions {
  clickmap?: boolean;
  trackLinks?: boolean;
  accurateTrackBounce?: boolean;
  webvisor?: boolean;
  // Вы можете добавить дополнительные опции, если необходимо
  [key: string]: any;
}

interface YandexMetrikaProps {
  id: string;
  options?: YMOptions;
}

export const YandexMetrika: React.FC<YandexMetrikaProps> = ({
  id,
  options,
}) => (
  <>
    <Script id={`yandex-metrika-${id}`} strategy="afterInteractive">
      {`
        (function(m,e,t,r,i,k,a){
          m[i]=m[i]||function(){
            (m[i].a=m[i].a||[]).push(arguments)
          };
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {
            if (document.scripts[j].src === r) { return; }
          }
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],
          k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(${id}, "init", ${JSON.stringify(options)});
      `}
    </Script>
  </>
);

YandexMetrika.defaultProps = {
  options: {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  },
};
