import {
  useEffect,
  useState
} from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T): [T | undefined, (value: T) => void, () => void] => {
  const [ item, setItem ] = useState<T | undefined>(initialValue);

  useEffect(() => {
    const value = getItem();
    if (value === null) localStorage.setItem(key, JSON.stringify(initialValue));

    setItem(value !== null && value !== undefined ? value : initialValue);
  }, []);

  const setValue = (value: T): void => {
    setItem(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getItem = (): T | undefined => {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
    }
  };

  const removeValue = (): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return [ item, setValue, removeValue ];
};
