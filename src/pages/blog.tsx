import React, { FC } from 'react'
import { useRouteData } from 'react-static'
import { Link } from '@reach/router'
import Article, { Tags } from 'src/Article'
import ArticleLi from 'components/ArticleLi'

const Blog: FC<{}> = () => {
  const { articles, tags } = useRouteData<{ articles: Article[]; tags: Tags }>()

  return (
    <main>
      <h1>翡翠置き場</h1>
      <p>140字超えてたり数式あるようなものをいろいろ書いてくブログ。</p>
      <hr />
      <section>
        <ul className="clover">
          {articles.map(article => (
            <ArticleLi key={article.data.meta.filename} article={article} />
          ))}
        </ul>
      </section>
      <hr />
      <section>
        <h2>タグ一覧</h2>
        <div className="tags">
          {tags.map(([tag, articles]) => (
            <article className="tag" key={tag}>
              <Link to={`/blog/tags/${tag}`}>
                {tag} ({articles.length})
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Blog
