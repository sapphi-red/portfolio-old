/* eslint-disable @typescript-eslint/explicit-function-return-type */
// https://spectrum.chat/unified/remark/markdown-to-html-with-parsed-yaml-frontmatter~d75254e5-de66-4719-8464-ae459e33fddf
import path from 'path'
import { promises as fs, statSync } from 'fs'
import unified from 'unified'
import visit from 'unist-util-visit'
import vfile from 'to-vfile'

import frontmatter from 'remark-frontmatter'
import parse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import slug from 'remark-slug'
import headings from 'remark-autolink-headings'
import subSuper from 'remark-sub-super'
import sectionize from 'remark-sectionize'
import math from 'remark-math'
import highlight from 'remark-highlight.js'

import katex from 'rehype-katex'
import stringify from 'rehype-stringify'
import yaml from 'js-yaml'

import 'array-flat-polyfill'

const ARTICLE_FOLDER = path.join(__dirname, 'src/articles')

const padWith0 = a => (a + '').padStart(2, '0')
const dateToString = date =>
  `${padWith0(date.getFullYear())}/${padWith0(date.getMonth() + 1)}/${padWith0(
    date.getDate()
  )}`
const dateToLongString = date =>
  `${padWith0(date.getFullYear())}/${padWith0(date.getMonth() + 1)}/${padWith0(
    date.getDate()
  )} ${padWith0(date.getHours())}:${padWith0(date.getMinutes())}:${padWith0(
    date.getSeconds()
  )}`

const mdParser = () => {
  return unified()
    .use(parse, { footnotes: true })
    .use(frontmatter)
    .use(() => (ast, file) => {
      visit(ast, 'yaml', node => {
        file.data.frontmatter = yaml.safeLoad(node.value)
      })
    })
    .use(() => (ast, file) => {
      if (!file.history[0]) return
      const stat = statSync(file.history[0])
      file.data.meta = {
        createdAt: dateToString(stat.birthtime),
        modifiedAt: dateToString(stat.mtime),
        createdAtLong: dateToLongString(stat.birthtime),
        modifiedAtLong: dateToLongString(stat.mtime),
        createdAtDateTime: stat.birthtime.toISOString(),
        modifiedAtDateTime: stat.mtime.toISOString(),
        filename: path.basename(file.history[0], '.md')
      }
    })
    .use(slug)
    .use(headings, {
      content: {
        type: 'element',
        tagName: 'span',
        properties: { className: ['icon-link'] },
        children: { type: 'text', value: '#' }
      }
    })
    .use(subSuper)
    .use(math)
    .use(highlight)
    .use(sectionize)
    .use(remark2rehype)
    .use(katex, {
      strict: errCode =>
        errCode === 'newLineInDisplayMode' ? 'ignore' : 'warn'
    })
    .use(stringify)
}

export const parseMd = async () => {
  const parser = mdParser()
  let files = await fs.readdir(ARTICLE_FOLDER)
  files = files.filter(fileName => fileName.endsWith('.md'))
  const articles = await Promise.all(
    files.map(async fileName => {
      const file = await vfile.read(path.join(ARTICLE_FOLDER, fileName))
      return parser.process(file)
    })
  )

  const tags = new Map()

  for (const article of articles) {
    for (const tag of article.data.frontmatter.tags) {
      if (!tags.has(tag)) tags.set(tag, [])
      tags.get(tag).push(article)
    }
  }

  return {
    articles,
    tags: Array.from(tags.entries()).sort((a, b) => a.length - b.length)
  }
}
