import fs from 'fs';
import path from 'path';

import { DataTransferObject } from './types';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllData = (): Record<string, DataTransferObject> => {
  const jsonPath = path.join(process.cwd(), 'records.json');
  const fileContents = fs.readFileSync(jsonPath, 'utf8');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: Record<string, DataTransferObject> = JSON.parse(fileContents);
  return Object.entries(data).reduce(
    (acc, [key, element]) => ({
      ...acc,
      [key]: {
        ...element,
        options: element.options.map((option) => ({
          ...option,
          dateTime: new Date(option.dateTime),
        })),
      },
    }),
    {}
  );
};

export const getData = (recordId: string): DataTransferObject | null => {
  const data = getAllData()[recordId];
  if (!data) return null;

  // Конвертируем строки даты в объекты Date
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.log(data);
  return data as DataTransferObject;
};
