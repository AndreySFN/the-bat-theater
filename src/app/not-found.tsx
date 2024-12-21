import { FC } from 'react';
import React from 'react';
import { ErrorPage } from '@/atoms/ErrorPage';

const Custom404: FC = () => {
  return (
    <ErrorPage
      title="К сожалению, такой страницы нет"
      subtitle="Возможно мероприятие уже прошло и онлайн-афиша снята с публикации"
      navigationMessage="Но вы всегда можете посмотреть нашу актуальную афишу"
      imageSrc="/404.png"
    />
  );
};

export default Custom404;
