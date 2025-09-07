// lib/types.ts
export interface PostMetadata {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  category?: string;
  slug: string;
}

export interface PortfolioMetadata {
  title: string;
  date: string;
  tech: string[];
  github?: string;
  demo?: string;
  description: string;
  slug: string;
}

export interface SandboxMetadata {
  title: string;
  date: string;
  tags?: string[];
  status: 'experimental' | 'complete' | 'deprecated';
  description: string;
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
