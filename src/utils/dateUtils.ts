/**
 * Форматирует дату в строку вида "день месяц, часы:минуты".
 * @param date Объект Date.
 * @returns Отформатированная строка.
 */
export const formatDate = (date?: Date): string => {
  if (!date) {
    return '';
  }
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day} ${month}, ${hours}:${minutes}`;
};
