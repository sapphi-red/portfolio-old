/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { reloadClientData } from 'react-static/node'
import path from 'path'
import chokidar from 'chokidar'
import { parseMd } from './parse-md'

// Typescript support in static.config.js is not yet supported, but is coming in a future update!
chokidar
  .watch([
    path.join(__dirname, 'src', 'articles'),
    path.join(__dirname, 'parse-md.js')
  ])
  .on('all', () => reloadClientData())

export default {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  getRoutes: async () => {
    const articles = await parseMd()

    return [
      {
        path: '/blog',
        getData: () => ({ articles }),
        children: articles.map(article => ({
          path: `/articles/${article.data.frontmatter.slug}`,
          template: 'src/containers/Article',
          getData: () => ({ article })
        }))
      }
    ]
  },
  plugins: [
    'react-static-plugin-typescript',
    'react-static-plugin-sass',
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages')
      }
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap')
  ],
  siteRoot: '://green.sapphi.red'
}
