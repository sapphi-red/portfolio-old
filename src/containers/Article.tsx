import React, { FC } from 'react'
import { useRouteData } from 'react-static'
import { Link } from '@reach/router'
import TypeArticle from '../Article'

const Article: FC<{}> = () => {
  const { article } = useRouteData<{ article: TypeArticle }>()

  return (
    <main>
      <Link to="/blog/">{'<'} Back</Link>
      <br />
      <h3>{article.data.frontmatter.title}</h3>
      <p>{article.data.meta.createdAt}</p>
      <section dangerouslySetInnerHTML={{ __html: article.contents }}></section>
    </main>
  )
}

export default Article
