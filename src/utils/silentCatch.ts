export const silentCatch =<T> (callback: () => Promise<T>): Promise<T | null> => {
    try{
       return callback()
    } catch {}
    return Promise.reject(null)
}