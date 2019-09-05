type DateString = string

interface Frontmatter {
  title: string
  description: string
  category: string
  tags: string[]
}

interface Meta {
  createdAt: DateString
  modifiedAt: DateString
  filename: string
}

export default interface Article {
  contents: string
  data: {
    frontmatter: Frontmatter
    meta: Meta
  }
}

export type Tags = [string, Article[]][]
