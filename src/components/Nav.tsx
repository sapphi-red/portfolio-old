import React, { FC } from 'react'
import { navigate } from '@reach/router'

interface Page {
  name: string
  path: string
}

const pages: Page[] = [
  { name: 'Introduction', path: '/introduction' },
  { name: 'Blog', path: '/blog' },
  { name: 'Works', path: '/works' },
  { name: 'Links', path: '/links' }
]

const NavItem: FC<Page> = ({ name, path }) => (
  <li
    onClick={(): void => {
      navigate(path)
    }}
  >
    {name}
  </li>
)

const Nav: FC<{}> = () => (
  <section id="navigator">
    <nav>
      <ul>
        {pages.map(page => (
          <NavItem {...page} key={page.path} />
        ))}
      </ul>
    </nav>
  </section>
)

export default Nav
