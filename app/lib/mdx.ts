import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const contentDirectory = path.join(process.cwd(), 'content')

// プロフィール取得
export async function getProfile() {
  const fullPath = path.join(contentDirectory, 'profile.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    ...data,
    content: marked(content)
  }
}

// ポートフォリオ取得
export async function getPortfolioItems() {
  const portfolioDir = path.join(contentDirectory, 'portfolio')
  const filenames = fs.readdirSync(portfolioDir)
  
  const items = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const fullPath = path.join(portfolioDir, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        ...data,
        slug: name.replace(/\.md$/, '')
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return items
}

// ブログ記事取得
export async function getBlogPosts() {
  const blogDir = path.join(contentDirectory, 'blog')
  const filenames = fs.readdirSync(blogDir)
  
  const posts = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const fullPath = path.join(blogDir, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        ...data,
        slug: name.replace(/\.md$/, '')
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return posts
}

// ブログ記事詳細取得
export async function getBlogPost(slug: string) {
  try {
    const fullPath = path.join(contentDirectory, 'blog', `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      ...data,
      slug,
      content: marked(content)
    }
  } catch (error) {
    return null
  }
}

// サンドボックス取得
export async function getSandboxItems() {
  const sandboxDir = path.join(contentDirectory, 'sandbox')
  const filenames = fs.readdirSync(sandboxDir)
  
  const items = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const fullPath = path.join(sandboxDir, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        ...data,
        slug: name.replace(/\.md$/, '')
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return items
}
