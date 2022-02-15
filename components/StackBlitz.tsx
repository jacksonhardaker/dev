import sdk from '@stackblitz/sdk';
import { useEffect, VFC } from 'react';

export const StackBlitz: VFC<{
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
  useEffect(() => {
    sdk.embedProjectId(id, id, {
      openFile,
      clickToLoad,
      hideNavigation,
      hideExplorer: true,
    });
  }, [id, openFile, clickToLoad]);
  return <div id={id}></div>;
};
