import { useGlobalIntersectionObserver } from '@context/GlobalIntersectionObserver';
import sdk from '@stackblitz/sdk';
import { useEffect, FC, useRef, useCallback } from 'react';

export const StackBlitz: FC<{
  id: string;
  openFile?: string;
  clickToLoad?: boolean;
  hideNavigation?: boolean;
}> = ({
  id,
  openFile = 'index.js',
  clickToLoad = true,
  hideNavigation = true,
}) => {
  const initialized = useRef(false);
  const el = useRef(null);
  const renderSandbox = useCallback(() => {
    if (!initialized.current) {
      sdk.embedProjectId(id, id, {
        openFile,
        clickToLoad,
        hideNavigation,
        hideExplorer: true,
      });
      initialized.current = true;
    }
  }, []);
  useGlobalIntersectionObserver(el, renderSandbox, true);

  return <div ref={el} style={{ height: '300px' }} id={id}></div>;
};
