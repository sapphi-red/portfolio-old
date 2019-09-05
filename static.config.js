/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
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
    const { articles, tags } = await parseMd()

    return [
      {
        path: '/blog',
        getData: () => ({ articles, tags }),
        children: [].concat(
          articles.map(article => ({
            path: `/articles/${article.data.meta.filename}`,
            template: 'src/containers/Article',
            getData: () => ({
              article,
              ogp: {
                title: `${article.data.frontmatter.title} - 翡翠置き場`,
                description: article.data.frontmatter.description
              }
            })
          })),
          tags.map(([tag, articles]) => ({
            path: `/tags/${tag}`,
            template: 'src/containers/Taxonomy',
            getData: () => ({
              type: 'タグ',
              name: tag,
              articles,
              ogp: {
                title: `タグ:${tag} - 翡翠置き場`,
                description: `${tag}のタグがついている記事の一覧。`
              }
            })
          }))
        )
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
  siteRoot: 'green.sapphi.red',
  Document: ({ Html, Head, Body, children, state }) => {
    let title = 'green.sapphi.red'
    let desc = '翠のポートフォリオ。'
    let path = 'https://green.sapphi.red/'
    if (state.routeInfo && state.routeInfo.data && state.routeInfo.data.ogp) {
      const { ogp } = state.routeInfo.data
      title = ogp.title
      desc = ogp.description
    }
    if (state.route && state.route.path) {
      path = `${path}${state.route.path}`
    }
    return (
      <Html lang="ja">
        <Head>
          <meta charSet="UTF-8" />
          <title>{title}</title>
          <meta name="description" content={desc} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={desc} />
          <meta property="og:url" content={path} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@sapphi_red" />
          <meta name="og:img" content="https://green.sapphi.red/img/icon.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/png" href="/img/icon.png" />
        </Head>
        <Body>{children}</Body>
      </Html>
    )
  }
}
