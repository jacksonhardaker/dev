import Link from 'next/link';
import ToggleDarkModeButton from '@components/ToggleDarkModeButton';
import styles from './Navigation.module.css';

const links = [
  { href: '/', label: 'home' },
  { href: '/blog/page/1', label: 'blog' },
];

export const Navigation = () => (
  <nav className={styles.container}>
    <ul className={styles.list}>
      {links.map(({ href, label }) => (
        <li className={styles.listItem} key={href}>
          <Link href={href} className={styles.link}>
            {label}
          </Link>
        </li>
      ))}
      <li className={styles.listItemRight}>
        <ToggleDarkModeButton />
      </li>
    </ul>
  </nav>
);

export default Navigation;
