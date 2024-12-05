// TODO: Пересмотреть
'use client';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Loader } from '@/atoms/Loader';

export const RouteLoader = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const handleLinkClick = (e) => {
      const link = e.target.closest('a');
      if (link && link.href) {
        // Проверяем, является ли ссылка внутренней
        const isInternalLink = link.href.startsWith(window.location.origin);

        // Если внутренняя, используем Next.js роутинг
        if (isInternalLink) {
          e.preventDefault();
          setLoading(true);
          router.push(link.href.replace(window.location.origin, ''));
        } else {
          // Если внешняя ссылка, показываем загрузчик и используем обычный переход
          setLoading(true);
          setTimeout(() => {
            window.location.href = link.href;
          }, 500); // Задержка для отображения загрузчика перед переходом
        }
      }
    };

    // Добавляем обработчик кликов на весь документ
    document.addEventListener('click', handleLinkClick);

    return () => {
      // Очищаем обработчик при размонтировании компонента
      document.removeEventListener('click', handleLinkClick);
    };
  }, [router]);

  // Скрываем загрузчик при завершении навигации
  useEffect(() => {
    if (loading) {
      // Блокируем скролл при включенном загрузчике
      document.body.style.overflow = 'hidden';
    } else {
      // Разблокируем скролл
      document.body.style.overflow = '';
    }
  }, [loading]);

  // Когда меняется маршрут, скрываем загрузчик
  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  return loading && <Loader />;
};
