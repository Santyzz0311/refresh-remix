import path from 'node:path'
import fs from 'node:fs/promises'
import fm from 'front-matter'
import { fileURLToPath } from 'node:url'
import { marked } from 'marked'

export interface Post {
  id: number
  title: string
  message: string
  slug: string
  content?: string
}

export interface CreatePost {
  title: string
  slug: string
  content: string
}

const postsPat = path.join(path.dirname(fileURLToPath(import.meta.url)), `..${path.sep}..`, 'posts')

export const getPosts = async () : Promise<Post[]> => {
  const files = await fs.readdir(postsPat)
  return Promise.all(files.map(async (filename) => {
    const file = await fs.readFile(path.join(postsPat, filename), 'utf-8')
    const { attributes } = fm<Post>(file.toString())
    return {
      id: attributes?.id,
      title: attributes?.title,
      message: attributes?.message,
      slug: filename.replace(/\.md$/, '')
    }
  }))
}

export const getPost = async (slug: string) => {
  const file = await fs.readFile(path.join(postsPat, `${slug}.md`), 'utf-8')
  const { attributes, body } = fm<Post>(file.toString())

  if (!attributes) {
    throw new Error('Post not found')
  }

  return {
    id: attributes?.id,
    title: attributes.title,
    message: attributes?.message,
    slug,
    content: marked(body)
  }
}

export const createPost = async (post: CreatePost) => {
  await new Promise((resolve) => setTimeout(resolve, 5000))
  const markdown = `---
title: ${post.title}
---

${post.content}
  `

  await fs.writeFile(path.join(postsPat, `${post.slug}.md`), markdown)

  return getPost(post.slug)
}
