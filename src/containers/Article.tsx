import React, { FC, useEffect } from 'react'
import { useRouteData } from 'react-static'
import TypeArticle from '../Article'
import Tag from 'components/Tag'
import Utterances from 'react-utterances'

type TwitterWidget = any

declare const twttr: TwitterWidget

const Article: FC<{}> = () => {
  const { article } = useRouteData<{ article: TypeArticle }>()

  const { frontmatter, meta } = article.data

  useEffect(() => {
    const tweets = document.getElementsByTagName(
      'md-tweet-widget'
    ) as HTMLCollectionOf<HTMLElement>
    Promise.all(
      Array.from(tweets).map(async tweet => {
        await twttr.widgets.createTweet(tweet.dataset.id, tweet)
        tweet.getElementsByClassName('alt')[0].remove()
      })
    )
  }, [])

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
