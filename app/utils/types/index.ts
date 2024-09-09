import { NAMESPACES } from '../enums'

export interface PostsTexts {
  welcome: string
  createPost: string
  title: string
  slug: string
  content: string
  create: string
  creating: string
}

export interface Texts {
  [NAMESPACES.POSTS]: PostsTexts
}
