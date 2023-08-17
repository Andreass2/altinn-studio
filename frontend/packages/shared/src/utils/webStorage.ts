/*
 * Utils for interacting with the browser's storage API with type safety.
 * This abstract the needs to manually serialize and deserialize values.
 */
export type TypedStorage = {
  setItem: <T>(key: string, value: T) => void;
  getItem: <T>(key: string) => T | undefined;
  removeItem: (key: string) => void;
};

type WebStorage = Pick<Storage, 'setItem' | 'getItem' | 'removeItem'>;

const createWebStorage = (storage: WebStorage): TypedStorage => {
  if (!storage) {
    console.warn('Storage API not available. The browser might not support the provided storage.');
  }

  return {
    setItem: <T>(key: string, value: T): void => storage.setItem(key, JSON.stringify(value)),
    getItem: <T>(key: string): T | undefined => {
      const storedItem = storage.getItem(key);
      if (!storedItem) {
        return undefined;
      }

      try {
        return JSON.parse(storedItem) as T;
      } catch (error) {
        console.warn(
          `Failed to parse stored item with key ${key}. Ensure that the item is a valid JSON string. Error: ${error}`
        );
      }
    },
    removeItem: (key: string): void => storage.removeItem(key),
  };
};

/* Only localStorage is implemented for now, but we can add session storage if needed by adding:
 * const typedSessionStorage = createWebStorage(window?.sessionStorage)
 */
export const typedLocalStorage = createWebStorage(window?.localStorage);
