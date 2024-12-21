import { ErrorPage } from '@/atoms/ErrorPage';

export default () => (
  <ErrorPage
    title="Ой-ой! Кажется что-то пошло не так :("
    subtitle="Мы уже в курсе случившегося и скоро всё починим"
    navigationMessage="А пока вы можете посмотреть наши афиши"
    imageSrc="/error.png"
  />
);
