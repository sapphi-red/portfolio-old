/* eslint-disable */
import path from 'path'
import { posts } from './src/articles'

// Typescript support in static.config.js is not yet supported, but is coming in a future update!

export default {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  getRoutes: async () => {
    return [
      {
        path: '/blog',
        getData: () => ({
          posts
        }),
        children: posts.map((post, i) => ({
          path: `/post/${i}`,
          template: 'src/containers/Post',
          getData: () => ({
            post
          })
        }))
      }
    ]
  },
  plugins: [
    'react-static-plugin-typescript',
    'react-static-plugin-mdx',
    ['react-static-plugin-sass', { includePaths: ['node_modules'] }],
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages')
      }
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap')
  ]
}
