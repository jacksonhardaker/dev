import { FC } from 'react';
import styles from './VisuallyHidden.module.css';

export const VisuallyHidden: FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <span className={styles.hidden} tabIndex={-1}>
    {children}
  </span>
);
