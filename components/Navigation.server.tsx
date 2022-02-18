import Link from 'next/link';
import { VFC } from 'react';
// import ToggleDarkModeButton from './ToggleDarkModeButton';

const links = [
  { href: '/', label: 'home' },
  { href: '/blog/page/1', label: 'blog' },
];

export const Navigation: VFC = () => (
  <nav>
    <ul>
      {links.map(({ href, label }) => (
        <li key={href}>
          <Link href={href}>{label}</Link>
        </li>
      ))}
      <li className="right">{/* <ToggleDarkModeButton /> */}</li>
    </ul>

    {/* <style jsx>{`
      nav {
        text-align: center;
      }
      ul {
        display: flex;
      }
      nav > ul {
        padding: 4px 0;
        margin-left: -13px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      li.right {
        margin: 0 0 0 auto;
      }
      a {
        text-decoration: none;
        padding: 3px 5px;
      }
    `}</style> */}
  </nav>
);

export default Navigation;
