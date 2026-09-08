export type DiagramName =
  'architecture' | 'gitops-loop' | 'target-flow' | 'secrets' | 'observability'

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'code'; code: string; language?: string }
  | { type: 'diagram'; name: DiagramName }
  | { type: 'questions'; items: Array<string> }

export type ArticleSection = {
  title: string
  blocks: Array<ArticleBlock>
}

export type ArticleContent = {
  title: string
  excerpt: string
  meta: string
  introduction: Array<string>
  sections: Array<ArticleSection>
}
