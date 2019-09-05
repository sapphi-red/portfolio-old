type ISODateString = string

interface Frontmatter {
  title: string
  description: string
  category: string
  tags: string[]
}

interface Meta {
  createdAt: string
  modifiedAt: string
  createdAtLong: string
  modifiedAtLong: string
  createdAtDateTime: ISODateString
  modifiedAtDateTime: ISODateString
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
