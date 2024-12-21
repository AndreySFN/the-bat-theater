export const silentCatch = <T>(
  callback: () => Promise<T>
): Promise<T | null> => {
  try {
    return callback();
  } catch (e) {
    console.error(e);
  }
  return Promise.reject(null);
};
