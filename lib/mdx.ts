// lib/mdx.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, Portfolio, SandboxItem, PostMetadata, PortfolioMetadata, SandboxMetadata } from './types';

const contentDirectory = path.join(process.cwd(), 'content');

// スラッグ生成（ファイル名から）
function createSlug(fileName: string): string {
  return fileName.replace(/\.mdx?$/, '');
}

// 指定フォルダのMarkdownファイルを取得
function getContentFiles(folder: string): string[] {
  const fullPath = path.join(contentDirectory, folder);
  if (!fs.existsSync(fullPath)) {
    return [];
  }
  return fs.readdirSync(fullPath).filter(file => /\.mdx?$/.test(file));
}

// ブログ記事関連
export function getBlogPosts(): PostMetadata[] {
  const files = getContentFiles('blog');
  
  return files.map(file => {
    const fullPath = path.join(contentDirectory, 'blog', file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      ...data,
      slug: createSlug(file),
    } as PostMetadata;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): Post | null {
  try {
    const fullPath = path.join(contentDirectory, 'blog', `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      ...data,
      slug,
      content,
    } as Post;
  } catch {
    return null;
  }
}

// ポートフォリオ関連
export function getPortfolioItems(): PortfolioMetadata[] {
  const files = getContentFiles('portfolio');
  
  return files.map(file => {
    const fullPath = path.join(contentDirectory, 'portfolio', file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      ...data,
      slug: createSlug(file),
    } as PortfolioMetadata;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPortfolioItem(slug: string): Portfolio | null {
  try {
    const fullPath = path.join(contentDirectory, 'portfolio', `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      ...data,
      slug,
      content,
    } as Portfolio;
  } catch {
    return null;
  }
}

// Sandbox関連
export function getSandboxItems(): SandboxMetadata[] {
  const files = getContentFiles('sandbox');
  
  return files.map(file => {
    const fullPath = path.join(contentDirectory, 'sandbox', file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      ...data,
      slug: createSlug(file),
    } as SandboxMetadata;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getSandboxItem(slug: string): SandboxItem | null {
  try {
    const fullPath = path.join(contentDirectory, 'sandbox', `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      ...data,
      slug,
      content,
    } as SandboxItem;
  } catch {
    return null;
  }
}

// 最新記事を取得（トップページ用）
export function getLatestPosts(limit: number = 5): PostMetadata[] {
  return getBlogPosts().slice(0, limit);
}

// プロフィール取得
export function getProfile() {
  try {
    const fullPath = path.join(contentDirectory, 'profile.md');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      ...data,
      content,
    };
  } catch {
    return {
      content: 'プロフィール情報がありません',
    };
  }
}