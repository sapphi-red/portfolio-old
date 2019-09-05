import React, { FC } from 'react'
import { Link } from '@reach/router'
import Article from '../Article'

const Tag: FC<{ tag: string; articles?: Article[] }> = ({ tag, articles }) => (
  <div className="tag">
    <Link to={`/blog/tags/${tag}`}>
      {tag}
      {articles && `(${articles.length})`}
    </Link>
  </div>
)

export default Tag
