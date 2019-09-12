import React, { FC, useState } from 'react'
import { useRouteData } from 'react-static'
import Article from 'src/Article'
import ArticleLi from 'components/ArticleLi'

const ARTICLES_IN_ONE_PAGE = 1

const Articles: FC<{}> = () => {
  const { articles } = useRouteData<{ articles: Article[] }>()
  const [page, setPage] = useState<number>(1)

  const maxPage = Math.ceil(articles.length / ARTICLES_IN_ONE_PAGE)
  const articlesShown = articles.slice(
    ARTICLES_IN_ONE_PAGE * (page - 1),
    ARTICLES_IN_ONE_PAGE * page
  )

  return (
    <main>
      <h1>記事一覧</h1>
      <p>
        {page} / {maxPage}
      </p>
      <hr />
      <section>
        <ul className="clover">
          {articlesShown.map(article => (
            <ArticleLi article={article} key={article.data.meta.filename} />
          ))}
        </ul>
      </section>
      {1 < page && (
        <button
          onClick={(): void => {
            setPage(page - 1)
          }}
        >
          {'<'}
        </button>
      )}
      {page < maxPage && (
        <button
          onClick={(): void => {
            setPage(page + 1)
          }}
        >
          {'>'}
        </button>
      )}
    </main>
  )
}

export default Articles
