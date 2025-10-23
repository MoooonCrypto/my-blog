// app/blog/page.tsx - ブログ一覧 (Windows 95風)
import { getBlogPosts } from '@/lib/mdx';
import Link from 'next/link';

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div className="window">
        <div className="window-title">BLOG.DAT - All Blog Posts</div>
        <div className="window-content">
          <div className="content-box">
            <p style={{ marginBottom: '16px', color: '#666' }}>技術的な学びや個人開発の記録</p>

            {posts.length > 0 ? (
              posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="post-item">
                    <div className="post-title">► {post.title}</div>
                    <div className="post-meta">{post.date}</div>
                  </div>
                </Link>
              ))
            ) : (
              <p>ブログ記事がありません</p>
            )}
          </div>

          <div style={{ marginTop: '16px' }}>
            <Link href="/" className="btn-win95">← ホームに戻る</Link>
          </div>
        </div>
      </div>
    </main>
  );
}