/* eslint-disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client';
import Script from 'next/script';
import React from 'react';
const YandexMetrika = ({ counter }) => {
  // Функция для генерации inline-скриптов для инициализации Метрики
  const generateInitScript = (counterId: never) => `
    ym(${counterId}, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true
    });
  `;

  // @ts-ignore
  return (
    <>
      {
        <div key={counter.id}>
          {/* Скрипт Яндекс.Метрики */}
          <Script
            strategy="afterInteractive"
            src="https://mc.yandex.ru/metrika/tag.js"
            onLoad={() => {
              window.ym =
                window.ym ||
                function () {
                  // eslint-disable-next-line prefer-rest-params
                  (window.ym.a = window.ym.a || []).push(arguments);
                };
              window.ym(counter.id, 'init', {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true,
                // eslint-disable-next-line react/prop-types
                ...counter.options, // Дополнительные опции, если необходимо
              });
            }}
          />

          {/* Inline-скрипт для инициализации Метрики */}
          <Script
            id={`yandex-metrika-init-${counter.id}`}
            strategy="afterInteractive"
          >
            {generateInitScript(counter.id)}
          </Script>
        </div>
      }
    </>
  );
};

export default YandexMetrika;
