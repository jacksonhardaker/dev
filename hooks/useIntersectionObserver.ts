import { RefObject, useCallback, useEffect, useState } from 'react';

export const useIntersectionObserver = (
  element: RefObject<HTMLElement>,
  callback: (entry: IntersectionObserverEntry) => void
) => {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  const handleIntersection: IntersectionObserverCallback = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    },
    []
  );

  useEffect(() => {
    if (element.current) {
      const obs = new IntersectionObserver(handleIntersection, {
        threshold: 0.1,
      });
      setObserver(obs);
      obs.observe(element.current);
    }
  }, [element, callback]);

  return observer;
};
