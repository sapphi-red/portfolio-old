import React, { FC } from 'react'
import { useRouteData } from 'react-static'
import TypeArticle from '../Article'
import ArticleLi from 'components/ArticleLi'

const Taxonomy: FC<{}> = () => {
  const { type, name, articles } = useRouteData<{
    type: string
    name: string
    articles: TypeArticle[]
  }>()

  return (
    <main>
      <h1>
        {type}: {name}
      </h1>
      <hr />
      <ul className="clover">
        {articles.map(article => (
          <ArticleLi key={article.data.meta.filename} article={article} />
        ))}
      </ul>
      <hr />
    </main>
  )
}

export default Taxonomy
