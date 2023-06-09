'use client';

import {
  createContext,
  FC,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type ContextValue = {
  observe: (
    element: HTMLElement,
    callback: IntersectionObserverCallback,
    once?: boolean
  ) => void;
  unobserve: (element: HTMLElement) => void;
  observer: IntersectionObserver | null;
};

const ctx = createContext<ContextValue | null>(null);

const { Provider } = ctx;

export const GlobalIntersectionObserverProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const [subscribers, setSubscribers] = useState<
    Array<[HTMLElement, IntersectionObserverCallback, boolean]>
  >([]);

  useEffect(() => {
    const globalHandler: IntersectionObserverCallback = (
      entities,
      observer
    ) => {
      entities.forEach((entry) => {
        if (entry.isIntersecting) {
          const [element, targetCallback, once] =
            subscribers.find(([el]) => el === entry.target) || [];
          if (targetCallback) {
            targetCallback(entities, observer);

            if (once && element) {
              unobserve(element);
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(globalHandler, {
      threshold: 0.2,
    });
    setObserver(observer);

    return () => {
      observer?.disconnect?.();
    };
  }, [subscribers]);

  const observe: ContextValue['observe'] = useCallback(
    (element, callback, once) => {
      setSubscribers((subs) => [...subs, [element, callback, !!once]]);
    },
    []
  );

  const unobserve = useCallback(
    (element: HTMLElement) => {
      observer?.unobserve?.(element);
      setSubscribers((subs) => subs.filter(([el]) => el !== element));
    },
    [observer]
  );

  useEffect(() => {
    subscribers.forEach(([el]) => {
      observer?.observe?.(el);
    });
  }, [subscribers, observer]);

  const value = useMemo(
    () => ({
      observe,
      unobserve,
      observer,
    }),
    [observe, unobserve, observer]
  );

  return <Provider value={value}>{children}</Provider>;
};

export const useGlobalIntersectionObserver = (
  element: RefObject<HTMLElement>,
  callback: IntersectionObserverCallback,
  once?: boolean
) => {
  const { observe, unobserve } = useContext(ctx) || {};

  useEffect(() => {
    if (element.current) {
      observe?.(element.current, callback, once);
    }
    return () => {
      if (element.current) {
        unobserve?.(element.current);
      }
    };
  }, [element, callback]);
};
