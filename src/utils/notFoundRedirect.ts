import { notFound } from 'next/navigation';

export const notFoundRedirect = async <T>( // TODO: Подумать есть ли решение изящнее
  callback: () => Promise<T>
): Promise<T> => {
  try {
    return await callback();
  } catch {
    notFound();
  }
};
