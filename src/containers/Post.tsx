import React, { FC } from 'react'
import { useRouteData } from 'react-static'
import { Link } from '@reach/router'
import { Post as TypePost } from '../articles/index'

const Post: FC<{}> = () => {
  const { post }: { post: TypePost } = useRouteData()
  return (
    <div>
      <Link to="/blog/">{'<'} Back</Link>
      <br />
      <h3>{post.title}</h3>
      <p>{post.date}</p>
    </div>
  )
}

export default Post
