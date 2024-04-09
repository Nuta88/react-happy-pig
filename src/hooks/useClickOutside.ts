import {
  useRef,
  useEffect,
  RefObject
} from 'react';

export const useClickOutside = <T extends HTMLElement>(callback: () => void): RefObject<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const click = ({ target }: Event): void => {
      if (target && ref.current && !ref.current.contains(target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', click);

    return () => {
      document.removeEventListener('mousedown', click);
    };
  }, []);

  return ref;
};
