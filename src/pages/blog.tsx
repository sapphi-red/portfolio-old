import React, { FC } from 'react'
import { useRouteData } from 'react-static'
import { Link } from '@reach/router'
import Article from 'src/Article'

const Blog: FC<{}> = () => {
  const { articles } = useRouteData<{ articles: Article[] }>()

  return (
    <main>
      <h1>{"It's blog time."}</h1>
      <br />
      All Posts:
      <ul>
        {articles.map(article => (
          <li key={article.data.frontmatter.slug}>
            <Link to={`/blog/articles/${article.data.frontmatter.slug}/`}>
              {article.data.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Blog
