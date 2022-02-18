import { FC } from 'react';
import styles from './VisuallyHidden.module.css';

export const VisuallyHidden: FC = ({ children }) => (
  <div tabIndex={-1} className={styles.hidden}>{children}</div>
);
