import { useCallback, useEffect, useState } from 'react';

export const useIntersectionObserver = (element, callback) => {
  const [observer, setObserver] = useState(null);

  const handleIntersection = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      callback(entry);
    }
  }, []);

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
