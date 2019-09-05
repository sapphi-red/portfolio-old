import React, { FC } from 'react'
import { Link } from '@reach/router'
import Article from '../Article'

const ArticleLi: FC<{ article: Article }> = ({ article }) => (
  <li>
    <Link to={`/blog/articles/${article.data.meta.filename}`}>
      {article.data.frontmatter.title}
    </Link>{' '}
    ({article.data.meta.createdAt})
  </li>
)

export default ArticleLi
