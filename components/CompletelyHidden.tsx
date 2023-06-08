import { FC } from 'react';
import styles from './CompletelyHidden.module.css';

export const CompletelyHidden: FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className={styles.hidden}>{children}</div>;
