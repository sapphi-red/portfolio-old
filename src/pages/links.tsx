import React, { FC } from "react"

interface TypeLink {
  icon: string
  link: string
  title: string
}

const links: TypeLink[] = [
  {
    title: "Twitter (@sapphi_red)",
    link: "https://twitter.com/sapphi_red",
    icon: "/img/Twitter_Logo_Blue.png"
  },{
    title: "GitHub (sapphi-red)",
    link: "https://github.com/sapphi-red",
    icon: "/img/GitHub-Mark-64px.png"
  }, {
    title: "Qiita (sapphi-red)",
    link: "https://qiita.com/sapphi-red",
    icon: "/img/qiita-favicon.png"
  }, {
    title: "AtCoder (sapphi_red)",
    link: "https://atcoder.jp/users/sapphi_red",
    icon: "/img/AtCoder.png"
  }
]

const LinkItem: FC<TypeLink> = ({ icon, link, title }) => (
  <li>
    <a href={link}>
      <img src={icon} alt={title} />
      {title}
    </a>
  </li>
)

const Links: FC<{}> = () => (
  <main>
    <h1>リンク</h1>
    <ul>
      {links.map(link => (
        <LinkItem {...link} />
      ))}
    </ul>
  </main>
)

export default Links
