import React, { FC } from 'react'
import { useRouteData } from 'react-static'
import TypeArticle from '../Article'
import Tag from 'components/Tag'
import Utterances from 'react-utterances'

const Article: FC<{}> = () => {
  const { article } = useRouteData<{ article: TypeArticle }>()

  const { frontmatter, meta } = article.data

  return (
    <main>
      <section id="info">
        <h1>{frontmatter.title}</h1>
        <p className="created">
          <time dateTime={meta.createdAtDateTime}>{meta.createdAtLong}</time>
        </p>
        {meta.createdAtDateTime !== meta.modifiedAtDateTime && (
          <p className="modified">
            <time dateTime={meta.modifiedAtDateTime}>
              {meta.modifiedAtLong}
            </time>
          </p>
        )}
        <div className="tags">
          {frontmatter.tags.map(tag => (
            <Tag tag={tag} key={tag} />
          ))}
        </div>
      </section>
      <hr />
      <section
        className="md"
        dangerouslySetInnerHTML={{ __html: article.contents }}
      ></section>
      <hr />
      <Utterances
        type="pathname"
        repo="sapphi-red/blog-comments"
        theme="github-light"
      />
    </main>
  )
}

export default Article
