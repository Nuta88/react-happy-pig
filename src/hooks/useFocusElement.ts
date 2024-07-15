import { useEffect, useRef } from 'react';

export const useFocusElement = (id: string, delay: number): (() => void) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const onClearTimeout = (): void => {
    if (timerRef.current != null) clearTimeout(timerRef.current);
  };

  const focusElement = (): void => {
    onClearTimeout();
    timerRef.current = setTimeout(() => {
      const focusElement = document.getElementById(id);

      focusElement?.focus();
    }, delay);
  };

  useEffect(() => {
    focusElement();

    return () => {
      onClearTimeout();
    };
  }, [ id, delay ]);

  return focusElement;
};
