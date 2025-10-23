// lib/types.ts
export interface PostMetadata {
  title: string;
  date: string;
  slug: string;
}

export interface PortfolioMetadata {
  title: string;
  url: string;                    // デモURL or GitHubリポジトリURL
  thumbnail: string;              // サムネイル画像パス
  date: string;
  slug: string;
}

export interface SandboxMetadata {
  title: string;
  url: string;                    // デモURL
  thumbnail: string;              // サムネイル画像パス
  date: string;
  slug: string;
}

export interface Post extends PostMetadata {
  content: string;
}

export interface Portfolio extends PortfolioMetadata {
  content: string;
}

export interface SandboxItem extends SandboxMetadata {
  content: string;
}
