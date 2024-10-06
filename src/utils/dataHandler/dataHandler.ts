import fs from 'fs/promises';
import path from 'path';

import {
  IPreviews,
  RootObject,
  RecordObjectElement,
  TDataObject,
} from '@/utils/dataHandler/types';

/**
 * Загружает и парсит JSON-файл.
 * @param filename Имя файла.
 * @returns Распарсенный объект.
 */
const loadJsonFile = async <T>(filename: string): Promise<T> => {
  const jsonPath = path.join(process.cwd(), filename);
  try {
    const fileContents = await fs.readFile(jsonPath, 'utf8');
    return JSON.parse(fileContents) as T;
  } catch (error) {
    console.error(`Ошибка при чтении файла ${filename}:`, error);
    throw error;
  }
};

/**
 * Загружает все данные из records.json и преобразует dateTime в объекты Date.
 * @returns Массив объектов RootObject.
 */
export const getAllData = async (): Promise<TDataObject> => {
  const data = await loadJsonFile<TDataObject>('records.json');

  // Преобразуем строки dateTime в объекты Date
  Object.values(data).forEach((rootObject) => {
    Object.values(rootObject.elements).forEach((element) => {
      element.options.forEach((option) => {
        option.dateTime = new Date(option.dateTime);
      });
    });
  });

  return data;
};

/**
 * Получает данные по имени записи (name).
 * @param place Имя записи (например, ключ элемента).
 * @returns Объект RecordElement или null, если не найден.
 */
export const getRootObject = async (
  place: string
): Promise<RootObject | null> => {
  const data = await getAllData();
  return data[place];
};

export const getRootObjectElementList = async (
  place: string
): Promise<Record<string, RecordObjectElement> | null> => {
  const rootObject = await getRootObject(place);
  return rootObject?.elements || null;
};

/**
 * Загружает данные для главного каруселя из main_carousel.json.
 * @returns Массив объектов IPreviews.
 */
export const getMainCarousel = async (): Promise<IPreviews[]> => {
  return await loadJsonFile<IPreviews[]>('main_carousel.json');
};

// dataHandler.ts

/**
 * Извлекает источник пользователя из searchParams.
 * @param searchParams Объект с параметрами поиска.
 * @returns Источник пользователя или undefined.
 */
export const getTicketKey = (searchParams: {
  [key: string]: string | string[] | undefined;
}): string | undefined => {
  if (searchParams.source) {
    if (Array.isArray(searchParams.source)) {
      return searchParams.source[0];
    }
    return searchParams.source;
  }
  return undefined;
};
