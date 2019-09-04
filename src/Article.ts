type DateString = string

interface Frontmatter {
  title: string
  slug: string
  description: string
  category: string
  tags: string[]
}

interface Meta {
  createdAt: DateString
  modifiedAt: DateString
}

export default interface Article {
  contents: string
  data: {
    frontmatter: Frontmatter
    meta: Meta
  }
}
