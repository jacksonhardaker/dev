import Link from 'next/link';
import ToggleDarkModeButton from './ToggleDarkModeButton';

const links = [
  { href: '/', label: 'home' },
  { href: '/blog/page/1', label: 'blog' },
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Nav = () => (
  <nav>
    <ul>
      {links.map(({ key, href, label }) => (
        <li key={key}>
          <Link href={href}>
            <a>{label}</a>
          </Link>
        </li>
      ))}
      <li className="right">
        <ToggleDarkModeButton />
      </li>
    </ul>

    <style jsx>{`
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
    `}</style>
  </nav>
)

export default Nav
