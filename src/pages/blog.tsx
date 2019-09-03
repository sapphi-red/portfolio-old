import React, { FC } from 'react'
import { useRouteData } from 'react-static'
import { Link } from '@reach/router'
import { Post } from 'src/articles'

const Blog: FC<{}> = () => {
  const { posts } = useRouteData<{ posts: Post[] }>()

  return (
    <main>
      <h1>{"It's blog time."}</h1>
      <br />
      All Posts:
      <ul>
        {posts.map(post => (
          <li key={post.title}>
            <Link to={`/blog/post/${post.title}/`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Blog
