import { useState, useEffect } from 'react';

/*
 * @Deprecated
 * This hook is deprecated and is replaced by "import { useLocalStorage } app-shared/hooks/useWebStorage"
 */
export const useLocalStorage = (key: string) => {
  const [valueInStorage, setValueInStorage] = useState(localStorage.getItem(key));

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        setValueInStorage(event.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return valueInStorage;
};

// TODO: Add tests for this hook
