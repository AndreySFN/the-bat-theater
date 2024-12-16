// dataHandler.ts

import fs from 'fs/promises';
import path from 'path';

import {
  IPreviews,
  IRootObject,
  IRecordObjectElement,
  TDataObject,
  EUrlSearchKeyList,
  IOption,
  ITroupeElement,
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
 * Также извлекает ticketsTotalCount и nethouseId из nethouseLinks, если они присутствуют.
 * @returns Объект с данными типа TDataObject.
 */
export const getAllData = async (): Promise<TDataObject> => {
  const data = await loadJsonFile<TDataObject>('records.json');

  // Преобразуем строки dateTime в объекты Date и извлекаем дополнительные поля
  Object.values(data).forEach((rootObject) => {
    Object.values(rootObject.elements).forEach((element) => {
      element.options.forEach((option) => {
        // Преобразование dateTime
        if (typeof option.dateTime === 'string') {
          option.dateTime = new Date(option.dateTime);
        }
      });
    });
  });

  return data;
};

/**
 * Получает данные по имени записи (name).
 * @param place Имя записи (например, ключ элемента).
 * @returns Объект RootObject или null, если не найден.
 */
export const getRootObject = async (
  place: string
): Promise<IRootObject | null> => {
  const data = await getAllData();
  return data[place] || null;
};

/**
 * Получает список элементов (RecordObjectElement) по имени записи.
 * @param place Имя записи.
 * @returns Объект с элементами или null, если не найдено.
 */
export const getRootObjectElementList = async (
  place: string
): Promise<Record<string, IRecordObjectElement> | null> => {
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

/**
 * Извлекает значение из searchParams по заданному ключу.
 * @param searchParams Объект с параметрами поиска.
 * @param key Ключ для поиска.
 * @returns Значение или undefined.
 */
export const getSearchValue = (
  searchParams: Record<EUrlSearchKeyList, string>,
  key: EUrlSearchKeyList
): string | undefined => {
  const value = searchParams[key];
  if (value) {
    // Если значение массив, вернуть первый элемент
    if (Array.isArray(value)) {
      return value[0];
    }
    return value;
  }
  return undefined;
};

/**
 * Дополнительная функция для получения опций с доступными билетами.
 * @param place Имя записи.
 * @returns Массив опций или null.
 */
export const getOptionsWithTickets = async (
  place: string
): Promise<IOption[] | null> => {
  const elements = await getRootObjectElementList(place);
  if (!elements) return null;

  const optionsWithTickets: IOption[] = [];

  Object.values(elements).forEach((element) => {
    element.options.forEach((option) => {
      if (option.ticketsTotalCount && option.ticketsTotalCount > 0) {
        optionsWithTickets.push(option);
      }
    });
  });

  return optionsWithTickets;
};

/**
 * Загружает все данные из records.json и преобразует dateTime в объекты Date.
 * Также извлекает ticketsTotalCount и nethouseId из nethouseLinks, если они присутствуют.
 * @returns Объект с данными типа TDataObject.
 */
export const getTroupe = async (): Promise<Array<ITroupeElement>> => {
  return await loadJsonFile<Array<ITroupeElement>>('troupe.json');
};
