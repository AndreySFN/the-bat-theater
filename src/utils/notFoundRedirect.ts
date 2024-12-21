import { notFound } from 'next/navigation';

export const notFoundRedirect = async <T>(
  callback: () => Promise<T>
): Promise<T> => {
  try {
    return await callback();
  } catch {
    notFound();
  }
};
