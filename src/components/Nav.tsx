import React, { FC } from "react"
import { Link } from "@reach/router"

interface Page {
  name: string
  path: string
}

const pages: Page[] = [
  { name: "Introduction", path: "/introduction" },
  { name: "Blog", path: "/blog" },
  { name: "Works", path: "/works" },
  { name: "Links", path: "/links" }
]

const NavItem: FC<Page> = ({ name, path }) => (
  <li>
    <Link to={path}>{ name }</Link>
  </li>
)

const Nav: FC<{}> = () => (
  <section>
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
