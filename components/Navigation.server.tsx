import Link from 'next/link';
import { VFC } from 'react';
import styled from '@styles/styled';
// import ToggleDarkModeButton from './ToggleDarkModeButton';

const { classNames: cn, Styles } = styled({
  container: {
    textAlign: 'center',
  },
  list: {
    display: 'flex',
    padding: '4px 0',
    marginLeft: '-13px',
  },
  listItem: {
    display: 'flex',
    padding: '6px 8px',
  },
  right: {
    margin: '0 0 0 auto',
  },
  link: {
    textDecoration: 'none',
    padding: '3px 5px',
  },
});

const links = [
  { href: '/', label: 'home' },
  { href: '/blog/page/1', label: 'blog' },
];

export const Navigation: VFC = () => (
  <>
    <Styles />
    <nav className={cn.container}>
      <ul className={cn.list}>
        {links.map(({ href, label }) => (
          <li key={href} className={cn.listItem}>
            <Link passHref={true} href={href}>
              <a className={cn.link}>{label}</a>
            </Link>
          </li>
        ))}
        <li className={`${cn.listItem} ${cn.right}`}>
          {/* <ToggleDarkModeButton /> */}
        </li>
      </ul>
    </nav>
  </>
);

export default Navigation;
